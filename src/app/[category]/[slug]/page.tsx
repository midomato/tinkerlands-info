import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content')

  const categories = fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  const paths = categories.flatMap((category) => {
    const dirPath = path.join(contentDir, category)
    return fs
      .readdirSync(dirPath)
      .filter((file) => file.endsWith('.md'))
      .map((filename) => ({
        category,
        slug: filename.replace('.md', ''),
      }))
  })

  return paths
}

export default async function Page({ params }: any) {
  const filePath = path.join(process.cwd(), 'content', params.category, `${params.slug}.md`)
  const fileContent = fs.readFileSync(filePath, 'utf8')

  const { data, content } = matter(fileContent)
  const processed = await remark().use(html).process(content)
  const htmlContent = processed.toString()

  return (
    <main className="max-w-screen-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <p className="text-muted-foreground">{data.category}</p>
      {data.icon && (
        <img src={data.icon} alt={data.title} className="w-20 h-20 my-4" />
      )}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </main>
  )
}