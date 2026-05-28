import listingsData from '@/data/listings.json'
import statesData from '@/data/states.json'
import type { Listing, StateEntry } from './types'

export const allListings = listingsData as unknown as Listing[]
export const allStates = statesData as unknown as StateEntry[]

export function getListingsByState(stateSlug: string): Listing[] {
  return allListings.filter(l => l.state_slug === stateSlug)
}

export function getListingsByCity(stateSlug: string, citySlug: string): Listing[] {
  return allListings.filter(l => l.state_slug === stateSlug && l.city_slug === citySlug)
}

export function getListing(stateSlug: string, citySlug: string, slug: string): Listing | undefined {
  return allListings.find(l => l.state_slug === stateSlug && l.city_slug === citySlug && l.slug === slug)
}

export function getState(stateSlug: string): StateEntry | undefined {
  return allStates.find(s => s.slug === stateSlug)
}

export function getListingsByActivity(activity: string): Listing[] {
  const key = `act_${activity.replace('-', '_')}` as keyof Listing
  return allListings.filter(l => l[key] === true)
}

export function getListingsByOccasion(occasion: string): Listing[] {
  const map: Record<string, keyof Listing> = {
    birthday: 'mkt_birthday',
    bachelorette: 'mkt_bachelorette',
    corporate: 'mkt_corporate',
    'date-night': 'mkt_date_night',
    kids: 'mkt_kids',
  }
  const key = map[occasion]
  if (!key) return []
  return allListings.filter(l => l[key] === true)
}

export function topRated(listings: Listing[], limit = 6): Listing[] {
  return [...listings]
    .sort((a, b) => {
      const ratingDiff = (b.rating ?? 0) - (a.rating ?? 0)
      if (ratingDiff !== 0) return ratingDiff
      return (b.reviews ?? 0) - (a.reviews ?? 0)
    })
    .slice(0, limit)
}
