'use client'

import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import FilterBar from './FilterBar'
import ListingCard from './ListingCard'
import type { Listing, Filters } from '@/lib/types'

interface Props {
  listings: Listing[]
}

const DEFAULT_FILTERS: Filters = {
  activity: [],
  occasion: [],
  walkins: false,
  giftCards: false,
  priceMax: null,
  query: '',
}

export default function ListingsGrid({ listings }: Props) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'price'>('rating')

  const fuse = useMemo(() => new Fuse(listings, {
    keys: ['name', 'city', 'state', 'address'],
    threshold: 0.3,
  }), [listings])

  const filtered = useMemo(() => {
    let result = listings

    if (filters.query) {
      result = fuse.search(filters.query).map(r => r.item)
    }

    if (filters.activity.length > 0) {
      result = result.filter(l =>
        filters.activity.every(act => l[`act_${act}` as keyof Listing] === true)
      )
    }

    if (filters.occasion.length > 0) {
      result = result.filter(l =>
        filters.occasion.every(occ => l[`mkt_${occ}` as keyof Listing] === true)
      )
    }

    if (filters.walkins) {
      result = result.filter(l => l.walkins_ok)
    }

    if (filters.giftCards) {
      result = result.filter(l => l.has_gift_cards)
    }

    if (filters.priceMax) {
      result = result.filter(l => !l.price_min || l.price_min <= filters.priceMax!)
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'rating') {
        const rDiff = (b.rating ?? 0) - (a.rating ?? 0)
        if (rDiff !== 0) return rDiff
        return (b.reviews ?? 0) - (a.reviews ?? 0)
      }
      if (sortBy === 'reviews') return (b.reviews ?? 0) - (a.reviews ?? 0)
      if (sortBy === 'price') return (a.price_min ?? 9999) - (b.price_min ?? 9999)
      return 0
    })

    return result
  }, [listings, filters, fuse, sortBy])

  return (
    <div>
      <FilterBar
        filters={filters}
        onChange={setFilters}
        total={listings.length}
        filtered={filtered.length}
      />

      <div className="flex items-center justify-between mt-6 mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{filtered.length}</span> rage rooms found
        </p>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as typeof sortBy)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-red-400"
        >
          <option value="rating">Top Rated</option>
          <option value="reviews">Most Reviewed</option>
          <option value="price">Price: Low to High</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg font-medium mb-2">No locations match your filters</p>
          <p className="text-sm">Try removing some filters to see more results.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(listing => (
            <ListingCard key={`${listing.state_slug}-${listing.city_slug}-${listing.slug}`} listing={listing} />
          ))}
        </div>
      )}
    </div>
  )
}
