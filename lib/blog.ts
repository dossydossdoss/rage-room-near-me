import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  keywords: string[]
  readTime: number
  content: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readTime: number
}

export function getAllPosts(): BlogPostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
  return files
    .map(file => {
      const slug = file.replace('.md', '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        category: data.category ?? 'Guide',
        readTime: data.readTime ?? 5,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const html = marked(content) as string
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category ?? 'Guide',
    keywords: data.keywords ?? [],
    readTime: data.readTime ?? 5,
    content: html,
  }
}
