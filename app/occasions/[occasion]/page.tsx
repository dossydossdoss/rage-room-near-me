import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronRight } from 'lucide-react'
import { getListingsByOccasion } from '@/lib/data'
import { occasionLabel } from '@/lib/utils'
import ListingsGrid from '@/components/ListingsGrid'

const OCCASIONS = ['birthday', 'bachelorette', 'corporate', 'date-night', 'kids']

const OCCASION_DESC: Record<string, string> = {
  birthday: 'Make your birthday unforgettable — smash rooms offer private group sessions perfect for parties of all sizes.',
  bachelorette: 'Ditch the bar crawl. Rage rooms are the hottest bachelorette party trend — smash stress before the big day.',
  corporate: 'Team-building that actually works. Corporate smash sessions boost morale and let your team blow off steam.',
  'date-night': 'Skip dinner and a movie. Rage rooms offer a unique, adrenaline-fueled date night experience.',
  kids: 'Kid-friendly rage rooms with age-appropriate breakables and full safety gear. Fun for the whole family.',
}

interface Props {
  params: Promise<{ occasion: string }>
}

export async function generateStaticParams() {
  return OCCASIONS.map(o => ({ occasion: o }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { occasion } = await params
  const label = occasionLabel(occasion)
  return {
    title: `${label} Rage Rooms — Find Venues Across the USA`,
    description: `Find rage rooms perfect for ${label.toLowerCase()}. ${OCCASION_DESC[occasion] ?? ''} Verified listings with ratings and direct booking.`,
  }
}

export default async function OccasionPage({ params }: Props) {
  const { occasion } = await params
  if (!OCCASIONS.includes(occasion)) notFound()

  const listings = getListingsByOccasion(occasion)
  const label = occasionLabel(occasion)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/occasions" className="hover:text-red-600">Occasions</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">{label}</span>
      </nav>

      {/* Occasion tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {OCCASIONS.map(occ => (
          <Link
            key={occ}
            href={`/occasions/${occ}`}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              occ === occasion
                ? 'bg-red-500 border-red-500 text-white'
                : 'border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600'
            }`}
          >
            {occasionLabel(occ)}
          </Link>
        ))}
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          {label} Rage Rooms
        </h1>
        <p className="text-gray-600 mb-2">
          {listings.length} verified {listings.length === 1 ? 'venue' : 'venues'} perfect for {label.toLowerCase()}.
        </p>
        {OCCASION_DESC[occasion] && (
          <p className="text-gray-500 text-sm max-w-2xl">{OCCASION_DESC[occasion]}</p>
        )}
      </div>

      <ListingsGrid listings={listings} />
    </div>
  )
}
