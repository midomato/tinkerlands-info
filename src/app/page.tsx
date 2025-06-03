export default function Home() {
  return (
    <main className="px-4 py-12 max-w-screen-lg mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">Tinkerlands非公式Wiki</h1>
      <p className="text-lg text-muted-foreground mb-8">
        クラフト・素材・マップ・敵などの最新情報をまとめた攻略Wikiです。
      </p>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {[
          { title: 'クラフト', href: '/crafting' },
          { title: 'アイテム一覧', href: '/items' },
          { title: 'バイオーム', href: '/biomes' },
          { title: '攻略ガイド', href: '/guides' },
          { title: 'アップデート情報', href: '/updates' },
        ].map(({ title, href }) => (
          <a
            key={title}
            href={href}
            className="border rounded-2xl p-4 block transform transition-all hover:scale-105 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold">{title}</h2>
          </a>
        ))}
      </div>
    </main>
  )
}
