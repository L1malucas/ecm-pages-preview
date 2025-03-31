/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState, useEffect, useRef } from 'react';
import { Search, Filter, X, Calendar, FileText, Folder, Clock,  User, Tag, ChevronDown, ChevronUp, ArrowLeft, FileCheck, File, Image, Film, Music, Archive, Book, Database } from 'lucide-react';
import _ from 'lodash';

const SearchInterface = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    id: number;
    name: string;
    type: string;
    path: string;
    modified: string;
    owner: string;
    tags: string[];
  }[]>([]);
  const [filteredResults, setFilteredResults] = useState<{
    id: number;
    name: string;
    type: string;
    path: string;
    modified: string;
    owner: string;
    tags: string[];
  }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    types: [] as string[],
    dateRange: { from: '', to: '' },
    tags: [] as string[],
    locations: [] as string[],
    owners: [] as string[]
  });
  const [recentSearches, setRecentSearches] = useState([
    'quarterly report', 'budget 2025', 'project proposal', 'marketing materials'
  ]);
  const [activeResult, setActiveResult] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement | null>(null);

  // Dados de exemplo para filtros
  const availableFilters = {
    types: ['Documentos', 'Imagens', 'Vídeos', 'Áudio', 'Arquivos', 'Planilhas', 'Apresentações'],
    tags: ['Importante', 'Confidencial', 'Rascunho', 'Final', 'Revisado', 'Aprovado', 'Rejeitado'],
    locations: ['Meus Arquivos', 'Compartilhado Comigo', 'Documentos da Equipe', 'Arquivo', 'Projetos'],
    owners: ['Eu', 'João Silva', 'Sara Santos', 'Admin da Equipe', 'Parceiros Externos']
  };

  // Resultados de pesquisa de exemplo (em um app real, isso viria do backend)
  const mockSearchResults = [
    { id: 1, name: 'Relatório Financeiro Trimestral Q1 2025.docx', type: 'document', path: '/Financeiro/Relatórios', modified: '2025-03-15', owner: 'João Silva', tags: ['Final', 'Aprovado'] },
    { id: 2, name: 'Plano de Marketing Lançamento Produto.pptx', type: 'presentation', path: '/Marketing/2025', modified: '2025-03-10', owner: 'Sara Santos', tags: ['Rascunho'] },
    { id: 3, name: 'Previsão Orçamentária 2025-2026.xlsx', type: 'spreadsheet', path: '/Financeiro/Planejamento', modified: '2025-02-28', owner: 'Eu', tags: ['Importante'] },
    { id: 4, name: 'Ata Reunião de Equipe Março.pdf', type: 'document', path: '/Equipe/Reuniões', modified: '2025-03-25', owner: 'Admin da Equipe', tags: ['Final'] },
    { id: 5, name: 'Proposta Projeto Alfa.docx', type: 'document', path: '/Projetos/Alfa', modified: '2025-03-18', owner: 'Eu', tags: ['Rascunho', 'Confidencial'] },
    { id: 6, name: 'Apresentação Cliente.pptx', type: 'presentation', path: '/Vendas/Apresentações', modified: '2025-03-20', owner: 'Sara Santos', tags: ['Final', 'Aprovado'] },
    { id: 7, name: 'Fotos do Escritório.jpg', type: 'image', path: '/Marketing/Mídia', modified: '2025-03-05', owner: 'Sara Santos', tags: [] },
    { id: 8, name: 'Manual do Funcionário 2025.pdf', type: 'document', path: '/RH/Políticas', modified: '2025-01-15', owner: 'Admin da Equipe', tags: ['Final'] },
    { id: 9, name: 'Vídeo Demo do Produto.mp4', type: 'video', path: '/Marketing/Mídia', modified: '2025-02-10', owner: 'João Silva', tags: ['Aprovado'] },
    { id: 10, name: 'Diagrama Arquitetura Sistema.svg', type: 'image', path: '/Engenharia/Design', modified: '2025-03-12', owner: 'Parceiros Externos', tags: ['Final', 'Confidencial'] },
  ];

  // Function to get icon based on file type
  const getIcon = (type: any) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'spreadsheet':
        return <Database className="h-5 w-5 text-green-500" />;
      case 'presentation':
        return <Book className="h-5 w-5 text-orange-500" />;
      case 'image':
        return <Image className="h-5 w-5 text-purple-500" />;
      case 'video':
        return <Film className="h-5 w-5 text-red-500" />;
      case 'audio':
        return <Music className="h-5 w-5 text-yellow-500" />;
      case 'archive':
        return <Archive className="h-5 w-5 text-gray-500" />;
      default:
        return <File className="h-5 w-5 text-gray-400" />;
    }
  };

  // Perform fuzzy search
  const performSearch = (searchText: string) => {
    if (!searchText.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Fuzzy search implementation
      const results = mockSearchResults.filter(item => {
        // Simple fuzzy match (in a real app, you'd use a proper fuzzy search algorithm)
        const searchTerms = searchText.toLowerCase().split(' ');
        const itemText = item.name.toLowerCase();
        const pathText = item.path.toLowerCase();
        
        return searchTerms.every((term: string) => 
          itemText.includes(term) || pathText.includes(term) || 
          item.tags.some(tag => tag.toLowerCase().includes(term))
        );
      });
      
      setSearchResults(results);
      applyFilters(results);
      setIsLoading(false);
      
      // Add to recent searches if not already there
      if (searchText.trim() && !recentSearches.includes(searchText.trim())) {
        setRecentSearches(prev => [searchText.trim(), ...prev.slice(0, 4)]);
      }
    }, 300);
  };

  // Debounced search
  const debouncedSearch = useRef(_.debounce(performSearch, 300)).current;

  // Apply filters to search results
  const applyFilters = (results = searchResults) => {
    let filtered = [...results];
    
    // Filter by type
    if (selectedFilters.types.length > 0) {
      filtered = filtered.filter(item => 
        selectedFilters.types.some(type => type.toLowerCase() === item.type)
      );
    }
    
    // Filter by date range
    if (selectedFilters.dateRange.from) {
      filtered = filtered.filter(item => 
        new Date(item.modified) >= new Date(selectedFilters.dateRange.from)
      );
    }
    
    if (selectedFilters.dateRange.to) {
      filtered = filtered.filter(item => 
        new Date(item.modified) <= new Date(selectedFilters.dateRange.to)
      );
    }
    
    // Filter by tags
    if (selectedFilters.tags.length > 0) {
      filtered = filtered.filter(item => 
        item.tags.some((tag: any) => selectedFilters.tags.includes(tag))
      );
    }
    
    // Filter by owners
    if (selectedFilters.owners.length > 0) {
      filtered = filtered.filter(item => 
        selectedFilters.owners.includes(item.owner)
      );
    }
    
    // Filter by locations
    if (selectedFilters.locations.length > 0) {
      filtered = filtered.filter(item => {
        const pathParts = item.path.split('/');
        return selectedFilters.locations.some(loc => 
          pathParts.some((part: any) => part === loc)
        );
      });
    }
    
    setFilteredResults(filtered);
  };

  // Handle input change
  const handleInputChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
    setActiveResult(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: { key: string; preventDefault: () => void; }) => {
    if (filteredResults.length === 0) return;
    
    // Down arrow
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveResult(prev => 
        prev < filteredResults.length - 1 ? prev + 1 : prev
      );
      
      // Scroll into view if needed
      if (activeResult >= 0 && resultsContainerRef.current) {
        const activeElement = resultsContainerRef.current.querySelector(`[data-index="${activeResult + 1}"]`);
        if (activeElement) {
          activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }
    
    // Up arrow
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveResult(prev => prev > 0 ? prev - 1 : 0);
      
      // Scroll into view if needed
      if (activeResult > 0 && resultsContainerRef.current) {
        const activeElement = resultsContainerRef.current.querySelector(`[data-index="${activeResult - 1}"]`);
        if (activeElement) {
          activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }
    
    // Enter to select
    if (e.key === 'Enter' && activeResult >= 0) {
      e.preventDefault();
      // Handle selection (navigate to file, etc.)
      console.log("Selected:", filteredResults[activeResult]);
    }
  };

  // Toggle filter selection
  const toggleFilter = (type: 'types' | 'tags' | 'locations' | 'owners', value: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      
      if (newFilters[type].includes(value)) {
        newFilters[type] = newFilters[type].filter((item: any) => item !== value);
      } else {
        newFilters[type] = [...newFilters[type], value];
      }
      
      return newFilters;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedFilters({
      types: [],
      dateRange: { from: '', to: '' },
      tags: [],
      locations: [],
      owners: []
    });
  };

  // Update filtered results when filters or search results change
  useEffect(() => {
    applyFilters();
  }, [selectedFilters, searchResults]);

  // Focus search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Search header */}
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-gray-100 mr-2">
              <ArrowLeft className="h-5 w-5 text-gray-500" />
            </button>
            <h1 className="text-xl font-medium">Advanced Search</h1>
          </div>
          
          <div className="mt-4 relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 ${isLoading ? 'text-blue-500' : 'text-gray-400'}`} />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 placeholder-gray-400 text-gray-900"
                placeholder="Search files, folders, and documents..."
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              {query && (
                <button 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => {
                    setQuery('');
                    setSearchResults([]);
                    setFilteredResults([]);
                    searchInputRef.current?.focus();
                  }}
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            
            <button
              className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            >
              <Filter className="h-4 w-4 mr-1" />
              {showAdvancedSearch ? 'Hide filters' : 'Show filters'} 
              {showAdvancedSearch ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
            </button>
          </div>
          
          {/* Advanced search filters */}
          {showAdvancedSearch && (
            <div className="mt-4 p-4 bg-gray-50 border rounded-lg">
              <div className="flex flex-wrap items-start -mx-2">
                {/* File type filter */}
                <div className="px-2 w-full md:w-1/4 mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FileText className="h-4 w-4 mr-1" /> File Type
                  </h3>
                  <div className="space-y-1">
                    {availableFilters.types.map(type => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                          checked={selectedFilters.types.includes(type)}
                          onChange={() => toggleFilter('types', type)}
                        />
                        <span className="ml-2 text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Date range filter */}
                <div className="px-2 w-full md:w-1/4 mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" /> Date Modified
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">From</label>
                      <input
                        type="date"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={selectedFilters.dateRange.from}
                        onChange={(e) => setSelectedFilters(prev => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, from: e.target.value }
                        }))}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">To</label>
                      <input
                        type="date"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={selectedFilters.dateRange.to}
                        onChange={(e) => setSelectedFilters(prev => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, to: e.target.value }
                        }))}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Tags filter */}
                <div className="px-2 w-full md:w-1/4 mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Tag className="h-4 w-4 mr-1" /> Tags
                  </h3>
                  <div className="space-y-1">
                    {availableFilters.tags.map(tag => (
                      <label key={tag} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                          checked={selectedFilters.tags.includes(tag)}
                          onChange={() => toggleFilter('tags', tag)}
                        />
                        <span className="ml-2 text-sm text-gray-700">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Owner and Location filters */}
                <div className="px-2 w-full md:w-1/4 mb-4">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <User className="h-4 w-4 mr-1" /> Owner
                    </h3>
                    <div className="space-y-1">
                      {availableFilters.owners.slice(0, 3).map(owner => (
                        <label key={owner} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                            checked={selectedFilters.owners.includes(owner)}
                            onChange={() => toggleFilter('owners', owner)}
                          />
                          <span className="ml-2 text-sm text-gray-700">{owner}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Folder className="h-4 w-4 mr-1" /> Location
                    </h3>
                    <div className="space-y-1">
                      {availableFilters.locations.slice(0, 3).map(location => (
                        <label key={location} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                            checked={selectedFilters.locations.includes(location)}
                            onChange={() => toggleFilter('locations', location)}
                          />
                          <span className="ml-2 text-sm text-gray-700">{location}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4 pt-3 border-t">
                <button 
                  className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                  onClick={clearFilters}
                >
                  Clear filters
                </button>
                <button 
                  className="ml-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => applyFilters()}
                >
                  Apply filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Search results */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-screen-xl mx-auto p-4">
          {/* Recent searches */}
          {!query && recentSearches.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Clock className="h-4 w-4 mr-1" /> Recent Searches
              </h2>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
                    onClick={() => {
                      setQuery(search);
                      performSearch(search);
                    }}
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Search results */}
          {isLoading ? (
            <div className="py-20 text-center text-gray-500">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-10 w-10 bg-blue-200 rounded-full mb-4"></div>
                <div className="h-4 w-40 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : query && filteredResults.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              <FileCheck className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-1">No results found</h3>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          ) : query && filteredResults.length > 0 ? (
            <div className="space-y-1" ref={resultsContainerRef}>
              <div className="pb-2 text-sm text-gray-500">
                Found {filteredResults.length} results for "{query}"
              </div>
              
              {filteredResults.map((result, index) => (
                <div
                  key={result.id}
                  data-index={index}
                  className={`p-3 rounded-lg cursor-pointer ${
                    activeResult === index ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => console.log("Selected:", result)}
                  onMouseEnter={() => setActiveResult(index)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-1">
                      {getIcon(result.type)}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{result.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">{result.path}</p>
                        </div>
                        <div className="text-xs text-gray-500">{result.modified}</div>
                      </div>
                      
                      <div className="mt-2 flex items-center">
                        <div className="text-xs text-gray-500 flex items-center">
                          <User className="h-3 w-3 mr-1" /> {result.owner}
                        </div>
                        
                        {result.tags.length > 0 && (
                          <div className="ml-4 flex flex-wrap gap-1">
                            {result.tags.map((tag: string) => (
                              <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      
      {/* Status bar */}
      {filteredResults.length > 0 && (
        <div className="bg-white border-t px-4 py-2 text-sm text-gray-600">
          {filteredResults.length} results found
        </div>
      )}
    </div>
  );
};

export default SearchInterface;
