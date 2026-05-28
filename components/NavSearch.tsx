'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Building2, Hammer } from 'lucide-react'
import Fuse from 'fuse.js'
import searchData from '@/data/search_index.json'
import { cn } from '@/lib/utils'

interface SearchEntry {
  type: 'state' | 'city' | 'venue'
  label: string
  sublabel: string
  url: string
  search: string
}

const entries = searchData as SearchEntry[]

const TYPE_ICON = {
  state: <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />,
  city: <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />,
  venue: <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />,
}

const TYPE_LABEL = {
  state: 'State',
  city: 'City',
  venue: 'Venue',
}

export default function NavSearch() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(-1)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const fuse = useMemo(() => new Fuse(entries, {
    keys: ['search'],
    threshold: 0.35,
    includeScore: true,
  }), [])

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return []

    const raw = fuse.search(query.trim(), { limit: 20 })

    // Group: states first, then cities, then venues — max 2 states, 4 cities, 4 venues
    const states = raw.filter(r => r.item.type === 'state').slice(0, 2)
    const cities = raw.filter(r => r.item.type === 'city').slice(0, 4)
    const venues = raw.filter(r => r.item.type === 'venue').slice(0, 4)

    return [...states, ...cities, ...venues].map(r => r.item)
  }, [query, fuse])

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setCursor(-1)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor(c => Math.min(c + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor(c => Math.max(c - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (cursor >= 0 && results[cursor]) {
        navigate(results[cursor].url)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      setCursor(-1)
      inputRef.current?.blur()
    }
  }

  function navigate(url: string) {
    router.push(url)
    setQuery('')
    setOpen(false)
    setCursor(-1)
    inputRef.current?.blur()
  }

  return (
    <div ref={containerRef} className="relative hidden md:block w-64">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search city or state..."
          value={query}
          onChange={e => {
            setQuery(e.target.value)
            setOpen(true)
            setCursor(-1)
          }}
          onFocus={() => query.length >= 2 && setOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-red-400 bg-gray-50 focus:bg-white transition-colors"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden z-50">
          {results.map((entry, i) => (
            <button
              key={entry.url}
              onMouseDown={e => { e.preventDefault(); navigate(entry.url) }}
              onMouseEnter={() => setCursor(i)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                cursor === i ? 'bg-red-50' : 'hover:bg-gray-50'
              )}
            >
              {TYPE_ICON[entry.type]}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{entry.label}</p>
                <p className="text-xs text-gray-500 truncate">{entry.sublabel}</p>
              </div>
              <span className={cn(
                'text-xs px-1.5 py-0.5 rounded font-medium shrink-0',
                entry.type === 'state' ? 'bg-red-100 text-red-600' :
                entry.type === 'city' ? 'bg-orange-100 text-orange-600' :
                'bg-gray-100 text-gray-500'
              )}>
                {TYPE_LABEL[entry.type]}
              </span>
            </button>
          ))}
        </div>
      )}

      {open && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-gray-200 shadow-xl z-50 px-4 py-3 text-sm text-gray-500">
          No results for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  )
}
