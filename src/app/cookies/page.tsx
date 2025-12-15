import { Metadata } from 'next'
import { Cookie, Settings, Shield, Info } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookie Policy | TheQbitlabs',
  description: 'Learn about how TheQbitlabs uses cookies and similar technologies.',
  keywords: ['cookie policy', 'cookies', 'tracking', 'privacy'],
}

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Cookie className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Understanding how we use cookies to enhance your browsing experience.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-gray max-w-none">
            
            <div className="mb-8 p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Last updated:</strong> December 11, 2025<br />
                <strong>Effective date:</strong> December 11, 2025
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2 text-primary" />
                What Are Cookies?
              </h2>
              <p className="text-muted-foreground mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
              <p className="text-muted-foreground">
                Cookies enhance user experience by remembering your preferences and enabling certain features, such as keeping you logged in and remembering your theme preferences.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                <Settings className="w-6 h-6 mr-2 text-primary" />
                How We Use Cookies
              </h2>
              <p className="text-muted-foreground mb-4">
                TheQbitlabs uses cookies for several purposes:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Essential Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Required for the website to function properly, including navigation, form submissions, and security features.
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Analytics Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Help us understand how visitors interact with our website by collecting anonymous usage data.
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Functional Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Remember your preferences like theme settings, language choice, and other customizable features.
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Marketing Cookies</h3>
                  <p className="text-sm text-muted-foreground">
                    Used to track visitors across websites to display relevant advertisements.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div className="border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Session Cookies</h3>
                  <p className="text-muted-foreground mb-3">
                    These cookies are temporary and are deleted when you close your browser. They are essential for basic website functionality.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <strong>Purpose:</strong> User authentication, form data, shopping cart
                  </div>
                </div>

                <div className="border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Persistent Cookies</h3>
                  <p className="text-muted-foreground mb-3">
                    These cookies remain on your device for a specified period or until you delete them. They help remember your preferences.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <strong>Purpose:</strong> Theme preferences, language settings, user preferences
                  </div>
                </div>

                <div className="border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">First-Party Cookies</h3>
                  <p className="text-muted-foreground mb-3">
                    Set by TheQbitlabs directly and used to provide our services and improve user experience.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <strong>Purpose:</strong> Website functionality, user preferences, analytics
                  </div>
                </div>

                <div className="border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Third-Party Cookies</h3>
                  <p className="text-muted-foreground mb-3">
                    Set by external services we use, such as analytics providers and social media platforms.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <strong>Purpose:</strong> Analytics, social media integration, marketing
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-primary" />
                Managing Your Cookie Preferences
              </h2>
              <p className="text-muted-foreground mb-4">
                You have several options for managing cookies:
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Browser Settings</h3>
                  <p className="text-sm text-blue-800 mb-2">
                    Most browsers allow you to control cookies through their settings:
                  </p>
                  <ul className="list-disc pl-6 text-sm text-blue-800 space-y-1">
                    <li>Chrome: Settings → Privacy and Security → Cookies</li>
                    <li>Firefox: Options → Privacy & Security → Cookies</li>
                    <li>Safari: Preferences → Privacy → Cookies</li>
                    <li>Edge: Settings → Privacy → Cookies</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Our Cookie Settings</h3>
                  <p className="text-sm text-green-800">
                    You can manage your cookie preferences directly on our website through our cookie settings panel, which you can access from the footer of any page.
                  </p>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-semibold text-yellow-900 mb-2">Opt-Out Tools</h3>
                  <p className="text-sm text-yellow-800">
                    For third-party cookies, you can opt out through:
                  </p>
                  <ul className="list-disc pl-6 text-sm text-yellow-800 space-y-1">
                    <li>Network Advertising Initiative: optout.aboutads.info</li>
                    <li>Digital Advertising Alliance: youradchoices.com</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Impact of Disabling Cookies</h2>
              <p className="text-muted-foreground mb-4">
                If you choose to disable cookies, please note that some features of our website may not function properly:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>You may need to re-enter information more frequently</li>
                <li>Some personalization features may not work</li>
                <li>You may not be able to save your preferences</li>
                <li>Some interactive features may be limited</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Updates to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this cookie policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about our use of cookies or this policy, please contact us:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-medium">TheQbitlabs</p>
                <p className="text-muted-foreground">Email: privacy@theqbitlabs.com</p>
                <p className="text-muted-foreground">Address: [Your Business Address]</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}