import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronRight } from 'lucide-react'
import { getListingsByActivity } from '@/lib/data'
import { activityLabel } from '@/lib/utils'
import { pageMeta } from '@/lib/seo'
import ListingsGrid from '@/components/ListingsGrid'

const ACTIVITIES = ['rage-room', 'axe-throwing', 'paint-room', 'car-smash', 'vr', 'archery']

const ACTIVITY_DESC: Record<string, string> = {
  'rage-room': 'Smash TVs, plates, electronics, and more in a fully supervised smash room. Gear provided.',
  'axe-throwing': 'Learn to throw axes at targets in a safe, supervised environment. Great for groups.',
  'paint-room': 'Express yourself by hurling paint at canvases, walls, and targets. Zero cleanup required.',
  'car-smash': 'Take a sledgehammer to a real car. The ultimate stress reliever.',
  'vr': 'Virtual reality smash experiences — destroy virtual worlds without the cleanup.',
  'archery': 'Traditional or combat archery tag in a rage room setting.',
}

interface Props {
  params: Promise<{ activity: string }>
}

export async function generateStaticParams() {
  return ACTIVITIES.map(a => ({ activity: a }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { activity } = await params
  const label = activityLabel(activity)
  return {
    title: `${label} Near Me — Find Venues Across the USA`,
    description: `Find ${label.toLowerCase()} venues across the USA. Verified listings with ratings, prices, and direct booking. ${ACTIVITY_DESC[activity] ?? ''}`,
    ...pageMeta(`/activities/${activity}`),
  }
}

export default async function ActivityPage({ params }: Props) {
  const { activity } = await params
  if (!ACTIVITIES.includes(activity)) notFound()

  const actKey = activity.replace('-', '_')
  const listings = getListingsByActivity(actKey)
  const label = activityLabel(activity)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">{label}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          {label} Near Me
        </h1>
        <p className="text-gray-600 mb-2">
          {listings.length} verified {label.toLowerCase()} {listings.length === 1 ? 'venue' : 'venues'} across the USA.
        </p>
        {ACTIVITY_DESC[activity] && (
          <p className="text-gray-500 text-sm">{ACTIVITY_DESC[activity]}</p>
        )}
      </div>

      <ListingsGrid listings={listings} />
    </div>
  )
}
