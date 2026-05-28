import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronRight, MapPin } from 'lucide-react'
import { allStates } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Rage Rooms by State — All 48 States',
  description: 'Browse rage rooms and smash rooms across all 48 US states. Find venues by state, then narrow down by city.',
}

export default function StatesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">All States</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Rage Rooms by State</h1>
        <p className="text-gray-600">{allStates.length} states with verified rage room listings.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allStates.map(state => (
          <Link
            key={state.slug}
            href={`/${state.slug}`}
            className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-red-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">{state.name}</h2>
              <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-full">{state.count}</span>
            </div>
            <div className="space-y-1">
              {state.cities.slice(0, 4).map(city => (
                <div key={city.slug} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400" /> {city.name}
                  </span>
                  <span className="text-gray-400 text-xs">{city.count}</span>
                </div>
              ))}
              {state.cities.length > 4 && (
                <p className="text-xs text-gray-400 mt-1">+{state.cities.length - 4} more cities</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
