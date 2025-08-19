import React, { useEffect, useState } from 'react'

interface Lead {
  id: number
  nome: string
  empresa: string
  email: string
  fonte: string
  pontuacao: number
  status: string
}

interface Oportunidade {
  id: number
  nome: string
  etapa: string
  valor?: number
  accountName: string
}

function App() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [oportunidades, setOportunidades] = useState<Oportunidade[]>([])

  useEffect(() => {
    setTimeout(() => {
      fetch('/leads.json')
        .then(res => res.json())
        .then(data => {
          setLeads(data)
          setLoading(false)
        })
        .catch(() => {
          setError('Erro ao carregar leads')
          setLoading(false)
        })
    }, 500)
  }, [])

  const handleSalvar = () => {
    if (selectedLead) {
      if (!/^[^@]+@[^@]+\.[^@]+$/.test(selectedLead.email)) {
        alert('E-mail inválido')
        return
      }
      setLeads(prev =>
        prev.map(l => (l.id === selectedLead.id ? selectedLead : l))
      )
      setSelectedLead(null)
    }
  }

  const handleConverter = (lead: Lead) => {
    const oportunidade: Oportunidade = {
      id: Date.now(),
      nome: lead.nome,
      etapa: 'Inicial',
      accountName: lead.empresa,
    }
    setOportunidades(prev => [...prev, oportunidade])
  }

  const filteredLeads = leads
    .filter(l =>
      l.nome.toLowerCase().includes(search.toLowerCase()) ||
      l.empresa.toLowerCase().includes(search.toLowerCase())
    )
    .filter(l => (statusFilter ? l.status === statusFilter : true))

  if (loading) return <div className="p-4">Carregando...</div>
  if (error) return <div className="p-4 text-red-500">{error}</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mini Console do Vendedor</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Pesquisar por nome ou empresa"
          className="border p-2 rounded w-1/3"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="Novo">Novo</option>
          <option value="Em Contato">Em Contato</option>
          <option value="Qualificado">Qualificado</option>
        </select>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Empresa</th>
            <th className="p-2 border">E-mail</th>
            <th className="p-2 border">Fonte</th>
            <th className="p-2 border">Pontuação</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeads.map(lead => (
            <tr
              key={lead.id}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => setSelectedLead(lead)}
            >
              <td className="p-2 border">{lead.nome}</td>
              <td className="p-2 border">{lead.empresa}</td>
              <td className="p-2 border">{lead.email}</td>
              <td className="p-2 border">{lead.fonte}</td>
              <td className="p-2 border">{lead.pontuacao}</td>
              <td className="p-2 border">{lead.status}</td>
              <td className="p-2 border">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={e => {
                    e.stopPropagation()
                    handleConverter(lead)
                  }}
                >
                  Converter
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLead && (
        <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-4">
          <h2 className="text-xl font-bold mb-2">Detalhes do Lead</h2>
          <label className="block mb-2">
            E-mail:
            <input
              type="text"
              className="border p-1 w-full"
              value={selectedLead.email}
              onChange={e =>
                setSelectedLead({ ...selectedLead, email: e.target.value })
              }
            />
          </label>
          <label className="block mb-2">
            Status:
            <select
              className="border p-1 w-full"
              value={selectedLead.status}
              onChange={e =>
                setSelectedLead({ ...selectedLead, status: e.target.value })
              }
            >
              <option value="Novo">Novo</option>
              <option value="Em Contato">Em Contato</option>
              <option value="Qualificado">Qualificado</option>
            </select>
          </label>
          <div className="flex gap-2">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={handleSalvar}
            >
              Salvar
            </button>
            <button
              className="bg-gray-400 text-white px-3 py-1 rounded"
              onClick={() => setSelectedLead(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mt-8 mb-2">Oportunidades</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Conta</th>
            <th className="p-2 border">Etapa</th>
          </tr>
        </thead>
        <tbody>
          {oportunidades.map(op => (
            <tr key={op.id}>
              <td className="p-2 border">{op.nome}</td>
              <td className="p-2 border">{op.accountName}</td>
              <td className="p-2 border">{op.etapa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
