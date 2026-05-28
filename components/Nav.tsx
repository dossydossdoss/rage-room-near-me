import Link from 'next/link'
import { Hammer } from 'lucide-react'
export default function Nav() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:text-red-600 transition-colors">
          <Hammer className="w-6 h-6 text-red-500" />
          Rage Room Near Me
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/activities" className="hover:text-red-600 transition-colors hidden sm:block">Browse</Link>
          <Link href="/occasions" className="hover:text-red-600 transition-colors hidden sm:block">Occasions</Link>
          <Link href="/states" className="hover:text-red-600 transition-colors hidden sm:block">All States</Link>
          <Link href="/blog" className="hover:text-red-600 transition-colors hidden sm:block">Blog</Link>
        </div>
      </div>
    </nav>
  )
}
