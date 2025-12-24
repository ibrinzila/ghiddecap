import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface PageInfo {
  slug: string
  title: string
  order: number
}

async function getGuidePages(): Promise<PageInfo[]> {
  const contentDir = path.join(process.cwd(), 'content/ghid')
  
  try {
    const files = fs.readdirSync(contentDir)
    const pages = files
      .filter(file => file.endsWith('.md') && file !== 'index.md')
      .map(file => {
        const filePath = path.join(contentDir, file)
        const content = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(content)
        return {
          slug: file.replace('.md', ''),
          title: data.title || file.replace('.md', ''),
          order: data.order || 99
        }
      })
      .sort((a, b) => a.order - b.order)
    
    return pages
  } catch {
    return []
  }
}

export default async function HomePage() {
  const pages = await getGuidePages()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Ghidul Jurnalistului pentru Coeziunea Sociala in Moldova
        </h1>
        <p className="text-xl text-gray-600 mb-2">Construind Punti, Nu Ziduri</p>
        <p className="text-sm text-gray-500">
          Ion Brinzila — Autor invitat, Moldova.org
        </p>
      </div>

      {/* Live Document Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="text-2xl">🌱</div>
          <div>
            <h2 className="font-semibold text-blue-900 mb-1">Acesta este un document viu</h2>
            <p className="text-blue-800 text-sm mb-3">
              Acest ghid creste si se rafineaza prin contributiile comunitatii de jurnalisti. 
              Poti edita direct pe pagina, propune exemple din practica ta, sau participa la discutii.
            </p>
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://github.com/ibrinzila/ghid-jurnalist-coeziune-sociala/tree/main/content" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Propune modificari
              </a>
              <Link 
                href="/propuneri" 
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 transition-colors"
              >
                Vezi propunerile
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Find */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ce veti gasi in acest ghid</h2>
        <p className="text-gray-600 mb-4">
          Instrumente practice pentru jurnalistii care doresc sa raporteze despre subiecte sensibile 
          intr-un mod care intareste coeziunea sociala, fara a compromite rigoarea editoriala.
        </p>
        
        {/* Three Core Tools */}
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl mb-2">✅</div>
            <h3 className="font-medium text-gray-900 mb-1">Lista de Verificare</h3>
            <p className="text-sm text-gray-600">5 intrebari inainte de publicare</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl mb-2">🥪</div>
            <h3 className="font-medium text-gray-900 mb-1">Sandwich-ul Adevarului</h3>
            <p className="text-sm text-gray-600">Combaterea dezinformarii</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl mb-2">💡</div>
            <h3 className="font-medium text-gray-900 mb-1">Sablonul Solutiilor</h3>
            <p className="text-sm text-gray-600">5 pasi pentru narative constructive</p>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Cuprins</h2>
        <nav className="space-y-2">
          {pages.map((page, index) => (
            <Link
              key={page.slug}
              href={`/ghid/${page.slug}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium group-hover:bg-blue-200 transition-colors">
                {index + 1}
              </span>
              <span className="text-gray-700 group-hover:text-gray-900">{page.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>Club de Presa „Coeziunea sociala in practica" | UNFPA Moldova | Decembrie 2025</p>
      </div>
    </div>
  )
}
