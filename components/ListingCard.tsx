'use client'

import Link from 'next/link'
import { MapPin, Star, Phone, ExternalLink, Users, Gift } from 'lucide-react'
import type { Listing } from '@/lib/types'
import { formatPrice, formatRating, getActivities, listingUrl, cn } from '@/lib/utils'

const ACTIVITY_COLORS: Record<string, string> = {
  'Rage Room': 'bg-red-100 text-red-700',
  'Axe Throwing': 'bg-orange-100 text-orange-700',
  'Paint Room': 'bg-purple-100 text-purple-700',
  'Car Smash': 'bg-yellow-100 text-yellow-700',
  'VR': 'bg-blue-100 text-blue-700',
  'Archery': 'bg-green-100 text-green-700',
}

interface Props {
  listing: Listing
  featured?: boolean
}

export default function ListingCard({ listing, featured }: Props) {
  const activities = getActivities(listing)
  const url = listingUrl(listing.state_slug, listing.city_slug, listing.slug)

  return (
    <Link href={url} className={cn(
      'group block bg-white rounded-2xl border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-200 overflow-hidden',
      featured && 'ring-2 ring-red-400'
    )}>
      {featured && (
        <div className="bg-red-500 text-white text-xs font-semibold px-3 py-1 text-center tracking-wide uppercase">
          Featured
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-bold text-gray-900 text-base leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
            {listing.name}
          </h3>
          {listing.rating && (
            <div className="flex items-center gap-1 shrink-0 bg-amber-50 px-2 py-1 rounded-lg">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-amber-700">{formatRating(listing.rating)}</span>
              {listing.reviews && (
                <span className="text-xs text-gray-400">({listing.reviews})</span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
          <MapPin className="w-4 h-4 shrink-0 text-red-400" />
          <span>{listing.city}, {listing.state}</span>
        </div>

        {activities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {activities.map(act => (
              <span key={act} className={cn('text-xs font-medium px-2 py-0.5 rounded-full', ACTIVITY_COLORS[act] ?? 'bg-gray-100 text-gray-600')}>
                {act}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
          <span className="font-semibold text-gray-800">
            {formatPrice(listing.price_min, listing.price_max)}
          </span>
          <div className="flex items-center gap-2">
            {listing.walkins_ok && (
              <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">Walk-ins</span>
            )}
            {listing.has_gift_cards && (
              <Gift className="w-4 h-4 text-pink-400" />
            )}
            {listing.has_group_pricing && (
              <Users className="w-4 h-4 text-blue-400" />
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
