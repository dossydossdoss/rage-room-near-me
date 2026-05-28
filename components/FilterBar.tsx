'use client'

import { useState, useCallback } from 'react'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import type { Filters } from '@/lib/types'
import { cn } from '@/lib/utils'

const ACTIVITIES = [
  { id: 'rage_room', label: 'Rage Room' },
  { id: 'axe_throwing', label: 'Axe Throwing' },
  { id: 'paint_room', label: 'Paint Room' },
  { id: 'car_smash', label: 'Car Smash' },
  { id: 'vr', label: 'VR' },
]

const OCCASIONS = [
  { id: 'birthday', label: 'Birthday' },
  { id: 'bachelorette', label: 'Bachelorette' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'date_night', label: 'Date Night' },
  { id: 'kids', label: 'Kids' },
]

interface Props {
  filters: Filters
  onChange: (filters: Filters) => void
  total: number
  filtered: number
}

export default function FilterBar({ filters, onChange, total, filtered }: Props) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const toggleActivity = useCallback((id: string) => {
    const next = filters.activity.includes(id)
      ? filters.activity.filter(a => a !== id)
      : [...filters.activity, id]
    onChange({ ...filters, activity: next })
  }, [filters, onChange])

  const toggleOccasion = useCallback((id: string) => {
    const next = filters.occasion.includes(id)
      ? filters.occasion.filter(o => o !== id)
      : [...filters.occasion, id]
    onChange({ ...filters, occasion: next })
  }, [filters, onChange])

  const hasActiveFilters = filters.activity.length > 0 || filters.occasion.length > 0 || filters.walkins || filters.giftCards || filters.query

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or city..."
          value={filters.query}
          onChange={e => onChange({ ...filters, query: e.target.value })}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-red-400 text-sm"
        />
        {filters.query && (
          <button onClick={() => onChange({ ...filters, query: '' })} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Activities */}
      <div className="mb-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Activities</p>
        <div className="flex flex-wrap gap-2">
          {ACTIVITIES.map(act => (
            <button
              key={act.id}
              onClick={() => toggleActivity(act.id)}
              className={cn(
                'text-sm px-3 py-1.5 rounded-full border font-medium transition-colors',
                filters.activity.includes(act.id)
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600'
              )}
            >
              {act.label}
            </button>
          ))}
        </div>
      </div>

      {/* Occasions */}
      <div className="mb-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Perfect For</p>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map(occ => (
            <button
              key={occ.id}
              onClick={() => toggleOccasion(occ.id)}
              className={cn(
                'text-sm px-3 py-1.5 rounded-full border font-medium transition-colors',
                filters.occasion.includes(occ.id)
                  ? 'bg-purple-500 border-purple-500 text-white'
                  : 'border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600'
              )}
            >
              {occ.label}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced toggle */}
      <button
        onClick={() => setShowAdvanced(v => !v)}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-2"
      >
        <SlidersHorizontal className="w-4 h-4" />
        {showAdvanced ? 'Less filters' : 'More filters'}
      </button>

      {showAdvanced && (
        <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.walkins}
              onChange={e => onChange({ ...filters, walkins: e.target.checked })}
              className="rounded text-red-500"
            />
            Walk-ins welcome
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.giftCards}
              onChange={e => onChange({ ...filters, giftCards: e.target.checked })}
              className="rounded text-red-500"
            />
            Gift cards available
          </label>
        </div>
      )}

      {/* Results count + clear */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-3">
        <span className="text-sm text-gray-500">
          {filtered === total ? `${total} locations` : `${filtered} of ${total} locations`}
        </span>
        {hasActiveFilters && (
          <button
            onClick={() => onChange({ activity: [], occasion: [], walkins: false, giftCards: false, priceMax: null, query: '' })}
            className="text-sm text-red-500 hover:text-red-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  )
}
