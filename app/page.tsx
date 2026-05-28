import Link from 'next/link'
import { MapPin, Hammer, Users, ChevronRight } from 'lucide-react'
import { allStates, allListings, topRated } from '@/lib/data'
import ListingCard from '@/components/ListingCard'
import HomeSearch from '@/components/HomeSearch'

export default function HomePage() {
  const featured = topRated(allListings, 6)
  const stats = {
    listings: allListings.length,
    states: allStates.length,
    cities: new Set(allListings.map(l => l.city_slug)).size,
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Hammer className="w-8 h-8 text-red-400" />
            <span className="text-red-400 font-semibold tracking-wide uppercase text-sm">Rage Room Directory USA</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Find a Rage Room<br />
            <span className="text-red-400">Near You</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {stats.listings} verified rage rooms, smash rooms &amp; stress-relief venues across {stats.states} states. Search, compare, and book.
          </p>
          <HomeSearch />
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><Hammer className="w-4 h-4 text-red-400" />{stats.listings} Locations</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-red-400" />{stats.states} States</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-red-400" />{stats.cities} Cities</span>
          </div>
        </div>
      </section>

      {/* Quick filter nav */}
      <section className="bg-white border-b border-gray-200 py-4 overflow-x-auto">
        <div className="flex gap-3 px-4 w-max mx-auto">
          {[
            { href: '/activities/rage-room', emoji: '💥', label: 'Rage Room' },
            { href: '/activities/axe-throwing', emoji: '🪓', label: 'Axe Throwing' },
            { href: '/activities/paint-room', emoji: '🎨', label: 'Paint Room' },
            { href: '/activities/car-smash', emoji: '🚗', label: 'Car Smash' },
            { href: '/occasions/birthday', emoji: '🎂', label: 'Birthday' },
            { href: '/occasions/bachelorette', emoji: '💍', label: 'Bachelorette' },
            { href: '/occasions/corporate', emoji: '💼', label: 'Corporate' },
            { href: '/occasions/date-night', emoji: '❤️', label: 'Date Night' },
            { href: '/occasions/kids', emoji: '👧', label: 'Kids' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <span className="leading-none">{item.emoji}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top Rated Rage Rooms</h2>
          <Link href="/activities/rage-room" className="text-red-600 font-medium text-sm flex items-center gap-1 hover:text-red-700">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map(listing => (
            <ListingCard key={`${listing.state_slug}-${listing.city_slug}-${listing.slug}`} listing={listing} featured />
          ))}
        </div>
      </section>

      {/* Browse by State */}
      <section className="bg-white py-12 px-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Browse by State</h2>
            <Link href="/states" className="text-red-600 font-medium text-sm flex items-center gap-1 hover:text-red-700">
              All states <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {allStates.map(state => (
              <Link
                key={state.slug}
                href={`/${state.slug}`}
                className="bg-gray-50 hover:bg-red-50 hover:border-red-300 border border-gray-200 rounded-xl p-3 text-center transition-colors group"
              >
                <p className="font-semibold text-gray-800 group-hover:text-red-700 text-sm leading-tight">{state.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{state.count} {state.count === 1 ? 'venue' : 'venues'}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What is a rage room — SEO content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Rage Room?</h2>
          <div className="text-gray-600 text-sm leading-relaxed space-y-3">
            <p>
              A <strong>rage room</strong> (also called a smash room, anger room, or destruction room) is a supervised venue where you pay to safely destroy objects — TVs, plates, glass, furniture, and more — as a form of stress relief or entertainment.
            </p>
            <p>
              Participants gear up in protective equipment (helmet, gloves, coveralls) and choose from a selection of breakable items. Popular weapons include baseball bats, sledgehammers, and crowbars. Many venues offer <strong>themed sessions</strong>, custom music, and photo/video packages.
            </p>
            <p>
              Rage rooms are popular for <strong>birthday parties, bachelorette parties, corporate team-building, and date nights</strong>. Sessions typically run 15–60 minutes, with prices starting around $25–$40 per person.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
