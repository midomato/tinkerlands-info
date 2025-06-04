import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-purple-200 to-blue-200 shadow">
        <div className="max-w-screen-xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Tinkerlands攻略Wiki</h1>
          <p className="text-gray-700 mt-1">お役立ち情報・NPC・クラフト・マップなどを網羅</p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-6 px-4 py-10">
        {/* メイン記事エリア */}
        <main className="flex-1">
          <img
            src="/images/tinkerlands.jpg"
            alt="Tinkerlands Banner"
            className="w-full h-auto rounded-lg shadow mb-6"
          />
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Tinkerlandsのお役立ち情報</h2>
            <table className="w-full border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">効率</th>
                  <th className="p-2 border">お金稼ぎ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">
                    <Link href="#mada">序盤攻略・効率的な進め方</Link>
                  </td>
                  <td className="p-2 border">
                    <Link href="#mada">お金の効率的な稼ぎ方・コイン稼ぎ</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>

        {/* サイドバー */}
        <aside className="w-full md:w-64 space-y-4">
          <section>
            <h3 className="bg-blue-500 text-white text-sm px-3 py-2 rounded-t">お役立ち情報</h3>
            <ul className="border border-blue-500 rounded-b text-sm divide-y">
              <li className="p-2"><Link href="/items">アイテム</Link></li>
              <li className="p-2"><Link href="/items">お金稼ぎ</Link></li>
            </ul>
          </section>
          <section>
            <h3 className="bg-blue-500 text-white text-sm px-3 py-2 rounded-t">道具</h3>
            <ul className="border border-blue-500 rounded-b text-sm divide-y">
              <li className="p-2"><Link href="/items">魔法の斧</Link></li>
              <li className="p-2"><Link href="/items">魔法のつるはし</Link></li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  )
}