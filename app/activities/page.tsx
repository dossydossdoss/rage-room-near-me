import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { ChevronRight } from 'lucide-react'
import { getListingsByActivity } from '@/lib/data'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Rage Room Activities — Browse by Experience Type',
  description: 'Find rage rooms by activity — smash rooms, axe throwing, paint rooms, car smash, VR, and archery venues across the USA.',
  ...pageMeta('/activities'),
}

const ACTIVITIES = [
  {
    slug: 'rage_room',
    urlSlug: 'rage-room',
    label: 'Rage Room',
    emoji: '💥',
    image: '/rage-room-activity.webp',
    description: 'Smash TVs, plates, electronics, and more. The original stress-relief experience — gear provided.',
    color: 'bg-red-50 border-red-200 hover:border-red-400',
    badge: 'bg-red-100 text-red-700',
  },
  {
    slug: 'axe_throwing',
    urlSlug: 'axe-throwing',
    label: 'Axe Throwing',
    emoji: '🪓',
    image: '/axe-throwing-activity.webp',
    description: 'Learn to throw axes at targets. Supervised, beginner-friendly, and great for groups.',
    color: 'bg-orange-50 border-orange-200 hover:border-orange-400',
    badge: 'bg-orange-100 text-orange-700',
  },
  {
    slug: 'paint_room',
    urlSlug: 'paint-room',
    label: 'Paint Room',
    emoji: '🎨',
    image: '/paint-room-activity.webp',
    description: 'Hurl paint at canvases and walls. Zero cleanup required — all gear provided.',
    color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
    badge: 'bg-purple-100 text-purple-700',
  },
  {
    slug: 'car_smash',
    urlSlug: 'car-smash',
    label: 'Car Smash',
    emoji: '🚗',
    image: '/car-smash-activity.webp',
    description: 'Take a sledgehammer to a real car. The ultimate heavy-duty stress reliever.',
    color: 'bg-yellow-50 border-yellow-200 hover:border-yellow-400',
    badge: 'bg-yellow-100 text-yellow-700',
  },
  {
    slug: 'vr',
    urlSlug: 'vr',
    label: 'Virtual Reality',
    emoji: '🥽',
    image: '/vr-activity.webp',
    description: 'Destroy virtual worlds without the cleanup. VR smash experiences with full immersion.',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    slug: 'archery',
    urlSlug: 'archery',
    label: 'Archery',
    emoji: '🏹',
    image: '/archery-activity.webp',
    description: 'Traditional or combat archery tag in a rage room setting. Precision meets adrenaline.',
    color: 'bg-green-50 border-green-200 hover:border-green-400',
    badge: 'bg-green-100 text-green-700',
  },
]

export default function ActivitiesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Activities</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Browse by Activity</h1>
        <p className="text-gray-600">Find venues by the specific experience you&apos;re after.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ACTIVITIES.map(act => {
          const count = getListingsByActivity(act.slug).length
          return (
            <Link
              key={act.slug}
              href={`/activities/${act.urlSlug}`}
              className={`group block border-2 rounded-2xl overflow-hidden transition-all hover:shadow-lg ${act.color}`}
            >
              {act.image ? (
                <div className="relative w-full h-44 overflow-hidden">
                  <Image
                    src={act.image}
                    alt={`${act.label} activity`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div className="text-4xl px-6 pt-6 mb-0">{act.emoji}</div>
              )}
              <div className="p-6">
              {act.image && <div className="text-2xl mb-2">{act.emoji}</div>}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-red-700 transition-colors leading-tight">
                  {act.label}
                </h2>
                <span className={`text-xs font-bold px-2 py-1 rounded-full shrink-0 ${act.badge}`}>
                  {count} venues
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{act.description}</p>
              <div className="mt-4 text-sm font-semibold text-red-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                Find venues <ChevronRight className="w-4 h-4" />
              </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
