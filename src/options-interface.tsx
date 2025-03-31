import React, { useState } from 'react';
import { Save, User, Shield, Database, Monitor, Bell, Cloud, Globe, FileText,  Clock, HardDrive, Users, Menu,  ChevronRight, Moon, Sun, PieChart } from 'lucide-react';

const OptionsInterface = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = useState(5);
  const [language, setLanguage] = useState('english');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  
  // System roles for permission settings
  const roles = [
    { id: 'admin', name: 'Administrador', description: 'Acesso total ao sistema' },
    { id: 'manager', name: 'Gerente', description: 'Pode gerenciar conteúdo e usuários' },
    { id: 'editor', name: 'Editor', description: 'Pode editar documentos e adicionar comentários' },
    { id: 'viewer', name: 'Visualizador', description: 'Acesso somente leitura aos documentos' }
  ];

  // Locais de armazenamento
  const storageLocations = [
    { id: 'local', name: 'Armazenamento Local', available: '120.5 GB / 500 GB', isActive: true },
    { id: 'cloud', name: 'Armazenamento na Nuvem', available: '1.2 TB / 2 TB', isActive: true },
    { id: 'backup', name: 'Servidor de Backup', available: '450 GB / 1 TB', isActive: false }
  ];

  // Categorias para navegação
  const categories = [
    { id: 'general', name: 'Configurações Gerais', icon: <Monitor className="h-5 w-5" /> },
    { id: 'account', name: 'Conta e Perfil', icon: <User className="h-5 w-5" /> },
    { id: 'security', name: 'Segurança e Acesso', icon: <Shield className="h-5 w-5" /> },
    { id: 'storage', name: 'Gerenciamento de Armazenamento', icon: <Database className="h-5 w-5" /> },
    { id: 'notifications', name: 'Notificações', icon: <Bell className="h-5 w-5" /> },
    { id: 'integration', name: 'Integrações', icon: <Globe className="h-5 w-5" /> },
    { id: 'backup', name: 'Backup e Recuperação', icon: <Cloud className="h-5 w-5" /> },
    { id: 'logs', name: 'Logs do Sistema', icon: <FileText className="h-5 w-5" /> },
  ];
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };
  
  // Render content based on active category
  const renderContent = () => {
    switch(activeCategory) {
      case 'general':
        return (
            <div>
            <h2 className="text-2xl font-semibold mb-6">Configurações Gerais</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Opções de Exibição</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <span className="mr-3">Tema</span>
                  <div 
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
                  onClick={() => setDarkMode(!darkMode)}
                  >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                  <span className="absolute left-1 text-xs text-white opacity-0">
                    {darkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
                  </span>
                  <span className="absolute right-1 text-xs text-white opacity-0">
                    {darkMode ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
                  </span>
                  </div>
                  <span className="ml-3">{darkMode ? 'Escuro' : 'Claro'}</span>
                </label>
                </div>
                
                <div className="flex flex-col">
                <label className="font-medium mb-1">Idioma</label>
                <select 
                  className="border rounded-md py-2 px-3"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="english">Inglês</option>
                  <option value="spanish">Espanhol</option>
                  <option value="portuguese">Português</option>
                  <option value="french">Francês</option>
                  <option value="german">Alemão</option>
                </select>
                </div>
              </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Salvamento Automático</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                <span>Ativar Salvamento Automático</span>
                <div 
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${autoSave ? 'bg-blue-600' : 'bg-gray-200'}`}
                  onClick={() => setAutoSave(!autoSave)}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${autoSave ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
                </div>
                
                <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Intervalo de Salvamento (minutos)</label>
                  <input 
                  type="number" 
                  className="border rounded w-16 py-1 px-2 text-center"
                  value={autoSaveInterval}
                  onChange={(e) => setAutoSaveInterval(parseInt(e.target.value) || 1)}
                  min="1"
                  max="60"
                  disabled={!autoSave}
                  />
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={autoSaveInterval}
                  onChange={(e) => setAutoSaveInterval(parseInt(e.target.value))}
                  className="w-full mt-2"
                  disabled={!autoSave}
                />
                </div>
              </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Desempenho do Sistema</h3>
              
              <div className="space-y-4">
                <div className="flex flex-col">
                <label className="font-medium mb-1">Tamanho máximo de upload de arquivo</label>
                <select className="border rounded-md py-2 px-3">
                  <option value="10">10 MB</option>
                  <option value="50">50 MB</option>
                  <option value="100">100 MB</option>
                  <option value="250">250 MB</option>
                  <option value="500">500 MB</option>
                  <option value="1000">1 GB</option>
                </select>
                </div>
                
                <div className="flex flex-col">
                <label className="font-medium mb-1">Número de documentos recentes a exibir</label>
                <input 
                  type="number" 
                  className="border rounded py-2 px-3"
                  defaultValue="10"
                  min="5"
                  max="50"
                />
                </div>
              </div>
              </div>
            </div>
            </div>
        );
      
      case 'security':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Segurança e Acesso</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Funções e Permissões de Usuário</h3>
          
          <div className="space-y-4">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Função</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Descrição</th>
            <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {roles.map((role) => (
            <tr key={role.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <span className="font-medium">{role.name}</span>
              </td>
              <td className="px-4 py-3 text-gray-500">
                {role.description}
              </td>
              <td className="px-4 py-3 text-right">
                <button className="text-blue-600 hover:text-blue-800 text-sm">Editar</button>
              </td>
            </tr>
                ))}
              </tbody>
            </table>
            
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              + Criar Função Personalizada
            </button>
          </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Configurações de Sessão</h3>
          
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="font-medium mb-1">Logout automático após inatividade (minutos)</label>
              <input 
                type="number" 
                className="border rounded py-2 px-3"
                defaultValue="30"
                min="5"
                max="120"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="enforce2fa" className="h-4 w-4 text-blue-600" />
              <label htmlFor="enforce2fa">Exigir autenticação de dois fatores para todos os usuários</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="ipRestrict" className="h-4 w-4 text-blue-600" />
              <label htmlFor="ipRestrict">Restringir acesso a endereços IP específicos</label>
            </div>
          </div>
              </div>
            </div>
          </div>
        );
      
      case 'storage':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Gerenciamento de Armazenamento</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Locais de Armazenamento</h3>
          
          <div className="space-y-4">
            {storageLocations.map((location) => (
              <div key={location.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
            <div className="flex items-center">
              <HardDrive className="h-6 w-6 text-gray-400" />
              <div className="ml-3">
                <div className="font-medium">{location.name}</div>
                <div className="text-sm text-gray-500">{location.available}</div>
              </div>
            </div>
            
            <div 
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${location.isActive ? 'bg-blue-600' : 'bg-gray-200'}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${location.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
                </div>
                
                <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Espaço Utilizado</span>
              <span>{location.id === 'local' ? '76%' : location.id === 'cloud' ? '60%' : '45%'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div className={`h-2.5 rounded-full ${location.id === 'local' ? 'w-3/4 bg-yellow-400' : location.id === 'cloud' ? 'w-3/5 bg-blue-500' : 'w-2/5 bg-green-500'}`}></div>
            </div>
                </div>
                
                {location.isActive && (
            <div className="flex justify-end space-x-2 mt-2">
              <button className="text-sm text-blue-600 hover:text-blue-800">Configurar</button>
              <button className="text-sm text-gray-600 hover:text-gray-800">Ver Arquivos</button>
            </div>
                )}
              </div>
            ))}
            
            <button className="w-full py-2 border border-dashed rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center">
              <span className="mr-1">+</span> Adicionar Local de Armazenamento
            </button>
          </div>
              </div>
              
              <div>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-medium mb-4">Uso do Armazenamento</h3>
            
            <div className="aspect-square flex items-center justify-center">
              <div className="relative h-48 w-48">
                {/* Isso seria um gráfico em uma implementação real */}
                <PieChart className="h-48 w-48 text-gray-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold">64%</div>
            <div className="text-sm text-gray-500">Usado</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center">
            <div className="h-3 w-3 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm">Documentos</span>
                </div>
                <div className="text-lg font-medium">432 GB</div>
              </div>
              <div>
                <div className="flex items-center">
            <div className="h-3 w-3 bg-green-500 rounded mr-2"></div>
            <span className="text-sm">Mídia</span>
                </div>
                <div className="text-lg font-medium">245 GB</div>
              </div>
              <div>
                <div className="flex items-center">
            <div className="h-3 w-3 bg-yellow-500 rounded mr-2"></div>
            <span className="text-sm">Arquivos</span>
                </div>
                <div className="text-lg font-medium">110 GB</div>
              </div>
              <div>
                <div className="flex items-center">
            <div className="h-3 w-3 bg-purple-500 rounded mr-2"></div>
            <span className="text-sm">Outros</span>
                </div>
                <div className="text-lg font-medium">86 GB</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">Opções de Limpeza</h3>
            
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 border rounded-lg hover:bg-gray-50 flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                <span>Limpar arquivos temporários</span>
                <span className="ml-auto text-sm text-gray-500">Recuperar ~2.3 GB</span>
              </button>
              
              <button className="w-full text-left px-4 py-3 border rounded-lg hover:bg-gray-50 flex items-center">
                <FileText className="h-5 w-5 text-blue-500 mr-2" />
                <span>Arquivar documentos antigos</span>
                <span className="ml-auto text-sm text-gray-500">Liberar até 45 GB</span>
              </button>
              
              <button className="w-full text-left px-4 py-3 border rounded-lg hover:bg-gray-50 flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                <span>Gerenciar arquivos compartilhados</span>
                <span className="ml-auto text-sm text-gray-500">Revisar 125 arquivos</span>
              </button>
            </div>
          </div>
              </div>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Notificações</h2>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Configurações de Notificações</h3>
          
          <div 
            className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${notificationsEnabled ? 'bg-blue-600' : 'bg-gray-200'}`}
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          >
            <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${notificationsEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </div>
              </div>
              
              <div className="space-y-4">
          <div className="border-b pb-4">
            <div className="font-medium mb-3">Atividade de Documentos</div>
            
            <div className="space-y-3 ml-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked={true} disabled={!notificationsEnabled} />
            <span className={!notificationsEnabled ? 'text-gray-400' : ''}>Alguém compartilha um documento comigo</span>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked={true} disabled={!notificationsEnabled} />
            <span className={!notificationsEnabled ? 'text-gray-400' : ''}>Alguém comenta em meu documento</span>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked={false} disabled={!notificationsEnabled} />
            <span className={!notificationsEnabled ? 'text-gray-400' : ''}>Alguém visualiza meu documento</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="border-b pb-4">
            <div className="font-medium mb-3">Notificações do Sistema</div>
            
            <div className="space-y-3 ml-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked={true} disabled={!notificationsEnabled} />
            <span className={!notificationsEnabled ? 'text-gray-400' : ''}>Avisos de limite de armazenamento</span>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked={true} disabled={!notificationsEnabled} />
            <span className={!notificationsEnabled ? 'text-gray-400' : ''}>Alertas de segurança</span>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked={true} disabled={!notificationsEnabled} />
            <span className={!notificationsEnabled ? 'text-gray-400' : ''}>Atualizações do sistema</span>
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <div className="font-medium mb-3">Métodos de Entrega</div>
            
            <div className="space-y-3 ml-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked={true} disabled={!notificationsEnabled} />
            <span className={!notificationsEnabled ? 'text-gray-400' : ''}>Notificações no aplicativo</span>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked={true} disabled={!notificationsEnabled} />
            <span className={!notificationsEnabled ? 'text-gray-400' : ''}>Notificações por email</span>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked={false} disabled={!notificationsEnabled} />
            <span className={!notificationsEnabled ? 'text-gray-400' : ''}>Notificações na área de trabalho</span>
                </label>
              </div>
            </div>
          </div>
              </div>
            </div>
          </div>
        );
        case 'backup':
          return (
            <div>
          <h2 className="text-2xl font-semibold mb-6">Backup e Recuperação</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Configurações de Backup Automático</h3>
              
              <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Ativar backup automático</span>
              <div className="relative inline-flex h-6 w-12 items-center rounded-full bg-blue-600">
                <span className="inline-block h-5 w-5 transform rounded-full bg-white transition-transform translate-x-6" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Frequência de Backup</label>
              <select className="w-full border rounded-md p-2">
                <option value="daily">Diário</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Horário do Backup</label>
              <input type="time" className="w-full border rounded-md p-2" defaultValue="02:00" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Retenção de Backup</label>
              <select className="w-full border rounded-md p-2">
                <option value="7">7 dias</option>
                <option value="30">30 dias</option>
                <option value="90">90 dias</option>
                <option value="365">365 dias</option>
              </select>
            </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Local de Armazenamento do Backup</h3>
              
              <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Destino Principal</label>
              <select className="w-full border rounded-md p-2">
                <option value="local">Servidor Local</option>
                <option value="cloud">Nuvem</option>
                <option value="nas">NAS</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="redundant" className="h-4 w-4 text-blue-600" />
              <label htmlFor="redundant">Manter backup redundante em local secundário</label>
            </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Recuperação de Dados</h3>
              
              <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 border rounded-lg hover:bg-gray-50">
              Restaurar backup anterior
            </button>
            
            <button className="w-full text-left px-4 py-3 border rounded-lg hover:bg-gray-50">
              Verificar integridade dos backups
            </button>

            <button className="w-full text-left px-4 py-3 border rounded-lg hover:bg-gray-50">
              Histórico de restaurações
            </button>
              </div>
            </div>
          </div>
            </div>
          );

          case 'logs':
            return (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Logs do Sistema</h2>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium mb-4">Configurações de Log</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Nível de Log</label>
                        <select className="w-full border rounded-md p-2">
                          <option value="error">Apenas Erros</option>
                          <option value="warning">Avisos e Erros</option>
                          <option value="info">Informações, Avisos e Erros</option>
                          <option value="debug">Todos os Logs (Debug)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Período de Retenção</label>
                        <select className="w-full border rounded-md p-2">
                          <option value="7">7 dias</option>
                          <option value="15">15 dias</option>
                          <option value="30">30 dias</option>
                          <option value="90">90 dias</option>
                        </select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="enableAudit" className="h-4 w-4 text-blue-600" />
                        <label htmlFor="enableAudit">Habilitar log de auditoria</label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium mb-4">Exportação de Logs</h3>
                    
                    <div className="space-y-4">
                      <div className="flex flex-col">
                        <label className="block text-sm font-medium mb-1">Formato de Exportação</label>
                        <select className="border rounded-md p-2">
                          <option value="csv">CSV</option>
                          <option value="json">JSON</option>
                          <option value="txt">TXT</option>
                        </select>
                      </div>

                      <button className="w-full text-left px-4 py-3 border rounded-lg hover:bg-gray-50">
                        Exportar Logs do Sistema
                      </button>

                      <button className="w-full text-left px-4 py-3 border rounded-lg hover:bg-gray-50">
                        Exportar Logs de Auditoria
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium mb-4">Monitoramento em Tempo Real</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="realtime" className="h-4 w-4 text-blue-600" />
                        <label htmlFor="realtime">Ativar monitoramento em tempo real</label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="alerts" className="h-4 w-4 text-blue-600" />
                        <label htmlFor="alerts">Enviar alertas de eventos críticos</label>
                      </div>

                      <button className="w-full text-left px-4 py-3 border rounded-lg hover:bg-gray-50">
                        Visualizar Console de Logs
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
      default:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Integrações</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">APIs e Serviços Conectados</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <Globe className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
            <h4 className="font-medium">API REST</h4>
            <p className="text-sm text-gray-500">Gerenciar chaves de API e endpoints</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm text-blue-600 border rounded-md hover:bg-blue-50">
                Configurar
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <Cloud className="h-8 w-8 text-green-500" />
                <div className="ml-4">
            <h4 className="font-medium">Webhooks</h4>
            <p className="text-sm text-gray-500">Configurar notificações em tempo real</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm text-blue-600 border rounded-md hover:bg-blue-50">
                Gerenciar
              </button>
            </div>
          </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Integrações de Terceiros</h3>
          
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <div className="ml-4">
            <h4 className="font-medium">Google Workspace</h4>
            <p className="text-sm text-gray-500">Sincronização com Google Drive e Calendário</p>
                </div>
              </div>
              <div className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-200">
                <span className="inline-block h-5 w-5 transform rounded-full bg-white transition-transform translate-x-1" />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <div className="ml-4">
            <h4 className="font-medium">Microsoft 365</h4>
            <p className="text-sm text-gray-500">Integração com Office e SharePoint</p>
                </div>
              </div>
              <div className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-200">
                <span className="inline-block h-5 w-5 transform rounded-full bg-white transition-transform translate-x-1" />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <div className="ml-4">
            <h4 className="font-medium">Slack</h4>
            <p className="text-sm text-gray-500">Notificações e comandos via Slack</p>
                </div>
              </div>
              <div className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-200">
                <span className="inline-block h-5 w-5 transform rounded-full bg-white transition-transform translate-x-1" />
              </div>
            </div>
          </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6"></div>
          <h3 className="text-lg font-medium mb-4">Configurações Avançadas</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Limite de Requisições (por minuto)</label>
              <input type="number" className="w-full border rounded-md p-2" defaultValue="100" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Timeout de Conexão (segundos)</label>
              <input type="number" className="w-full border rounded-md p-2" defaultValue="30" />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="retry" className="h-4 w-4 text-blue-600" />
              <label htmlFor="retry">Habilitar tentativas automáticas em caso de falha</label>
            </div>
          </div>
              </div>
            </div>
        );
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Barra lateral */}
      <div className={`bg-white shadow-sm transition-all ${sidebarExpanded ? 'w-64' : 'w-20'}`}>
      <div className="p-4 border-b flex items-center justify-between">
        <h1 className={`font-semibold ${sidebarExpanded ? 'block' : 'hidden'}`}>Configurações do Sistema</h1>
        <button 
        onClick={toggleSidebar}
        className="p-2 rounded-full hover:bg-gray-100"
        >
        {sidebarExpanded ? <Menu className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      
      <nav className="p-2">
        <ul className="space-y-1">
        {categories.map((category) => (
          <li key={category.id}>
          <button
            onClick={() => setActiveCategory(category.id)}
            className={`w-full flex items-center py-2 px-3 rounded-md ${
            activeCategory === category.id 
              ? 'bg-blue-50 text-blue-600' 
              : 'hover:bg-gray-100'
            }`}
          >
            <span className="flex-shrink-0">{category.icon}</span>
            {sidebarExpanded && (
            <span className="ml-3">{category.name}</span>
            )}
            {sidebarExpanded && activeCategory === category.id && (
            <ChevronRight className="ml-auto h-4 w-4" />
            )}
          </button>
          </li>
        ))}
        </ul>
      </nav>
      </div>
      
      {/* Conteúdo principal */}
      <div className="flex-grow overflow-auto p-6">
      {renderContent()}
      
      {/* Botão Salvar (fixo na parte inferior) */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center shadow-lg">
        <Save className="h-5 w-5 mr-2" />
        <span>Salvar Alterações</span>
        </button>
      </div>
      </div>
    </div>
  );
};

export default OptionsInterface;
