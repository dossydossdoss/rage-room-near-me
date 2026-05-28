export interface Listing {
  name: string
  slug: string
  category: string
  phone: string
  website: string
  address: string
  street: string
  city: string
  state: string
  state_slug: string
  city_slug: string
  postal_code: string
  latitude: number | null
  longitude: number | null
  rating: number | null
  reviews: number | null
  place_id: string
  location_link: string
  business_status: string
  working_hours: Record<string, string[]> | null
  // Activities
  act_rage_room: boolean
  act_axe_throwing: boolean
  act_paint_room: boolean
  act_car_smash: boolean
  act_vr: boolean
  act_archery: boolean
  // Pricing
  price_min: number | null
  price_max: number | null
  duration_min: number | null
  duration_max: number | null
  has_group_pricing: boolean
  has_corporate: boolean
  // Occasions
  mkt_birthday: boolean
  mkt_bachelorette: boolean
  mkt_corporate: boolean
  mkt_date_night: boolean
  mkt_kids: boolean
  min_age: number | null
  // Amenities
  walkins_ok: boolean
  weapons_list: string
  breakables_tier: string
  custom_music: boolean
  photo_video: boolean
  gear_provided: boolean
  byob: boolean
  // Booking
  booking_type: string
  booking_platform: string
  has_gift_cards: boolean
  has_online_waiver: boolean
  // Social
  social_instagram: string
  social_tiktok: string
  social_facebook: string
  // Review sentiment
  rev_value_sentiment: string
  rev_staff_quality: string
  rev_room_size: string
  rev_cleanliness: string
  rev_catharsis: boolean
  rev_repeat_visitors: boolean
  rev_repeat_count: number | null
  rev_items_mentioned: string[]
  rev_neg_flags: string[]
  rev_positive_count: number | null
  rev_negative_count: number | null
}

export interface StateEntry {
  name: string
  slug: string
  count: number
  cities: CityEntry[]
}

export interface CityEntry {
  name: string
  slug: string
  count: number
}

export interface Filters {
  activity: string[]
  occasion: string[]
  walkins: boolean
  giftCards: boolean
  priceMax: number | null
  query: string
}
