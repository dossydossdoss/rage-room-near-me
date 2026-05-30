import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MapPin, Phone, Globe, Clock, ChevronRight, Star, Users, Gift, ExternalLink, CheckCircle2 } from 'lucide-react'
import { allListings, allStates, getListing, getListingsByCity } from '@/lib/data'
import { formatPrice, formatRating, getActivities, getOccasions, stateUrl, cityUrl, listingUrl, cn } from '@/lib/utils'
import { pageMeta } from '@/lib/seo'
import ListingCard from '@/components/ListingCard'

interface Props {
  params: Promise<{ state: string; city: string; slug: string }>
}

export async function generateStaticParams() {
  return allListings.map(l => ({
    state: l.state_slug,
    city: l.city_slug,
    slug: l.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, city, slug } = await params
  const listing = getListing(state, city, slug)
  if (!listing) return {}
  return {
    title: `${listing.name} — Rage Room in ${listing.city}, ${listing.state}`,
    description: `${listing.name} is a rage room in ${listing.city}, ${listing.state}. ${listing.rating ? `Rated ${listing.rating}/5 from ${listing.reviews} reviews.` : ''} ${formatPrice(listing.price_min, listing.price_max)}. Book online.`,
    ...pageMeta(listingUrl(state, city, slug)),
  }
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const ACTIVITY_COLORS: Record<string, string> = {
  'Rage Room': 'bg-red-100 text-red-700 border-red-200',
  'Axe Throwing': 'bg-orange-100 text-orange-700 border-orange-200',
  'Paint Room': 'bg-purple-100 text-purple-700 border-purple-200',
  'Car Smash': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'VR': 'bg-blue-100 text-blue-700 border-blue-200',
  'Archery': 'bg-green-100 text-green-700 border-green-200',
}

function SentimentBadge({ value }: { value: string }) {
  if (!value) return null
  const colors = {
    positive: 'bg-green-50 text-green-700',
    negative: 'bg-red-50 text-red-700',
    neutral: 'bg-gray-100 text-gray-600',
    ok: 'bg-blue-50 text-blue-700',
    small: 'bg-yellow-50 text-yellow-700',
  }
  return (
    <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium capitalize', colors[value as keyof typeof colors] ?? 'bg-gray-100 text-gray-600')}>
      {value}
    </span>
  )
}

export default async function ListingPage({ params }: Props) {
  const { state: stateSlug, city: citySlug, slug } = await params
  const listing = getListing(stateSlug, citySlug, slug)
  if (!listing) notFound()

  const state = allStates.find(s => s.slug === stateSlug)
  const cityEntry = state?.cities.find(c => c.slug === citySlug)
  const activities = getActivities(listing)
  const occasions = getOccasions(listing)
  const nearby = getListingsByCity(stateSlug, citySlug)
    .filter(l => l.slug !== slug)
    .slice(0, 3)

  const hasReviewData = listing.rev_staff_quality || listing.rev_value_sentiment || listing.rev_cleanliness

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-red-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={stateUrl(stateSlug)} className="hover:text-red-600">{listing.state}</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={cityUrl(stateSlug, citySlug)} className="hover:text-red-600">{listing.city}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{listing.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {activities.map(act => (
                <span key={act} className={cn('text-sm font-semibold px-3 py-1 rounded-full border', ACTIVITY_COLORS[act] ?? 'bg-gray-100 text-gray-600 border-gray-200')}>
                  {act}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{listing.name}</h1>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 text-gray-600">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>{listing.address}</span>
              </div>
              {listing.rating && (
                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-amber-700">{formatRating(listing.rating)}</span>
                  {listing.reviews && <span className="text-gray-500 text-sm">({listing.reviews} reviews)</span>}
                </div>
              )}
            </div>
          </div>

          {/* Activities & Occasions */}
          {occasions.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="font-bold text-gray-900 mb-3">Perfect For</h2>
              <div className="flex flex-wrap gap-2">
                {occasions.map(occ => (
                  <span key={occ} className="bg-purple-50 text-purple-700 border border-purple-200 text-sm font-medium px-3 py-1 rounded-full">
                    {occ}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pricing & Duration */}
          {(listing.price_min || listing.price_max || listing.duration_min || listing.duration_max) && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Pricing & Sessions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {(listing.price_min || listing.price_max) && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Price Range</p>
                    <p className="text-lg font-bold text-gray-900">{formatPrice(listing.price_min, listing.price_max)}</p>
                  </div>
                )}
                {(listing.duration_min || listing.duration_max) && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Session Length</p>
                    <p className="text-lg font-bold text-gray-900">
                      {listing.duration_min && listing.duration_max
                        ? `${listing.duration_min}–${listing.duration_max} min`
                        : listing.duration_max
                        ? `Up to ${listing.duration_max} min`
                        : `${listing.duration_min} min`}
                    </p>
                  </div>
                )}
                {listing.min_age && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Min Age</p>
                    <p className="text-lg font-bold text-gray-900">{listing.min_age}+</p>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100">
                {listing.has_group_pricing && (
                  <span className="flex items-center gap-1.5 text-sm text-gray-600"><Users className="w-4 h-4 text-blue-500" /> Group pricing</span>
                )}
                {listing.has_gift_cards && (
                  <span className="flex items-center gap-1.5 text-sm text-gray-600"><Gift className="w-4 h-4 text-pink-500" /> Gift cards</span>
                )}
                {listing.walkins_ok && (
                  <span className="flex items-center gap-1.5 text-sm text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-medium">✓ Walk-ins welcome</span>
                )}
                {listing.custom_music && (
                  <span className="text-sm text-gray-600">🎵 Custom music</span>
                )}
                {listing.photo_video && (
                  <span className="text-sm text-gray-600">📸 Photo/video</span>
                )}
                {listing.byob && (
                  <span className="text-sm text-gray-600">🍺 BYOB</span>
                )}
              </div>
            </div>
          )}

          {/* What you can smash */}
          {listing.rev_items_mentioned.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="font-bold text-gray-900 mb-3">What You Can Smash</h2>
              <div className="flex flex-wrap gap-2">
                {listing.rev_items_mentioned.map(item => (
                  <span key={item} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full capitalize">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Review insights */}
          {hasReviewData && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="font-bold text-gray-900 mb-4">Review Insights</h2>
              <div className="grid grid-cols-2 gap-3">
                {listing.rev_staff_quality && (
                  <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                    <span className="text-sm text-gray-600">Staff quality</span>
                    <SentimentBadge value={listing.rev_staff_quality} />
                  </div>
                )}
                {listing.rev_value_sentiment && (
                  <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                    <span className="text-sm text-gray-600">Value for money</span>
                    <SentimentBadge value={listing.rev_value_sentiment} />
                  </div>
                )}
                {listing.rev_cleanliness && (
                  <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                    <span className="text-sm text-gray-600">Cleanliness</span>
                    <SentimentBadge value={listing.rev_cleanliness} />
                  </div>
                )}
                {listing.rev_room_size && (
                  <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                    <span className="text-sm text-gray-600">Room size</span>
                    <SentimentBadge value={listing.rev_room_size} />
                  </div>
                )}
              </div>
              {listing.rev_catharsis && (
                <p className="mt-3 text-sm text-green-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Reviewers say it&apos;s genuinely cathartic
                </p>
              )}
              {listing.rev_repeat_visitors && (
                <p className="mt-1 text-sm text-blue-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> {listing.rev_repeat_count ? `${listing.rev_repeat_count}+ reviewers` : 'Multiple reviewers'} came back for repeat visits
                </p>
              )}
            </div>
          )}

          {/* Hours */}
          {listing.working_hours && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-400" /> Hours
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {DAYS.map(day => {
                  const hours = listing.working_hours![day]
                  if (!hours) return null
                  const closed = hours[0] === 'Closed'
                  return (
                    <div key={day} className="flex items-center justify-between text-sm py-1.5 border-b border-gray-50">
                      <span className="text-gray-600 font-medium w-28">{day}</span>
                      <span className={closed ? 'text-gray-400' : 'text-gray-900 font-medium'}>
                        {closed ? 'Closed' : hours.join(', ')}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Book CTA */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl p-5 shadow-lg">
            <h2 className="font-bold text-lg mb-1">Ready to Smash?</h2>
            <p className="text-red-100 text-sm mb-4">Book your session at {listing.name}</p>
            {listing.website ? (
              <a
                href={listing.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-white text-red-600 font-bold py-3 rounded-xl hover:bg-red-50 transition-colors"
              >
                Book Now <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <p className="text-red-200 text-sm text-center">No website available — call to book</p>
            )}
            {listing.phone && (
              <a
                href={`tel:${listing.phone}`}
                className="flex items-center justify-center gap-2 w-full mt-2 border border-red-400 text-white font-medium py-2.5 rounded-xl hover:bg-red-600 transition-colors text-sm"
              >
                <Phone className="w-4 h-4" /> {listing.phone}
              </a>
            )}
          </div>

          {/* Quick info */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            {listing.address && (
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Address</p>
                  <p className="text-sm text-gray-800">{listing.address}</p>
                  {listing.location_link && (
                    <a href={listing.location_link} target="_blank" rel="noopener noreferrer" className="text-xs text-red-600 hover:underline">
                      Get directions →
                    </a>
                  )}
                </div>
              </div>
            )}
            {listing.website && (
              <div className="flex gap-3">
                <Globe className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Website</p>
                  <a href={listing.website} target="_blank" rel="noopener noreferrer" className="text-sm text-red-600 hover:underline truncate block max-w-[200px]">
                    {listing.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              </div>
            )}
            {listing.booking_platform && listing.booking_platform !== 'unknown' && (
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Booking</p>
                  <p className="text-sm text-gray-800 capitalize">{listing.booking_type} via {listing.booking_platform}</p>
                </div>
              </div>
            )}
            {(listing.social_instagram || listing.social_facebook || listing.social_tiktok) && (
              <div className="flex gap-3 pt-2 border-t border-gray-100">
                <div className="flex gap-2">
                  {listing.social_instagram && (
                    <a href={listing.social_instagram} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-600 hover:text-pink-600 bg-gray-100 px-2 py-1 rounded-full">
                      Instagram
                    </a>
                  )}
                  {listing.social_facebook && (
                    <a href={listing.social_facebook} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-600 hover:text-blue-600 bg-gray-100 px-2 py-1 rounded-full">
                      Facebook
                    </a>
                  )}
                  {listing.social_tiktok && (
                    <a href={listing.social_tiktok} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-600 hover:text-black bg-gray-100 px-2 py-1 rounded-full">
                      TikTok
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Map embed */}
          {listing.latitude && listing.longitude && (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <iframe
                src={`https://www.google.com/maps?q=${listing.latitude},${listing.longitude}&z=15&output=embed`}
                width="100%"
                height="220"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>
      </div>

      {/* Nearby listings */}
      {nearby.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">More Rage Rooms in {listing.city}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearby.map(l => (
              <ListingCard key={l.slug} listing={l} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
