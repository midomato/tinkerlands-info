import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content')
  const categories = await fs.readdir(contentDir)

  return categories.map((category) => ({ category }))
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params

  const dirPath = path.join(process.cwd(), 'content', category)

  let files: string[]
  try {
    files = (await fs.readdir(dirPath)).filter((f) => f.endsWith('.md'))
  } catch (err) {
    return <div className="p-10 text-center text-red-500">カテゴリが存在しません</div>
  }

  const items = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(dirPath, filename)
      const fileContent = await fs.readFile(filePath, 'utf8')
      const { data } = matter(fileContent)

      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title || filename.replace(/\.md$/, ''),
        icon: data.icon || null,
      }
    })
  )

  return (
    <main className="max-w-screen-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{category} 一覧</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(({ slug, title, icon }) => (
          <Link
            href={`/${category}/${slug}`}
            key={slug}
            className="p-4 border rounded-xl hover:shadow-md transition"
          >
            {icon && (
              <img src={icon} alt={title} className="w-16 h-16 mb-2" />
            )}
            <h2 className="text-xl font-semibold">{title}</h2>
          </Link>
        ))}
      </div>
    </main>
  )
}