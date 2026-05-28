import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronRight } from 'lucide-react'
import { allStates, getState, getListingsByCity } from '@/lib/data'
import { stateUrl } from '@/lib/utils'
import ListingsGrid from '@/components/ListingsGrid'

interface Props {
  params: Promise<{ state: string; city: string }>
}

export async function generateStaticParams() {
  const params: { state: string; city: string }[] = []
  for (const state of allStates) {
    for (const city of state.cities) {
      params.push({ state: state.slug, city: city.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params
  const state = getState(stateSlug)
  if (!state) return {}
  const cityEntry = state.cities.find(c => c.slug === citySlug)
  if (!cityEntry) return {}
  return {
    title: `Rage Rooms in ${cityEntry.name}, ${state.name}`,
    description: `Find rage rooms near ${cityEntry.name}, ${state.name}. ${cityEntry.count} verified ${cityEntry.count === 1 ? 'venue' : 'venues'} — compare prices, ratings, and activities. Book online.`,
  }
}

export default async function CityPage({ params }: Props) {
  const { state: stateSlug, city: citySlug } = await params
  const state = getState(stateSlug)
  if (!state) notFound()

  const cityEntry = state.cities.find(c => c.slug === citySlug)
  if (!cityEntry) notFound()

  const listings = getListingsByCity(stateSlug, citySlug)
  if (listings.length === 0) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={stateUrl(stateSlug)} className="hover:text-red-600">{state.name}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">{cityEntry.name}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Rage Rooms in {cityEntry.name}, {state.name}
        </h1>
        <p className="text-gray-600">
          {cityEntry.count} verified rage room {cityEntry.count === 1 ? 'venue' : 'venues'} in {cityEntry.name}. Compare prices, ratings, and activities — then book your session.
        </p>
      </div>

      <ListingsGrid listings={listings} />

      {/* Other cities in this state */}
      {state.cities.length > 1 && (
        <div className="mt-10">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            More rage rooms in {state.name}
          </p>
          <div className="flex flex-wrap gap-2">
            {state.cities
              .filter(c => c.slug !== citySlug)
              .slice(0, 10)
              .map(city => (
                <Link
                  key={city.slug}
                  href={`/${stateSlug}/${city.slug}`}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-red-400 hover:text-red-600 transition-colors"
                >
                  {city.name} ({city.count})
                </Link>
              ))}
            <Link href={stateUrl(stateSlug)} className="px-3 py-1.5 bg-red-50 border border-red-200 rounded-full text-sm text-red-600 font-medium">
              All {state.name} →
            </Link>
          </div>
        </div>
      )}

      {/* SEO block */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Rage Rooms Near {cityEntry.name}, {state.name}</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Looking for a rage room in {cityEntry.name}? This page lists all verified smash rooms and rage rooms in and around {cityEntry.name}, {state.name}. Use the filters above to find venues by activity (axe throwing, paint room, car smash), occasion (birthday, bachelorette, corporate), or amenities. All listings include ratings, pricing, hours, and direct booking links.
        </p>
      </div>
    </div>
  )
}
