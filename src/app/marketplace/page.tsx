'use client'

import { useState } from 'react'
import { MarketplaceHero } from '@/components/marketplace/marketplace-hero'
import { MarketplaceFilter } from '@/components/marketplace/marketplace-filter'
import { FeaturedProducts } from '@/components/marketplace/featured-products'
import { ProductGrid } from '@/components/marketplace/product-grid'
import { CategoriesSection } from '@/components/marketplace/categories-section'
import { TrendingProducts } from '@/components/marketplace/trending-products'
import { SellerSection } from '@/components/marketplace/seller-section'
import { CTASection } from '@/components/marketplace/cta-section'



export default function MarketplacePage() {
  const [filters, setFilters] = useState<Record<string, string[]>>({})
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleFilterChange = (newFilters: Record<string, string[]>) => {
    setFilters(newFilters)
  }

  return (
    <main className="min-h-screen">
      <MarketplaceHero />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <MarketplaceFilter
              onFilterChange={handleFilterChange}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
            />
          </div>
          <div className="lg:col-span-3">
            <ProductGrid />
          </div>
        </div>
      </div>
      <FeaturedProducts />
      <CategoriesSection />
      <TrendingProducts />
      <SellerSection />
      <CTASection />
    </main>
  )
}