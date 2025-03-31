/* eslint-disable @typescript-eslint/no-explicit-any */
import  { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, SetStateAction, useState } from 'react';
import {
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  FileText,
  ChevronRight,
  ChevronDown,
  Filter,
  MoreHorizontal,
  Send
} from 'lucide-react';

const FluxoAprovacaoDocumentos = () => {
  const [expandedFlow, setExpandedFlow] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('pendentes');
  const [showModal, setShowModal] = useState(false);
  interface DocumentType {
    id: number;
    titulo: string;
    documento: string;
    iniciador: string;
    dataInicio: string;
    prazo?: string;
    dataFim?: string;
    prioridade: string;
    etapaAtual?: string;
    status?: string;
    aprovadoresPendentes: string[];
    aprovadoresFinalizados: string[];
    comentarios: Array<{ autor: string; data: string; texto: string }>;
    etapas: Array<{ nome: string; responsavel: string; status: string; data: string }>;
  }

  const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  const fluxosPendentes = [
    {
      id: 1,
      titulo: 'Contrato de Serviço - Novo Cliente',
      documento: 'Contrato_ServicoXYZ_v2.docx',
      iniciador: 'Carlos Silva',
      dataInicio: '28/03/2025',
      prazo: '05/04/2025',
      prioridade: 'Alta',
      etapaAtual: 'Aprovação Jurídica',
      aprovadoresPendentes: ['Dra. Ana Oliveira (Jurídico)'],
      aprovadoresFinalizados: ['João Pereira (Comercial)', 'Marcos Santos (Gerente de Contas)'],
      comentarios: [
        { autor: 'João Pereira', data: '29/03/2025', texto: 'Aprovado com pequenas ressalvas nos termos de pagamento.' },
        { autor: 'Marcos Santos', data: '30/03/2025', texto: 'De acordo com as condições comerciais discutidas.' }
      ],
      etapas: [
        { nome: 'Criação', responsavel: 'Carlos Silva', status: 'concluído', data: '28/03/2025' },
        { nome: 'Aprovação Comercial', responsavel: 'João Pereira', status: 'concluído', data: '29/03/2025' },
        { nome: 'Aprovação Gerencial', responsavel: 'Marcos Santos', status: 'concluído', data: '30/03/2025' },
        { nome: 'Aprovação Jurídica', responsavel: 'Dra. Ana Oliveira', status: 'pendente', data: '' },
        { nome: 'Assinatura Cliente', responsavel: 'Diretor Cliente', status: 'aguardando', data: '' },
        { nome: 'Arquivamento', responsavel: 'Sistema', status: 'aguardando', data: '' }
      ]
    },
    {
      id: 2,
      titulo: 'Relatório Financeiro Q1 2025',
      documento: 'Relatorio_Financeiro_Q1_2025.xlsx',
      iniciador: 'Mariana Santos',
      dataInicio: '25/03/2025',
      prazo: '03/04/2025',
      prioridade: 'Média',
      etapaAtual: 'Aprovação Diretoria',
      aprovadoresPendentes: ['Roberto Gomes (Diretor Financeiro)'],
      aprovadoresFinalizados: ['Juliana Costa (Contabilidade)', 'Pedro Almeida (Controller)'],
      comentarios: [
        { autor: 'Juliana Costa', data: '27/03/2025', texto: 'Dados contábeis conferidos e validados.' },
        { autor: 'Pedro Almeida', data: '29/03/2025', texto: 'Análise de variações concluída e comentada no documento.' }
      ],
      etapas: [
        { nome: 'Preparação', responsavel: 'Mariana Santos', status: 'concluído', data: '25/03/2025' },
        { nome: 'Revisão Contábil', responsavel: 'Juliana Costa', status: 'concluído', data: '27/03/2025' },
        { nome: 'Análise Financeira', responsavel: 'Pedro Almeida', status: 'concluído', data: '29/03/2025' },
        { nome: 'Aprovação Diretoria', responsavel: 'Roberto Gomes', status: 'pendente', data: '' },
        { nome: 'Publicação', responsavel: 'Sistema', status: 'aguardando', data: '' }
      ]
    },
    {
      id: 3,
      titulo: 'Política de Segurança da Informação',
      documento: 'Politica_Seguranca_v3.pdf',
      iniciador: 'Rafael Mendes',
      dataInicio: '20/03/2025',
      prazo: '10/04/2025',
      prioridade: 'Alta',
      etapaAtual: 'Aprovação TI',
      aprovadoresPendentes: ['Luciana Ferreira (Gerente TI)'],
      aprovadoresFinalizados: ['Antônio Oliveira (Segurança da Informação)'],
      comentarios: [
        { autor: 'Antônio Oliveira', data: '25/03/2025', texto: 'Verificados todos os requisitos de compliance e normas ISO 27001.' }
      ],
      etapas: [
        { nome: 'Elaboração', responsavel: 'Rafael Mendes', status: 'concluído', data: '20/03/2025' },
        { nome: 'Revisão Segurança', responsavel: 'Antônio Oliveira', status: 'concluído', data: '25/03/2025' },
        { nome: 'Aprovação TI', responsavel: 'Luciana Ferreira', status: 'pendente', data: '' },
        { nome: 'Aprovação Diretoria', responsavel: 'Carlos Dias', status: 'aguardando', data: '' },
        { nome: 'Treinamento', responsavel: 'Equipe RH', status: 'aguardando', data: '' },
        { nome: 'Implementação', responsavel: 'Todos Departamentos', status: 'aguardando', data: '' }
      ]
    }
  ];

  const fluxosConcluidos = [
    {
      id: 4,
      titulo: 'Plano de Marketing 2025',
      documento: 'Plano_Marketing_2025_FINAL.pptx',
      iniciador: 'Teresa Lima',
      dataInicio: '15/02/2025',
      dataFim: '15/03/2025',
      prioridade: 'Média',
      status: 'Aprovado',
      aprovadoresPendentes: [],
      aprovadoresFinalizados: ['Camila Rocha (Marketing)', 'João Silva (Vendas)', 'Roberto Gomes (Diretor)'],
      comentarios: [
        { autor: 'Camila Rocha', data: '25/02/2025', texto: 'Estratégias de mídia social estão bem alinhadas com objetivos do ano.' },
        { autor: 'João Silva', data: '02/03/2025', texto: 'Integração com a equipe de vendas está bem definida.' },
        { autor: 'Roberto Gomes', data: '15/03/2025', texto: 'Plano aprovado com orçamento conforme proposto.' }
      ],
      etapas: [
        { nome: 'Criação', responsavel: 'Teresa Lima', status: 'concluído', data: '15/02/2025' },
        { nome: 'Aprovação Marketing', responsavel: 'Camila Rocha', status: 'concluído', data: '25/02/2025' },
        { nome: 'Aprovação Vendas', responsavel: 'João Silva', status: 'concluído', data: '02/03/2025' },
        { nome: 'Aprovação Diretoria', responsavel: 'Roberto Gomes', status: 'concluído', data: '15/03/2025' },
        { nome: 'Implementação', responsavel: 'Equipe Marketing', status: 'concluído', data: '15/03/2025' }
      ]
    }
  ];

  const toggleFlowExpansion = (id:any) => {
    if (expandedFlow === id) {
      setExpandedFlow(null);
    } else {
      setExpandedFlow(id);
    }
  };

  const showToast = (message: SetStateAction<string>) => {
    setStatusMessage(message);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleApprove = () => {
    if (selectedDocument) {
      showToast(`Documento "${selectedDocument.titulo}" aprovado com sucesso!`);
      setShowModal(false);
    }
  };

  const handleReject = () => {
    if (selectedDocument) {
      showToast(`Documento "${selectedDocument.titulo}" rejeitado e retornado ao remetente.`);
      setShowModal(false);
    }
  };

  const openDocumentModal = (document: DocumentType) => {
    setSelectedDocument(document);
    setShowModal(true);
  };

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'concluído':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'pendente':
        return <Clock size={18} className="text-yellow-500" />;
      case 'aguardando':
        return <Clock size={18} className="text-gray-400" />;
      case 'rejeitado':
        return <XCircle size={18} className="text-red-500" />;
      default:
        return <Clock size={18} className="text-gray-400" />;
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'alta':
        return 'bg-red-100 text-red-800';
      case 'média':
        return 'bg-yellow-100 text-yellow-800';
      case 'baixa':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Fluxos de Trabalho e Aprovação de Documentos</h1>
          <div className="flex space-x-2">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
              <FileText className="mr-2" size={18} />
              Novo Fluxo de Aprovação
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
              <Filter className="mr-2" size={18} />
              Filtrar
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'pendentes' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('pendentes')}
              >
                Pendentes de Aprovação ({fluxosPendentes.length})
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'concluidos' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('concluidos')}
              >
                Concluídos ({fluxosConcluidos.length})
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'iniciados' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('iniciados')}
              >
                Iniciados por Mim (2)
              </button>
            </nav>
          </div>
        </div>

        <div className="space-y-4">
          {activeTab === 'pendentes' && fluxosPendentes.map(fluxo => (
            <div key={fluxo.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div 
                className="flex justify-between items-center p-4 bg-white hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleFlowExpansion(fluxo.id)}
              >
                <div className="flex items-center">
                  {expandedFlow === fluxo.id ? 
                    <ChevronDown size={20} className="text-gray-500 mr-2" /> : 
                    <ChevronRight size={20} className="text-gray-500 mr-2" />
                  }
                  <div>
                    <h3 className="font-medium text-lg">{fluxo.titulo}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                      <span className="flex items-center">
                        <FileText size={14} className="mr-1" />
                        {fluxo.documento}
                      </span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        Prazo: {fluxo.prazo}
                      </span>
                      <span className="flex items-center">
                        <UserCheck size={14} className="mr-1" />
                        {fluxo.etapaAtual}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityClass(fluxo.prioridade)}`}>
                    {fluxo.prioridade}
                  </span>
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDocumentModal(fluxo);
                    }}
                  >
                    Revisar
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
              </div>

              {expandedFlow === fluxo.id && (
                <div className="bg-gray-50 p-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <h4 className="font-medium text-gray-700 mb-3">Fluxo de Aprovação</h4>
                      <div className="space-y-3">
                        {fluxo.etapas.map((etapa, index) => (
                          <div key={index} className="flex items-start">
                            <div className="mr-3 mt-1">
                              {renderStatusIcon(etapa.status)}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <span className="font-medium">{etapa.nome}</span>
                                <span className="text-sm text-gray-500">{etapa.data || '-'}</span>
                              </div>
                              <p className="text-sm text-gray-600">Responsável: {etapa.responsavel}</p>
                            </div>
                            {index < fluxo.etapas.length - 1 && (
                              <div className="mx-auto h-6 flex items-center justify-center">
                                <div className="border-l-2 border-gray-300 h-6 mx-9 mt-2"></div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-3">Comentários</h4>
                      <div className="bg-white rounded-lg border border-gray-200 p-3 h-64 overflow-y-auto">
                        <div className="space-y-3">
                          {fluxo.comentarios.map((comentario, index) => (
                            <div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                              <div className="flex justify-between">
                                <span className="font-medium">{comentario.autor}</span>
                                <span className="text-xs text-gray-500">{comentario.data}</span>
                              </div>
                              <p className="text-sm mt-1">{comentario.texto}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex">
                          <input 
                            type="text" 
                            placeholder="Adicionar comentário..." 
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button className="bg-blue-500 text-white px-3 py-2 rounded-r-md">
                            <Send size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {activeTab === 'concluidos' && fluxosConcluidos.map(fluxo => (
            <div key={fluxo.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div 
                className="flex justify-between items-center p-4 bg-white hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleFlowExpansion(fluxo.id)}
              >
                <div className="flex items-center">
                  {expandedFlow === fluxo.id ? 
                    <ChevronDown size={20} className="text-gray-500 mr-2" /> : 
                    <ChevronRight size={20} className="text-gray-500 mr-2" />
                  }
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-lg">{fluxo.titulo}</h3>
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {fluxo.status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
                      <span className="flex items-center">
                        <FileText size={14} className="mr-1" />
                        {fluxo.documento}
                      </span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        Concluído em: {fluxo.dataFim}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDocumentModal(fluxo);
                    }}
                  >
                    Visualizar
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
              </div>

              {expandedFlow === fluxo.id && (
                <div className="bg-gray-50 p-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <h4 className="font-medium text-gray-700 mb-3">Histórico de Aprovação</h4>
                      <div className="space-y-3">
                        {fluxo.etapas.map((etapa, index) => (
                          <div key={index} className="flex items-start">
                            <div className="mr-3 mt-1">
                              {renderStatusIcon(etapa.status)}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <span className="font-medium">{etapa.nome}</span>
                                <span className="text-sm text-gray-500">{etapa.data || '-'}</span>
                              </div>
                              <p className="text-sm text-gray-600">Responsável: {etapa.responsavel}</p>
                            </div>
                            {index < fluxo.etapas.length - 1 && (
                              <div className="mx-auto h-6 flex items-center justify-center">
                                <div className="border-l-2 border-gray-300 h-6 mx-9 mt-2"></div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-3">Comentários</h4>
                      <div className="bg-white rounded-lg border border-gray-200 p-3 h-64 overflow-y-auto">
                        <div className="space-y-3">
                          {fluxo.comentarios.map((comentario, index) => (
                            <div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                              <div className="flex justify-between">
                                <span className="font-medium">{comentario.autor}</span>
                                <span className="text-xs text-gray-500">{comentario.data}</span>
                              </div>
                              <p className="text-sm mt-1">{comentario.texto}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {activeTab === 'iniciados' && (
            <div className="text-center py-10">
              <p className="text-gray-500">Esta aba mostraria os fluxos que você iniciou.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-5xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Revisão do Documento</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500">Documento</p>
                <p className="font-medium">{selectedDocument.documento}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Iniciado por</p>
                <p className="font-medium">{selectedDocument.iniciador}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Etapa atual</p>
                <p className="font-medium">{selectedDocument.etapaAtual || 'Concluído'}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Pré-visualização do documento</h3>
              <div className="border border-gray-200 rounded-lg h-64 bg-gray-50 flex items-center justify-center">
                <div className="text-center p-6">
                  <FileText size={48} className="mx-auto text-blue-500 mb-4" />
                  <p className="text-lg font-medium">Visualização de {selectedDocument.documento}</p>
                  <p className="text-gray-500 mt-2">Aqui seria exibida uma pré-visualização do documento.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium mb-2">Aprovadores anteriores</h3>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  {selectedDocument.aprovadoresFinalizados.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedDocument.aprovadoresFinalizados.map((aprovador: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-2" />
                          <span>{aprovador}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">Nenhum aprovador anterior.</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Próximos aprovadores</h3>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  {selectedDocument.aprovadoresPendentes.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedDocument.aprovadoresPendentes.map((aprovador: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                        <li key={index} className="flex items-center">
                          <Clock size={16} className="text-yellow-500 mr-2" />
                          <span>{aprovador}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">Fluxo de aprovação concluído.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Adicionar comentário (opcional)</h3>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 h-24"
                placeholder="Digite seu comentário ou observações sobre o documento..."
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3">
              <button 
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center"
                onClick={handleReject}
              >
                <XCircle size={18} className="mr-2" />
                Rejeitar
              </button>
              <button 
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
                onClick={handleApprove}
              >
                <CheckCircle size={18} className="mr-2" />
                Aprovar
              </button>
            </div>
          </div>
        </div>
      )}

      {statusMessage && (
        <div className="fixed bottom-6 right-6 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default FluxoAprovacaoDocumentos;
