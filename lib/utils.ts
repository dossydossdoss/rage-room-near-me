import { type ClassValue, clsx } from 'clsx'
import type { Listing } from './types'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatPrice(min: number | null, max: number | null): string {
  if (!min && !max) return 'Call for pricing'
  if (min && max) return `$${min}–$${max}`
  if (min) return `From $${min}`
  if (max) return `Up to $${max}`
  return ''
}

export function formatRating(rating: number | null): string {
  if (!rating) return '—'
  return rating.toFixed(1)
}

export function getActivities(listing: Listing): string[] {
  const acts: string[] = []
  if (listing.act_rage_room) acts.push('Rage Room')
  if (listing.act_axe_throwing) acts.push('Axe Throwing')
  if (listing.act_paint_room) acts.push('Paint Room')
  if (listing.act_car_smash) acts.push('Car Smash')
  if (listing.act_vr) acts.push('VR')
  if (listing.act_archery) acts.push('Archery')
  return acts
}

export function getOccasions(listing: Listing): string[] {
  const occ: string[] = []
  if (listing.mkt_birthday) occ.push('Birthday')
  if (listing.mkt_bachelorette) occ.push('Bachelorette')
  if (listing.mkt_corporate) occ.push('Corporate')
  if (listing.mkt_date_night) occ.push('Date Night')
  if (listing.mkt_kids) occ.push('Kids')
  return occ
}

export function stateUrl(stateSlug: string) {
  return `/${stateSlug}`
}

export function cityUrl(stateSlug: string, citySlug: string) {
  return `/${stateSlug}/${citySlug}`
}

export function listingUrl(stateSlug: string, citySlug: string, slug: string) {
  return `/${stateSlug}/${citySlug}/${slug}`
}

export function activityLabel(slug: string): string {
  const labels: Record<string, string> = {
    'rage-room': 'Rage Room',
    'axe-throwing': 'Axe Throwing',
    'paint-room': 'Paint Room',
    'car-smash': 'Car Smash',
    'vr': 'Virtual Reality',
    'archery': 'Archery',
  }
  return labels[slug] ?? slug
}

export function occasionLabel(slug: string): string {
  const labels: Record<string, string> = {
    birthday: 'Birthday Party',
    bachelorette: 'Bachelorette Party',
    corporate: 'Corporate Events',
    'date-night': 'Date Night',
    kids: 'Kids & Families',
  }
  return labels[slug] ?? slug
}
