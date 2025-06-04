import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export async function generateStaticParams() {
  const base = path.join(process.cwd(), 'content')
  const categories = await fs.readdir(base)

  return (
    await Promise.all(
      categories.map(async (category) => {
        const files = await fs.readdir(path.join(base, category))
        return files
          .filter(f => f.endsWith('.md'))
          .map(file => ({
            category,
            slug: file.replace(/\.md$/, ''),
          }))
      })
    )
  ).flat()
}

export default async function Page({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params

  const filePath = path.join(process.cwd(), 'content', category, `${slug}.md`)
  const raw = await fs.readFile(filePath, 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(html).process(content)

  return (
    <main className="max-w-screen-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{data.title}</h1>
      <article className="prose" dangerouslySetInnerHTML={{ __html: processed.toString() }} />
    </main>
  )
}