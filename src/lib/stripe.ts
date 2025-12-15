import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-11-17.clover',
})

// Create a payment intent
export async function createPaymentIntent(amount: number, currency = 'usd', metadata?: Record<string, string>) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects cents
      currency,
      metadata: metadata || {},
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return paymentIntent
  } catch (error) {
    console.error('Error creating payment intent:', error)
    throw error
  }
}

// Create a subscription
export async function createSubscription(
  customerId: string,
  priceId: string,
  metadata?: Record<string, string>
) {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      metadata: metadata || {},
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    })

    return subscription
  } catch (error) {
    console.error('Error creating subscription:', error)
    throw error
  }
}

// Create a customer
export async function createCustomer(email: string, name?: string, metadata?: Record<string, string>) {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: metadata || {},
    })

    return customer
  } catch (error) {
    console.error('Error creating customer:', error)
    throw error
  }
}

// Create a product
export async function createProduct(name: string, description?: string, metadata?: Record<string, string>) {
  try {
    const product = await stripe.products.create({
      name,
      description,
      metadata: metadata || {},
    })

    return product
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

// Create a price
export async function createPrice(
  productId: string,
  unitAmount: number,
  currency = 'usd',
  recurring?: { interval: 'month' | 'year' }
) {
  try {
    const price = await stripe.prices.create({
      product: productId,
      unit_amount: Math.round(unitAmount * 100),
      currency,
      recurring: recurring || undefined,
    })

    return price
  } catch (error) {
    console.error('Error creating price:', error)
    throw error
  }
}

// Retrieve a payment intent
export async function retrievePaymentIntent(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    return paymentIntent
  } catch (error) {
    console.error('Error retrieving payment intent:', error)
    throw error
  }
}

// Create a checkout session
export async function createCheckoutSession(
  lineItems: Array<{
    price: string
    quantity: number
  }>,
  successUrl: string,
  cancelUrl: string,
  customerEmail?: string,
  metadata?: Record<string, string>
) {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      metadata: metadata || {},
    })

    return session
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

// Handle webhook events
export async function handleWebhookEvent(body: string, signature: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  
  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not set')
  }

  try {
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment succeeded:', paymentIntent.id)
        // Handle successful payment
        break
        
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent
        console.log('Payment failed:', failedPayment.id)
        // Handle failed payment
        break
        
      case 'customer.subscription.created':
        const subscription = event.data.object as Stripe.Subscription
        console.log('Subscription created:', subscription.id)
        // Handle new subscription
        break
        
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription
        console.log('Subscription deleted:', deletedSubscription.id)
        // Handle subscription cancellation
        break
        
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
    
    return { received: true }
  } catch (error) {
    console.error('Error handling webhook:', error)
    throw error
  }
}