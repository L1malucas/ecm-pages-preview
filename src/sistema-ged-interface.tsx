import {  MouseEvent,SetStateAction,useState } from 'react';
import { 
  File, 
  FolderOpen, 
  Share2, 
  Edit, 
  Copy, 
  Trash, 
  Download, 
  Star, 
  Eye, 
  Lock, 
  History, 
  Info, 
  Tag, 
  Move, 
  Users, 
  Printer,
  X,
  Search
} from 'lucide-react';

const GerenciadorDocumentos = () => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0
  });
  interface FileType {
    id: number;
    nome: string;
    tipo: string;
    tamanho: string;
    dataCriacao: string;
    autor: string;
  }
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const [showMetadata, setShowMetadata] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [showCompartilhar, setShowCompartilhar] = useState(false);
  const [showPermissoes, setShowPermissoes] = useState(false);
  const [showAcessos, setShowAcessos] = useState(false);
  const [emailConvite, setEmailConvite] = useState('');
  const [nivelAcesso, setNivelAcesso] = useState('visualizar');
  const [linkCompartilhamento, setLinkCompartilhamento] = useState('');
  const [usuariosComAcesso, setUsuariosComAcesso] = useState([
    // const [configPermissoes, setConfigPermissoes] = useState(configuracoesPermissoes);
    { id: 1, nome: 'Ana Silva', email: 'ana.silva@empresa.com.br', acesso: 'Editor', adicionadoEm: '10/03/2025' },
    { id: 2, nome: 'João Costa', email: 'joao.costa@empresa.com.br', acesso: 'Visualizador', adicionadoEm: '15/03/2025' },
    { id: 3, nome: 'Carla Mendes', email: 'carla.m@parceiro.com.br', acesso: 'Comentarista', adicionadoEm: '20/03/2025' }
  ]);

  // const [usuariosAcesso, _setUsuariosAcesso] = useState([
  //   { id: 1, nome: 'Ana Silva', email: 'ana.silva@empresa.com.br', permissao: 'Editor' },
  //   { id: 2, nome: 'Carlos Mendes', email: 'carlos.mendes@empresa.com.br', permissao: 'Visualizador' }
  // ]);

  const arquivos = [
    { id: 1, nome: 'Relatório Financeiro 2025.pdf', tipo: 'PDF', tamanho: '2.5 MB', dataCriacao: '15/03/2025', autor: 'Carlos Silva' },
    { id: 2, nome: 'Contrato de Serviço.docx', tipo: 'DOCX', tamanho: '1.8 MB', dataCriacao: '20/03/2025', autor: 'Ana Ferreira' },
    { id: 3, nome: 'Apresentação Trimestral.pptx', tipo: 'PPTX', tamanho: '4.2 MB', dataCriacao: '25/03/2025', autor: 'João Oliveira' },
    { id: 4, nome: 'Planilha de Custos.xlsx', tipo: 'XLSX', tamanho: '3.1 MB', dataCriacao: '28/03/2025', autor: 'Mariana Santos' }
  ];

  // const permissoesPadroes = [
  //   { id: 'visualizar', label: 'Visualizador', descricao: 'Pode visualizar, mas não pode editar ou compartilhar' },
  //   { id: 'comentar', label: 'Comentarista', descricao: 'Pode visualizar e comentar, mas não pode editar' },
  //   { id: 'editar', label: 'Editor', descricao: 'Pode visualizar, comentar e editar o documento' },
  //   { id: 'admin', label: 'Administrador', descricao: 'Acesso total, incluindo permissões e exclusão' }]

  //   const configuracoesPermissoes = {
  //     visualizacao: true,
  //     download: true,
  //     impressao: true,
  //     copia: true,
  //     edicao: false,
  //     exclusao: false,
  //     compartilhamento: false,
  //     publicoExterno: false,
  //     expiracaoAcesso: '01/07/2025'
  //   };
  
    const gerarLinkCompartilhamento = () => {
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let resultado = 'https://docs.empresa.com.br/share/';
      for (let i = 0; i < 10; i++) {
        resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
      }
      setLinkCompartilhamento(resultado);
    };
  
    const handleAdicionarUsuario = () => {
      if (emailConvite.trim() === '') return;
      
      const novoUsuario = {
        id: usuariosComAcesso.length + 1,
        nome: emailConvite.split('@')[0].replace('.', ' '),
        email: emailConvite,
        acesso: nivelAcesso === 'visualizar' ? 'Visualizador' : 
                nivelAcesso === 'comentar' ? 'Comentarista' : 
                nivelAcesso === 'editar' ? 'Editor' : 'Administrador',
        adicionadoEm: new Date().toLocaleDateString('pt-BR')
      };
      
      setUsuariosComAcesso([...usuariosComAcesso, novoUsuario]);
      setEmailConvite('');
      showToast(`Convite enviado para ${emailConvite}`);
    };
  
    const handleRemoverUsuario = (id: number) => {
      setUsuariosComAcesso(usuariosComAcesso.filter(usuario => usuario.id !== id));
      showToast('Usuário removido com sucesso');
    };
  
    const handleCopiarLink = () => {
      navigator.clipboard.writeText(linkCompartilhamento)
        .then(() => {
          showToast('Link copiado para a área de transferência');
        })
        .catch(err => {
          showToast('Erro ao copiar link' +err);
        });
    };
  
    // const handleTogglePermissao = (chave: keyof typeof configuracoesPermissoes) => {
    //   setConfigPermissoes({
    //     ...configPermissoes,
    //     [chave]: !configPermissoes[chave]
    //   });
    // };

  const handleContextMenu = (e: MouseEvent<HTMLTableRowElement>, file: FileType) => {
      e.preventDefault();
      setSelectedFile(file);
      setContextMenu({
        visible: true,
        x: e.pageX,
        y: e.pageY
      });
    };

  const handleClick = () => {
    if (contextMenu.visible) {
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  const showToast = (message: SetStateAction<string>) => {
    setStatusMessage(message);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleMenuOption = (option: string) => {
    setContextMenu({ ...contextMenu, visible: false });
    
    if (!selectedFile) return;

    
    switch (option) {
      case 'abrir':
        showToast(`Abrindo ${selectedFile.nome}`);
        break;
      case 'renomear':
        showToast(`Renomeando ${selectedFile.nome}`);
        break;
      case 'compartilhar':
        gerarLinkCompartilhamento();
        setShowCompartilhar(true);
        break;
      case 'copiar':
        showToast(`Copiando ${selectedFile.nome}`);
        break;
      case 'excluir':
        showToast(`Excluindo ${selectedFile.nome}`);
        break;
      case 'download':
        showToast(`Baixando ${selectedFile.nome}`);
        break;
      case 'favoritar':
        showToast(`Adicionando ${selectedFile.nome} aos favoritos`);
        break;
      case 'visualizar':
        setShowPreview(true);
        break;
      case 'permissoes':
        setShowPermissoes(true);
        break;
      case 'historico':
        showToast(`Visualizando histórico de ${selectedFile.nome}`);
        break;
      case 'propriedades':
        setShowMetadata(true);
        break;
      case 'etiquetas':
        showToast(`Gerenciando etiquetas de ${selectedFile.nome}`);
        break;
      case 'mover':
        showToast(`Movendo ${selectedFile.nome}`);
        break;
      case 'acessos':
        setShowAcessos(true);
        break;
      case 'imprimir':
        showToast(`Imprimindo ${selectedFile.nome}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-gray-50 h-screen p-6" onClick={handleClick}>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Sistema de Gerenciamento Eletrônico de Documentos</h1>
          <div className="flex space-x-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
              <FolderOpen className="mr-2" size={18} />
              Nova Pasta
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
              <File className="mr-2" size={18} />
              Novo Arquivo
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <input 
            type="text" 
            placeholder="Pesquisar documentos..." 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamanho</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Criação</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {arquivos.map(arquivo => (
                <tr 
                  key={arquivo.id} 
                  className="hover:bg-gray-50 cursor-pointer" 
                  onContextMenu={(e) => handleContextMenu(e, arquivo)}
                  onDoubleClick={() => showToast(`Abrindo ${arquivo.nome}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <File className="mr-2 text-blue-500" size={20} />
                      {arquivo.nome}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{arquivo.tipo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{arquivo.tamanho}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{arquivo.dataCriacao}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{arquivo.autor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {contextMenu.visible && (
        <div 
          className="absolute bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
          style={{ 
            top: `${contextMenu.y}px`, 
            left: `${contextMenu.x}px`,
            width: '220px'
          }}
        >
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center" 
            onClick={() => handleMenuOption('abrir')}
          >
            <File className="mr-2 text-blue-500" size={16} />
            Abrir
          </button>
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center" 
            onClick={() => handleMenuOption('visualizar')}
          >
            <Eye className="mr-2 text-blue-500" size={16} />
            Visualizar
          </button>
          <div className="border-t border-gray-200 my-1"></div>
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center" 
            onClick={() => handleMenuOption('compartilhar')}
          >
            <Share2 className="mr-2 text-green-500" size={16} />
            Compartilhar
          </button>
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center" 
            onClick={() => handleMenuOption('acessos')}
          >
            <Users className="mr-2 text-green-500" size={16} />
            Gerenciar Acessos
          </button>
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center" 
            onClick={() => handleMenuOption('permissoes')}
          >
            <Lock className="mr-2 text-yellow-500" size={16} />
            Permissões
          </button>
          <div className="border-t border-gray-200 my-1"></div>
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center" 
            onClick={() => handleMenuOption('renomear')}
          >
            <Edit className="mr-2 text-gray-500" size={16} />
            Renomear
          </button>
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center" 
            onClick={() => handleMenuOption('copiar')}
          >
            <Copy className="mr-2 text-gray-500" size={16} />
            Copiar
          </button>
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center" 
            onClick={() => handleMenuOption('mover')}
          >
            <Move className="mr-2 text-gray-500" size={16} />
            Mover para
          </button>
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center" 
            onClick={() => handleMenuOption('excluir')}
          >
            <Trash className="mr-2 text-red-500" size={16} />
            Excluir
          </button>
          <div className="border-t border-gray-200 my-1"></div>
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center" 
            onClick={() => handleMenuOption('download')}
          >
            <Download className="mr-2 text-blue-500" size={16} />
            Baixar
          </button>
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center" 
            onClick={() => handleMenuOption('imprimir')}
          >
            <Printer className="mr-2 text-blue-500" size={16} />
            Imprimir
          </button>
          <div className="border-t border-gray-200 my-1"></div>
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center" 
            onClick={() => handleMenuOption('favoritar')}
          >
            <Star className="mr-2 text-yellow-500" size={16} />
            Adicionar aos Favoritos
          </button>
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center" 
            onClick={() => handleMenuOption('etiquetas')}
          >
            <Tag className="mr-2 text-purple-500" size={16} />
            Gerenciar Etiquetas
          </button>
          <div className="border-t border-gray-200 my-1"></div>
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center" 
            onClick={() => handleMenuOption('historico')}
          >
            <History className="mr-2 text-blue-500" size={16} />
            Histórico de Versões
          </button>
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center" 
            onClick={() => handleMenuOption('propriedades')}
          >
            <Info className="mr-2 text-blue-500" size={16} />
            Propriedades/Metadados
          </button>
        </div>
      )}
      
      {statusMessage && (
        <div className="fixed bottom-6 right-6 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg">
          {statusMessage}
        </div>
      )}
      
      {/* Modal de Compartilhamento */}
      {showCompartilhar && selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Compartilhar "{selectedFile.nome}"</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowCompartilhar(false)}
              >
                ×
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Adicionar pessoas</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Digite um e-mail" 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={emailConvite}
                  onChange={(e) => setEmailConvite(e.target.value)}
                />
                <select 
                  className="px-2 py-2 border-y border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={nivelAcesso}
                  onChange={(e) => setNivelAcesso(e.target.value)}
                >
                  <option value="visualizar">Visualizador</option>
                  <option value="comentar">Comentarista</option>
                  <option value="editar">Editor</option>
                  <option value="admin">Administrador</option>
                </select>
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md"
                  onClick={handleAdicionarUsuario}
                >
                  Convidar
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Link de compartilhamento</p>
              <div className="flex">
                <input 
                  type="text" 
                  readOnly
                  value={linkCompartilhamento}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md bg-gray-50"
                />
                <button 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-r-md"
                  onClick={handleCopiarLink}
                >
                  Copiar
                </button>
              </div>
              <div className="flex items-center mt-2">
                <select 
                  className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                >
                  <option value="visualizar">Qualquer pessoa com o link pode visualizar</option>
                  <option value="comentar">Qualquer pessoa com o link pode comentar</option>
                  <option value="editar">Qualquer pessoa com o link pode editar</option>
                  <option value="restrito">Somente pessoas específicas</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-2">
              <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                onClick={() => setShowCompartilhar(false)}
              >
                Cancelar
              </button>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  showToast(`Compartilhamento de "${selectedFile.nome}" atualizado`);
                  setShowCompartilhar(false);
                }}
              >
                Concluído
              </button>
            </div>
          </div>
        </div>
      )}
      {showMetadata && selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Propriedades do Arquivo</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowMetadata(false)}
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Nome do arquivo</p>
                <p className="font-medium">{selectedFile.nome}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tipo</p>
                <p className="font-medium">{selectedFile.tipo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tamanho</p>
                <p className="font-medium">{selectedFile.tamanho}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Data de criação</p>
                <p className="font-medium">{selectedFile.dataCriacao}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Autor</p>
                <p className="font-medium">{selectedFile.autor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Localização</p>
                <p className="font-medium">/Documentos/Empresariais/2025/</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Última modificação</p>
                <p className="font-medium">30/03/2025 15:42</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Etiquetas</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Importante</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Aprovado</span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Q1 2025</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                onClick={() => setShowMetadata(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

{showPermissoes && selectedFile && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Permissões para "{selectedFile.nome}"</h2>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setShowPermissoes(false)}
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="space-y-4 mb-6">
        <div>
          <h3 className="font-medium mb-2">Configurações gerais</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="radio" name="acesso" className="mr-2" defaultChecked />
              <span>Restrito - Apenas usuários específicos</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="acesso" className="mr-2" />
              <span>Qualquer pessoa com o link</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="acesso" className="mr-2" />
              <span>Público na organização</span>
            </label>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Permissões de arquivo</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-1">
              <span>Baixar</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>Imprimir</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>Copiar conteúdo</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <button 
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          onClick={() => setShowPermissoes(false)}
        >
          Cancelar
        </button>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          onClick={() => {
            showToast(`Permissões de ${selectedFile.nome} atualizadas`);
            setShowPermissoes(false);
          }}
        >
          Salvar
        </button>
      </div>
    </div>
  </div>
)}

{/* Modal de Gerenciamento de Acessos */}
{showAcessos && selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Gerenciar Acessos - {selectedFile.nome}</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowAcessos(false)}
              >
                ×
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Pessoas com acesso</h3>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Buscar usuários..." 
                    className="px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
              
              <div className="overflow-y-auto max-h-64 border border-gray-200 rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuário</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acesso</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Adicionado em</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                            {selectedFile.autor.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">{selectedFile.autor} (Você)</p>
                            <p className="text-xs text-gray-500">você@empresa.com.br</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full">
                          Proprietário
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{selectedFile.dataCriacao}</td>
                      <td className="px-4 py-3 text-center">
                        <button disabled className="text-gray-400 cursor-not-allowed">
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                    
                    {usuariosComAcesso.map((usuario) => (
                      <tr key={usuario.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold">
                              {usuario.nome.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium">{usuario.nome}</p>
                              <p className="text-xs text-gray-500">{usuario.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <select 
                            className="text-sm border border-gray-300 rounded-md px-2 py-1"
                            defaultValue={usuario.acesso === 'Visualizador' ? 'visualizar' : 
                                         usuario.acesso === 'Comentarista' ? 'comentar' : 
                                         usuario.acesso === 'Editor' ? 'editar' : 'admin'}
                            onChange={(e) => {
                              const updatedUsuarios = usuariosComAcesso.map(u => {
                                if (u.id === usuario.id) {
                                  return {
                                    ...u, 
                                    acesso: e.target.value === 'visualizar' ? 'Visualizador' : 
                                           e.target.value === 'comentar' ? 'Comentarista' : 
                                           e.target.value === 'editar' ? 'Editor' : 'Administrador'
                                  };
                                }
                                return u;
                              });
                              setUsuariosComAcesso(updatedUsuarios);
                              showToast(`Permissão de ${usuario.nome} alterada`);
                            }}
                          >
                            <option value="visualizar">Visualizador</option>
                            <option value="comentar">Comentarista</option>
                            <option value="editar">Editor</option>
                            <option value="admin">Administrador</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{usuario.adicionadoEm}</td>
                        <td className="px-4 py-3 text-center">
                          <button 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleRemoverUsuario(usuario.id)}
                          >
                            <Trash size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4">
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Adicionar um usuário por e-mail" 
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={emailConvite}
                    onChange={(e) => setEmailConvite(e.target.value)}
                  />
                  <select 
                    className="px-2 py-2 border-y border-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={nivelAcesso}
                    onChange={(e) => setNivelAcesso(e.target.value)}
                  >
                    <option value="visualizar">Visualizador</option>
                    <option value="comentar">Comentarista</option>
                    <option value="editar">Editor</option>
                    <option value="admin">Administrador</option>
                  </select>
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md"
                    onClick={handleAdicionarUsuario}
                  >
                    Convidar
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                onClick={() => setShowAcessos(false)}
              >
                Fechar
              </button>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  showToast('Alterações salvas com sucesso');
                  setShowAcessos(false);
                }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    
      
      {showPreview && selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full h-3/4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Visualização - {selectedFile.nome}</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowPreview(false)}
              >
                ×
              </button>
            </div>
            <div className="h-5/6 bg-gray-100 rounded-md flex items-center justify-center overflow-auto">
              {selectedFile.tipo === 'PDF' && (
                <div className="text-center p-6">
                  <File size={64} className="mx-auto text-red-500 mb-4" />
                  <p className="text-lg font-medium">Visualização do PDF: {selectedFile.nome}</p>
                  <p className="text-gray-500 mt-2">Este é um exemplo de conteúdo de pré-visualização de PDF</p>
                </div>
              )}
              {selectedFile.tipo === 'DOCX' && (
                <div className="text-center p-6">
                  <File size={64} className="mx-auto text-blue-500 mb-4" />
                  <p className="text-lg font-medium">Visualização do DOCX: {selectedFile.nome}</p>
                  <p className="text-gray-500 mt-2">Este é um exemplo de conteúdo de pré-visualização de DOCX</p>
                </div>
              )}
              {selectedFile.tipo === 'PPTX' && (
                <div className="text-center p-6">
                  <File size={64} className="mx-auto text-orange-500 mb-4" />
                  <p className="text-lg font-medium">Visualização do PPTX: {selectedFile.nome}</p>
                  <p className="text-gray-500 mt-2">Este é um exemplo de conteúdo de pré-visualização de PPTX</p>
                </div>
              )}
              {selectedFile.tipo === 'XLSX' && (
                <div className="text-center p-6">
                  <File size={64} className="mx-auto text-green-500 mb-4" />
                  <p className="text-lg font-medium">Visualização do XLSX: {selectedFile.nome}</p>
                  <p className="text-gray-500 mt-2">Este é um exemplo de conteúdo de pré-visualização de XLSX</p>
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => {
                  setShowPreview(false);
                  showToast(`Abrindo ${selectedFile.nome} para edição`);
                }}
              >
                Abrir para Edição
              </button>
              <button 
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                onClick={() => setShowPreview(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GerenciadorDocumentos;
