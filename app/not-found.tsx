import Link from 'next/link'
import { Hammer, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-5 rounded-full">
            <Hammer className="w-12 h-12 text-red-500" />
          </div>
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-bold text-gray-700 mb-3">Nothing to smash here</h2>
        <p className="text-gray-500 mb-8">
          This page doesn&apos;t exist. Try searching for a rage room near you instead.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/states"
            className="border border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-600 font-medium px-6 py-3 rounded-xl transition-colors"
          >
            Browse All States
          </Link>
        </div>
      </div>
    </div>
  )
}
