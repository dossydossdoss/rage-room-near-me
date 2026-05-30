#!/usr/bin/env python3
"""Run from the website/ directory: python3 scripts/build_sitemap.py"""
import json
import os
from datetime import date

BASE = 'https://rageroomnearme.org'
TODAY = date.today().isoformat()

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

with open(os.path.join(ROOT, 'data/listings.json')) as f:
    listings = json.load(f)

with open(os.path.join(ROOT, 'data/states.json')) as f:
    states = json.load(f)

BLOG_DIR = os.path.join(ROOT, 'content/blog')
blog_slugs = sorted([
    f.replace('.md', '')
    for f in os.listdir(BLOG_DIR)
    if f.endswith('.md')
])

urls = []

def add(loc, priority, changefreq='monthly'):
    # Canonical URLs use a trailing slash (next.config trailingSlash: true).
    # Emit the final URL so the sitemap never lists a redirecting URL.
    if loc != '/' and not loc.endswith('/'):
        loc = loc + '/'
    urls.append(f"""  <url>
    <loc>{BASE}{loc}</loc>
    <lastmod>{TODAY}</lastmod>
    <changefreq>{changefreq}</changefreq>
    <priority>{priority}</priority>
  </url>""")

# Core pages
add('/', '1.0', 'weekly')
add('/states', '0.8')
add('/occasions', '0.8')
add('/activities', '0.8')
add('/blog', '0.8', 'weekly')
add('/about', '0.5')
add('/contact', '0.5')
add('/privacy-policy', '0.3')

# Activity pages
for act in ['rage-room', 'axe-throwing', 'paint-room', 'car-smash', 'vr', 'archery']:
    add(f'/activities/{act}', '0.8')

# Occasion pages
for occ in ['birthday', 'bachelorette', 'corporate', 'date-night', 'kids']:
    add(f'/occasions/{occ}', '0.8')

# Blog posts
for slug in blog_slugs:
    add(f'/blog/{slug}', '0.7', 'monthly')

# State pages
for state in states:
    add(f"/{state['slug']}", '0.7')

# City pages
for state in states:
    for city in state['cities']:
        add(f"/{state['slug']}/{city['slug']}", '0.7')

# Listing pages
for l in listings:
    add(f"/{l['state_slug']}/{l['city_slug']}/{l['slug']}", '0.6')

sitemap = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(urls)}
</urlset>"""

out = os.path.join(ROOT, 'public/sitemap.xml')
with open(out, 'w') as f:
    f.write(sitemap)

print(f"Sitemap: {len(urls)} URLs written to public/sitemap.xml")
print(f"  Blog posts included: {len(blog_slugs)} ({', '.join(blog_slugs)})")
