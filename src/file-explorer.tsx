import React, { useState } from 'react';
import { Folder, File, FileText, Image, Film, Music, Archive, MoreVertical, Grid, List, Search, Upload, Download, Share, Trash2, Star, Plus, Filter } from 'lucide-react';

const FileExplorer = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFolder, setCurrentFolder] = useState('/My Files');
  
  // Sample folder structure
  const folderStructure = [
    { id: 1, name: 'Documentos', type: 'folder', size: '-', modified: '15/03/2025', starred: true },
    { id: 2, name: 'Imagens', type: 'folder', size: '-', modified: '10/03/2025' },
    { id: 3, name: 'Relatório do Projeto.docx', type: 'file', fileType: 'document', size: '2,4 MB', modified: '28/03/2025' },
    { id: 4, name: 'Apresentação.pptx', type: 'file', fileType: 'document', size: '5,7 MB', modified: '25/03/2025' },
    { id: 5, name: 'Orçamento_2025.xlsx', type: 'file', fileType: 'document', size: '1,2 MB', modified: '20/03/2025' },
    { id: 6, name: 'Foto de Perfil.jpg', type: 'file', fileType: 'image', size: '3,5 MB', modified: '18/03/2025' },
    { id: 7, name: 'Vídeo Demo.mp4', type: 'file', fileType: 'video', size: '45,2 MB', modified: '28/02/2025' },
    { id: 8, name: 'Arquivos do Projeto.zip', type: 'file', fileType: 'archive', size: '128 MB', modified: '05/03/2025' },
    { id: 9, name: 'Gravação de Áudio.mp3', type: 'file', fileType: 'audio', size: '8,1 MB', modified: '01/03/2025' },
  ];

  // Filter items based on search query
  const filteredItems = folderStructure.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get icon based on file type
  const getIcon = (item: { id: number; name: string; type: string; size: string; modified: string; starred: boolean; fileType?: undefined; } | { id: number; name: string; type: string; size: string; modified: string; starred?: undefined; fileType?: undefined; } | { id: number; name: string; type: string; fileType: string; size: string; modified: string; starred?: undefined; }) => {
    if (item.type === 'folder') return <Folder className="h-6 w-6 text-blue-500" />;
    
    switch (item.fileType) {
      case 'document':
        return <FileText className="h-6 w-6 text-yellow-500" />;
      case 'image':
        return <Image className="h-6 w-6 text-green-500" />;
      case 'video':
        return <Film className="h-6 w-6 text-red-500" />;
      case 'audio':
        return <Music className="h-6 w-6 text-purple-500" />;
      case 'archive':
        return <Archive className="h-6 w-6 text-gray-500" />;
      default:
        return <File className="h-6 w-6 text-gray-400" />;
    }
  };

  // Handle item selection
  const toggleItemSelection = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  // Handle folder navigation
  const navigateToFolder = (folderName: string) => {
    setCurrentFolder(prev => `${prev}/${folderName}`);
  };

  // Handle navigation up one level
  const navigateUp = () => {
    const paths = currentFolder.split('/');
    if (paths.length > 2) {
      paths.pop();
      setCurrentFolder(paths.join('/'));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top navigation bar */}
      <div className="bg-white shadow p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">Gerenciador de Arquivos</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Upload className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Download className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Share className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Trash2 className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Search and view controls */}
      <div className="flex items-center justify-between bg-white p-4 border-b">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search files and folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-3 ml-4">
          <button 
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            onClick={() => setViewMode('list')}
          >
            <List className="h-5 w-5" />
          </button>
          <button 
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button className="p-2 rounded hover:bg-gray-100">
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Breadcrumb navigation */}
      <div className="bg-white px-4 py-2 border-b flex items-center">
        <button 
          onClick={navigateUp}
          className="text-sm text-blue-500 hover:underline mr-1"
        >
          {currentFolder === '/My Files' ? 'My Files' : '..'}
        </button>
        
        {currentFolder !== '/My Files' && (
          <div className="flex items-center text-sm">
            <span className="mx-1 text-gray-500">/</span>
            {currentFolder.split('/').slice(2).map((path, i, arr) => (
              <React.Fragment key={i}>
                <span className={i === arr.length - 1 ? "font-medium" : "text-blue-500 hover:underline cursor-pointer"}>
                  {path}
                </span>
                {i < arr.length - 1 && <span className="mx-1 text-gray-500">/</span>}
              </React.Fragment>
            ))}
          </div>
        )}
        
        <button className="ml-auto p-1 rounded-full hover:bg-gray-100">
          <Plus className="h-5 w-5 text-blue-500" />
        </button>
      </div>
      
      {/* Main content area */}
      <div className="flex-grow overflow-auto p-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredItems.map(item => (
              <div 
                key={item.id}
                className={`relative rounded-lg border p-3 cursor-pointer transition-all hover:shadow-md ${
                  selectedItems.includes(item.id) ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'
                }`}
                onClick={() => toggleItemSelection(item.id)}
                onDoubleClick={() => item.type === 'folder' && navigateToFolder(item.name)}
              >
                <div className="flex flex-col items-center">
                  <div className="rounded-lg bg-gray-50 p-2 mb-2">
                    {getIcon(item)}
                  </div>
                  <div className="w-full text-center">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.size}</p>
                  </div>
                </div>
                {item.starred && (
                  <Star className="absolute top-2 right-2 h-4 w-4 text-yellow-400 fill-current" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modified</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.map(item => (
                  <tr 
                    key={item.id}
                    className={`${
                      selectedItems.includes(item.id) ? 'bg-blue-50' : 'hover:bg-gray-50'
                    } cursor-pointer`}
                    onClick={() => toggleItemSelection(item.id)}
                    onDoubleClick={() => item.type === 'folder' && navigateToFolder(item.name)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                          {getIcon(item)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            {item.name}
                            {item.starred && <Star className="ml-1 h-4 w-4 text-yellow-400 fill-current" />}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.modified}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray-500">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Status bar */}
      <div className="bg-white border-t px-4 py-2 text-sm text-gray-600 flex justify-between">
        <div>{filteredItems.length} items</div>
        <div>{selectedItems.length > 0 ? `${selectedItems.length} selected` : ''}</div>
      </div>
    </div>
  );
};

export default FileExplorer;
