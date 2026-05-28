import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronRight, Clock, ArrowLeft } from 'lucide-react'
import { getAllPosts, getPost } from '@/lib/blog'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  'Guide': 'bg-blue-100 text-blue-700',
  'Occasions': 'bg-purple-100 text-purple-700',
  'Tips': 'bg-green-100 text-green-700',
  'Wellness': 'bg-pink-100 text-pink-700',
  'Activities': 'bg-orange-100 text-orange-700',
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const allPosts = getAllPosts().filter(p => p.slug !== slug).slice(0, 3)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/blog" className="hover:text-red-600">Blog</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{post.title}</span>
      </nav>

      <article>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-600'}`}>
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" /> {post.readTime} min read
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">{post.description}</p>
          <p className="mt-3 text-sm text-gray-400">
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div
          className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* CTA */}
      <div className="mt-12 bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 text-white rounded-2xl p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Ready to Find a Rage Room Near You?</h2>
        <p className="text-gray-300 text-sm mb-4">Browse 316 verified venues across 48 states.</p>
        <Link
          href="/"
          className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          Find a Rage Room
        </Link>
      </div>

      {/* More posts */}
      {allPosts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">More from the Blog</h2>
          <div className="space-y-3">
            {allPosts.map(p => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-red-300 transition-colors group"
              >
                <span className="text-sm font-medium text-gray-800 group-hover:text-red-600">{p.title}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}

      <Link href="/blog" className="mt-8 flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>
    </div>
  )
}
