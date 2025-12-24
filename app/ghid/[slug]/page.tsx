import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface PageProps {
  params: { slug: string }
}

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

async function getPageContent(slug: string) {
  const filePath = path.join(process.cwd(), 'content/ghid', `${slug}.md`)
  
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const { data, content: body } = matter(content)
    return { data, body }
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content/ghid')
  
  try {
    const files = fs.readdirSync(contentDir)
    return files
      .filter(file => file.endsWith('.md') && file !== 'index.md')
      .map(file => ({
        slug: file.replace('.md', '')
      }))
  } catch {
    return []
  }
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = params
  const pageContent = await getPageContent(slug)
  const allPages = await getGuidePages()
  
  if (!pageContent) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Pagina nu a fost gasita</h1>
        <Link href="/" className="text-blue-600 hover:underline">Inapoi la ghid</Link>
      </div>
    )
  }

  const currentIndex = allPages.findIndex(p => p.slug === slug)
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
          ← Inapoi la cuprins
        </Link>
      </nav>

      {/* Main Content */}
      <article className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 mb-8">
        <div className="prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {pageContent.body}
          </ReactMarkdown>
        </div>
      </article>

      {/* Edit CTA */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-gray-900">Ai sugestii pentru aceasta sectiune?</h3>
            <p className="text-sm text-gray-600">Editeaza direct sau propune modificari.</p>
          </div>
          <a
            href="https://github.com/ibrinzila/ghid-jurnalist-coeziune-sociala/tree/main/content/ghid"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Propune modificari
          </a>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        {prevPage ? (
          <Link
            href={`/ghid/${prevPage.slug}`}
            className="flex-1 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <div className="text-sm text-gray-500 mb-1">← Anterior</div>
            <div className="font-medium text-gray-900">{prevPage.title}</div>
          </Link>
        ) : <div className="flex-1" />}
        
        {nextPage ? (
          <Link
            href={`/ghid/${nextPage.slug}`}
            className="flex-1 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-right"
          >
            <div className="text-sm text-gray-500 mb-1">Urmator →</div>
            <div className="font-medium text-gray-900">{nextPage.title}</div>
          </Link>
        ) : <div className="flex-1" />}
      </div>
    </div>
  )
}
