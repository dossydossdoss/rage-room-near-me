'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ListingCard from './ListingCard'
import type { Listing } from '@/lib/types'

interface Props {
  listings: Listing[]
}

const SLIDE_INTERVAL = 5000

export default function FeaturedCarousel({ listings }: Props) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  // Chunk into groups of 6
  const slides = []
  for (let i = 0; i < listings.length; i += 6) {
    slides.push(listings.slice(i, i + 6))
  }
  const total = slides.length

  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total])
  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, SLIDE_INTERVAL)
    return () => clearInterval(id)
  }, [paused, next])

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, si) => (
            <div key={si} className="w-full shrink-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {slide.map(listing => (
                  <ListingCard
                    key={`${listing.state_slug}-${listing.city_slug}-${listing.slug}`}
                    listing={listing}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white border border-gray-200 shadow-md rounded-full p-2 hover:border-red-300 hover:text-red-600 transition-colors z-10 hidden sm:flex items-center justify-center"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white border border-gray-200 shadow-md rounded-full p-2 hover:border-red-300 hover:text-red-600 transition-colors z-10 hidden sm:flex items-center justify-center"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'bg-red-500 w-6 h-2'
                : 'bg-gray-300 hover:bg-gray-400 w-2 h-2'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <p className="text-center text-xs text-gray-400 mt-2">
        {current + 1} / {total} · Hover to pause
      </p>
    </div>
  )
}
