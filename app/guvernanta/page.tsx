import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'

async function getGovernanceContent() {
  const filePath = path.join(process.cwd(), 'content/guvernanta/cum-decidem-impreuna.md')
  
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const { data, content: body } = matter(content)
    return { data, body }
  } catch {
    return null
  }
}

export default async function GovernancePage() {
  const pageContent = await getGovernanceContent()

  if (!pageContent) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Documentul nu a fost gasit</h1>
        <Link href="/" className="text-blue-600 hover:underline">Inapoi la ghid</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
          ← Inapoi la ghid
        </Link>
      </nav>

      {/* Main Content */}
      <article className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
        <div className="prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {pageContent.body}
          </ReactMarkdown>
        </div>
      </article>

      {/* CTA */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
        <h3 className="font-semibold text-blue-900 mb-2">Pregatit sa contribui?</h3>
        <p className="text-blue-800 text-sm mb-4">
          Acum ca stii cum functioneaza procesul, poti incepe sa contribui la ghid.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://github.com/ibrinzila/ghid-jurnalist-coeziune-sociala/tree/main/content"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
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
  )
}
