import Link from 'next/link'
import { Hammer } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-3">
            <Hammer className="w-5 h-5 text-red-400" />
            Rage Room Near Me
          </Link>
          <p className="text-sm">The most complete directory of rage rooms, smash rooms, and stress-relief venues across the USA.</p>
        </div>
        <div>
          <p className="text-white font-semibold mb-3 text-sm">Activities</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/activities/rage-room" className="hover:text-white transition-colors">Rage Rooms</Link></li>
            <li><Link href="/activities/axe-throwing" className="hover:text-white transition-colors">Axe Throwing</Link></li>
            <li><Link href="/activities/paint-room" className="hover:text-white transition-colors">Paint Rooms</Link></li>
            <li><Link href="/activities/car-smash" className="hover:text-white transition-colors">Car Smash</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-3 text-sm">Perfect For</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/occasions/birthday" className="hover:text-white transition-colors">Birthday Parties</Link></li>
            <li><Link href="/occasions/bachelorette" className="hover:text-white transition-colors">Bachelorette</Link></li>
            <li><Link href="/occasions/corporate" className="hover:text-white transition-colors">Corporate Events</Link></li>
            <li><Link href="/occasions/date-night" className="hover:text-white transition-colors">Date Night</Link></li>
            <li><Link href="/occasions/kids" className="hover:text-white transition-colors">Kids & Families</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-white font-semibold mb-3 text-sm">Popular States</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/texas" className="hover:text-white transition-colors">Texas</Link></li>
            <li><Link href="/florida" className="hover:text-white transition-colors">Florida</Link></li>
            <li><Link href="/california" className="hover:text-white transition-colors">California</Link></li>
            <li><Link href="/new-york" className="hover:text-white transition-colors">New York</Link></li>
            <li><Link href="/states" className="hover:text-white transition-colors">All States →</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 px-4 sm:px-6 max-w-7xl mx-auto text-xs text-gray-600">
        <span>© {new Date().getFullYear()} rageroomnearme.org — All rights reserved</span>
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
