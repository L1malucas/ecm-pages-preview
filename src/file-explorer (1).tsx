import React, { useState } from 'react';
import { FolderOpen, File, Star, Clock, Trash, Search, Grid3X3, List, Settings, Download, Share2, Eye, Edit, MoreHorizontal } from 'lucide-react';

const Explorer = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for folders and files
  const items = [
    { id: 1, name: 'Documentos do Projeto', type: 'folder', modified: '28/03/2025', size: '-', starred: true },
    { id: 2, name: 'Relatórios Financeiros', type: 'folder', modified: '25/03/2025', size: '-', starred: false },
    { id: 3, name: 'Relatório Trimestral.pdf', type: 'file', modified: '20/03/2025', size: '2,4 MB', starred: true },
    { id: 4, name: 'Notas da Reunião.docx', type: 'file', modified: '18/03/2025', size: '546 KB', starred: false },
    { id: 5, name: 'Imagens do Produto', type: 'folder', modified: '15/03/2025', size: '-', starred: false },
    { id: 6, name: 'Contratos de Clientes', type: 'folder', modified: '10/03/2025', size: '-', starred: true },
    { id: 7, name: 'Estratégia de Marketing.pptx', type: 'file', modified: '05/03/2025', size: '4,2 MB', starred: false },
    { id: 8, name: 'Orçamento 2025.xlsx', type: 'file', modified: '01/03/2025', size: '1,8 MB', starred: false },
  ];

  // Filter items based on search query
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelect = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, id: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleSelect(id);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top navigation bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold text-gray-800">Document Management System</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-600">John Doe</span>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              JD
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-56 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm w-full flex items-center justify-center space-x-2 hover:bg-blue-700">
              <span>New</span>
            </button>
          </div>
          <nav className="flex-1">
            <ul>
              <li className="px-2">
                <button className="flex items-center space-x-3 px-3 py-2 w-full rounded-lg bg-blue-50 text-blue-700">
                  <FolderOpen className="w-5 h-5" />
                  <span>My Files</span>
                </button>
              </li>
              <li className="px-2 mt-1">
                <button className="flex items-center space-x-3 px-3 py-2 w-full rounded-lg text-gray-700 hover:bg-gray-100">
                  <Star className="w-5 h-5" />
                  <span>Starred</span>
                </button>
              </li>
              <li className="px-2 mt-1">
                <button className="flex items-center space-x-3 px-3 py-2 w-full rounded-lg text-gray-700 hover:bg-gray-100">
                  <Clock className="w-5 h-5" />
                  <span>Recent</span>
                </button>
              </li>
              <li className="px-2 mt-1">
                <button className="flex items-center space-x-3 px-3 py-2 w-full rounded-lg text-gray-700 hover:bg-gray-100">
                  <Trash className="w-5 h-5" />
                  <span>Trash</span>
                </button>
              </li>
            </ul>
            <div className="px-3 mt-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tags</h3>
              <div className="mt-2 space-y-1">
                <div className="flex items-center px-2 py-1 rounded hover:bg-gray-100">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Important</span>
                </div>
                <div className="flex items-center px-2 py-1 rounded hover:bg-gray-100">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Approved</span>
                </div>
                <div className="flex items-center px-2 py-1 rounded hover:bg-gray-100">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm text-gray-700">Pending</span>
                </div>
              </div>
            </div>
            <div className="px-3 mt-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Storage</h3>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full w-2/3"></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">65% used - 6.5GB of 10GB</p>
              </div>
            </div>
          </nav>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1">
              <div className="relative max-w-md w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-lg border border-gray-200 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search files and folders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <Grid3X3 className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <List className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-auto p-4">
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-900">My Files</h2>
              <p className="text-sm text-gray-500">Showing {filteredItems.length} items</p>
            </div>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map(item => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-lg border p-3 cursor-pointer hover:shadow-md transition-shadow duration-200 
                    ${selectedItems.includes(item.id) ? 'ring-2 ring-blue-500 border-transparent' : 'border-gray-200'}`}
                    onClick={() => toggleSelect(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, item.id)}
                    tabIndex={0}
                    role="button"
                    aria-pressed={selectedItems.includes(item.id)}
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-3 flex items-center justify-center bg-gray-50 rounded p-4">
                        {item.type === 'folder' ? (
                          <FolderOpen className="w-12 h-12 text-blue-500" />
                        ) : (
                          <File className="w-12 h-12 text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="text-sm font-medium text-gray-900 truncate" title={item.name}>
                            {item.name}
                          </h3>
                          {item.starred && (
                            <Star className="w-4 h-4 text-yellow-400 ml-1 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Modified: {item.modified}</p>
                        <p className="text-xs text-gray-500">{item.size}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Modified
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredItems.map(item => (
                      <tr 
                        key={item.id}
                        className={`hover:bg-gray-50 ${selectedItems.includes(item.id) ? 'bg-blue-50' : ''}`}
                        onClick={() => toggleSelect(item.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {item.type === 'folder' ? (
                              <FolderOpen className="flex-shrink-0 h-5 w-5 text-blue-500" />
                            ) : (
                              <File className="flex-shrink-0 h-5 w-5 text-gray-500" />
                            )}
                            <div className="ml-4 flex items-center">
                              <span className="text-sm font-medium text-gray-900">{item.name}</span>
                              {item.starred && (
                                <Star className="w-4 h-4 text-yellow-400 ml-2 flex-shrink-0" />
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.modified}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-gray-400 hover:text-gray-500">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          {/* Bottom action bar - appears when items are selected */}
          {selectedItems.length > 0 && (
            <div className="bg-white border-t border-gray-200 p-3 flex items-center">
              <span className="text-sm text-gray-600 mr-4">{selectedItems.length} selected</span>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded hover:bg-gray-100">
                  <Download className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded hover:bg-gray-100">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded hover:bg-gray-100">
                  <Eye className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded hover:bg-gray-100">
                  <Edit className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded hover:bg-gray-100">
                  <Trash className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explorer;
