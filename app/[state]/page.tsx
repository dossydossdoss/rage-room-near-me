import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MapPin, ChevronRight } from 'lucide-react'
import { allStates, getState, getListingsByState } from '@/lib/data'
import { cityUrl, stateUrl } from '@/lib/utils'
import { pageMeta } from '@/lib/seo'
import ListingsGrid from '@/components/ListingsGrid'

interface Props {
  params: Promise<{ state: string }>
}

export async function generateStaticParams() {
  return allStates.map(s => ({ state: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = getState(stateSlug)
  if (!state) return {}
  return {
    title: `Rage Rooms in ${state.name} (${state.count} locations)`,
    description: `Find the best rage rooms, smash rooms, and stress-relief venues in ${state.name}. ${state.count} verified locations. Search by city, filter by activity or occasion.`,
    ...pageMeta(stateUrl(stateSlug)),
  }
}

export default async function StatePage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = getState(stateSlug)
  if (!state) notFound()

  const listings = getListingsByState(stateSlug)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">{state.name}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Rage Rooms in {state.name}
        </h1>
        <p className="text-gray-600">
          {state.count} verified rage room {state.count === 1 ? 'venue' : 'venues'} across {state.cities.length} {state.cities.length === 1 ? 'city' : 'cities'} in {state.name}.
        </p>
      </div>

      {/* Cities quick nav */}
      {state.cities.length > 1 && (
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Browse by City</p>
          <div className="flex flex-wrap gap-2">
            {state.cities.map(city => (
              <Link
                key={city.slug}
                href={cityUrl(stateSlug, city.slug)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-red-400 hover:text-red-600 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                {city.name}
                <span className="text-gray-400 text-xs">({city.count})</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <ListingsGrid listings={listings} />

      {/* SEO content block */}
      <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Rage Rooms in {state.name}</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {state.name} has {state.count} verified rage room and smash room {state.count === 1 ? 'venue' : 'venues'} available to book. Whether you&apos;re looking for stress relief, a unique birthday party idea, bachelorette celebration, or corporate team-building activity — there&apos;s a rage room in {state.name} that fits. Browse by city above, filter by activity or occasion, and find the perfect venue to let loose.
        </p>
      </div>
    </div>
  )
}
