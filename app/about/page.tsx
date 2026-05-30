import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Hammer, MapPin, Star, Users } from 'lucide-react'
import { allListings, allStates } from '@/lib/data'
import { pageMeta } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About Rage Room Near Me — the most complete directory of rage rooms and smash rooms across the USA.',
  ...pageMeta('/about'),
}

export default function AboutPage() {
  const cityCount = new Set(allListings.map(l => l.city_slug)).size

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">About</span>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 text-white rounded-2xl p-8 mb-8 text-center">
        <div className="flex justify-center mb-4">
          <Hammer className="w-12 h-12 text-red-400" />
        </div>
        <h1 className="text-3xl font-extrabold mb-3">About Rage Room Near Me</h1>
        <p className="text-gray-300 leading-relaxed">
          The most complete directory of rage rooms, smash rooms, and stress-relief venues across the United States.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: <Hammer className="w-5 h-5 text-red-500" />, value: allListings.length, label: 'Venues listed' },
          { icon: <MapPin className="w-5 h-5 text-red-500" />, value: allStates.length, label: 'States covered' },
          { icon: <Users className="w-5 h-5 text-red-500" />, value: cityCount, label: 'Cities' },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-2xl p-4 text-center">
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">What We Do</h2>
          <p>Rage Room Near Me is a free directory that helps people find rage rooms, smash rooms, and stress-relief venues near them. We verify listings, enrich them with real data (pricing, activities, hours, review insights), and make it easy to compare and book.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Our Data</h2>
          <p>Every listing is verified from public sources. We enrich each venue with:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Activities offered (rage room, axe throwing, paint room, car smash, VR)</li>
            <li>Pricing and session duration</li>
            <li>Booking platform and walk-in availability</li>
            <li>Occasions catered for (birthday, bachelorette, corporate, date night, kids)</li>
            <li>Review sentiment analysis (staff quality, value, cleanliness)</li>
            <li>Operating hours and contact details</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Is Your Business Listed?</h2>
          <p>If you own or manage a rage room and want to update your listing, claim it, or report incorrect information, get in touch at <a href="mailto:hello@rageroomnearme.org" className="text-red-600 hover:underline">hello@rageroomnearme.org</a>.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Contact</h2>
          <p>Questions, corrections, or partnership enquiries: <a href="mailto:hello@rageroomnearme.org" className="text-red-600 hover:underline">hello@rageroomnearme.org</a></p>
        </section>
      </div>
    </div>
  )
}
