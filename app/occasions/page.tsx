import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronRight } from 'lucide-react'
import { getListingsByOccasion } from '@/lib/data'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Rage Rooms by Occasion — Birthday, Bachelorette, Corporate & More',
  description: 'Find the perfect rage room for any occasion. Birthday parties, bachelorette parties, corporate events, date nights, and kids-friendly venues across the USA.',
  ...pageMeta('/occasions'),
}

const OCCASIONS = [
  {
    slug: 'birthday',
    label: 'Birthday Party',
    emoji: '🎂',
    description: 'Make your birthday unforgettable. Private group sessions, custom music, and photo packages available.',
    color: 'bg-pink-50 border-pink-200 hover:border-pink-400',
    badge: 'bg-pink-100 text-pink-700',
  },
  {
    slug: 'bachelorette',
    label: 'Bachelorette Party',
    emoji: '💍',
    description: 'Skip the bar crawl. Smash rooms are the hottest bachelorette trend — let loose before the big day.',
    color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
    badge: 'bg-purple-100 text-purple-700',
  },
  {
    slug: 'corporate',
    label: 'Corporate Events',
    emoji: '💼',
    description: 'Team-building that actually works. Group packages, private sessions, and corporate invoicing available.',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    slug: 'date-night',
    label: 'Date Night',
    emoji: '❤️',
    description: 'Skip dinner and a movie. An adrenaline-fueled date night neither of you will forget.',
    color: 'bg-red-50 border-red-200 hover:border-red-400',
    badge: 'bg-red-100 text-red-700',
  },
  {
    slug: 'kids',
    label: 'Kids & Families',
    emoji: '👧',
    description: 'Kid-friendly venues with age-appropriate breakables and full safety gear. Fun for the whole family.',
    color: 'bg-yellow-50 border-yellow-200 hover:border-yellow-400',
    badge: 'bg-yellow-100 text-yellow-700',
  },
]

export default function OccasionsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Occasions</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Perfect Occasions for a Rage Room</h1>
        <p className="text-gray-600">Rage rooms work for almost any group event. Pick an occasion to find venues that cater to it.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {OCCASIONS.map(occ => {
          const count = getListingsByOccasion(occ.slug).length
          return (
            <Link
              key={occ.slug}
              href={`/occasions/${occ.slug}`}
              className={`group block border-2 rounded-2xl p-6 transition-all hover:shadow-lg ${occ.color}`}
            >
              <div className="text-4xl mb-4">{occ.emoji}</div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-red-700 transition-colors leading-tight">
                  {occ.label}
                </h2>
                <span className={`text-xs font-bold px-2 py-1 rounded-full shrink-0 ${occ.badge}`}>
                  {count} venues
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{occ.description}</p>
              <div className="mt-4 text-sm font-semibold text-red-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                Browse venues <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
