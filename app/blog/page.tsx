import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronRight, Clock, Tag } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Rage Room Blog — Guides, Tips & Insights',
  description: 'Everything you need to know about rage rooms — costs, age limits, what to wear, occasion ideas, and more.',
}

const CATEGORY_COLORS: Record<string, string> = {
  'Guide': 'bg-blue-100 text-blue-700',
  'Occasions': 'bg-purple-100 text-purple-700',
  'Tips': 'bg-green-100 text-green-700',
  'Wellness': 'bg-pink-100 text-pink-700',
  'Activities': 'bg-orange-100 text-orange-700',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Blog</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Rage Room Blog</h1>
        <p className="text-gray-600">Guides, tips, and everything you need to know before you smash.</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet — check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-gray-200 rounded-2xl p-6 hover:border-red-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-600'}`}>
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" /> {post.readTime} min read
                </span>
              </div>
              <h2 className="font-bold text-gray-900 text-lg leading-snug mb-2 group-hover:text-red-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{post.description}</p>
              <p className="mt-4 text-xs text-gray-400">
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
