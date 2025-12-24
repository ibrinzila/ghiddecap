'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Proposal {
  id: number
  title: string
  body: string
  user: { login: string }
  created_at: string
  html_url: string
  number: number
}

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // TODO: Replace with your actual GitHub repository
    // Format: https://api.github.com/repos/USERNAME/REPO_NAME/pulls?state=open
    const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO || ''
    
    if (!GITHUB_REPO) {
      setLoading(false)
      return
    }

    fetch(`https://api.github.com/repos/${GITHUB_REPO}/pulls?state=open`)
      .then(res => {
        if (!res.ok) throw new Error('Nu am putut incarca propunerile')
        return res.json()
      })
      .then(data => {
        setProposals(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const calculateDaysRemaining = (createdAt: string) => {
    const created = new Date(createdAt)
    const deadline = new Date(created.getTime() + 14 * 24 * 60 * 60 * 1000)
    const now = new Date()
    const remaining = Math.ceil((deadline.getTime() - now.getTime()) / (24 * 60 * 60 * 1000))
    return Math.max(0, remaining)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Propuneri in Asteptare</h1>
        <p className="text-gray-600">
          Aceste modificari au fost propuse de comunitate si asteapta feedback. 
          Fiecare propunere ramane deschisa 14 zile. Daca nu exista obiectii substantiale, 
          va fi integrata in ghid.
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-blue-800">
            <strong>Cum functioneaza:</strong> Citeste propunerile, adauga comentarii pe GitHub, 
            sustine ideile bune sau ridica obiectii. Transparenta ne ajuta sa decidem impreuna.
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Se incarca propunerile...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-700">{error}</p>
        </div>
      ) : proposals.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="text-4xl mb-4">🌱</div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Nu exista propuneri in asteptare</h2>
          <p className="text-gray-600 mb-6">
            Fii primul care propune o imbunatatire! Ghidul creste prin contributiile fiecaruia.
          </p>
          <a
            href="https://github.com/ibrinzila/ghid-jurnalist-coeziune-sociala/tree/main/content"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Propune o modificare
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {proposals.map((proposal) => {
            const daysRemaining = calculateDaysRemaining(proposal.created_at)
            return (
              <article key={proposal.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-1">
                        {proposal.title}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Propus de <span className="font-medium text-gray-700">{proposal.user.login}</span> · {new Date(proposal.created_at).toLocaleDateString('ro-RO')}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium flex-shrink-0 ${
                      daysRemaining <= 3 
                        ? 'bg-amber-100 text-amber-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {daysRemaining > 0 
                        ? `${daysRemaining} zile ramase`
                        : 'Gata pentru integrare'}
                    </div>
                  </div>
                  
                  {proposal.body && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {proposal.body}
                    </p>
                  )}

                  <a
                    href={proposal.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Vezi detalii si comenteaza pe GitHub
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      )}

      {/* How to Participate */}
      <div className="mt-12 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Cum participi la decizii</h3>
        <div className="grid sm:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-xl">👍</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Sustine</h4>
            <p className="text-gray-600">
              Daca o propunere ti se pare valoroasa, spune-o. Sustinerea activa ajuta propunatorii.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-xl">🤔</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Clarifica</h4>
            <p className="text-gray-600">
              Ai intrebari? Cere detalii. Dialogul deschis ne ajuta sa intelegem mai bine.
            </p>
          </div>
          <div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-3">
              <span className="text-xl">⚠️</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Obiectii</h4>
            <p className="text-gray-600">
              Vezi o problema? Ridic-o respectuos. Obiectiile substantiale opresc integrarea.
            </p>
          </div>
        </div>
      </div>

      {/* Link to Governance */}
      <div className="mt-8 text-center">
        <Link href="/guvernanta" className="text-blue-600 hover:underline text-sm">
          Citeste regulile complete de guvernanta →
        </Link>
      </div>
    </div>
  )
}
