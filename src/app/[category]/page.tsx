import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

type Params = { category: string }

export default async function CategoryPage({ params }: { params: Params }) {
  const dirPath = path.join(process.cwd(), 'content', params.category)

  if (!fs.existsSync(dirPath)) {
    return <div className="p-10 text-center">カテゴリが存在しません</div>
  }

  const files = fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith('.md'))

  const items = files.map((filename) => {
    const filePath = path.join(dirPath, filename)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)

    return {
      slug: filename.replace('.md', ''),
      title: data.title || filename.replace('.md', ''),
      icon: data.icon || null,
    }
  })

  return (
    <main className="max-w-screen-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{params.category} 一覧</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(({ slug, title, icon }) => (
          <Link
            href={`/${params.category}/${slug}`}
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