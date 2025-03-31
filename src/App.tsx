import './App.css'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import DocumentPreview from './document-preview'
import FileExplorer from './file-explorer'
import Explorer from './file-explorer (1)'
import OptionsInterface from './options-interface'
import SearchInterface from './search-interface'
import VersionControlInterface from './version-control-interface'
import NotFound from './404'
import FluxoAprovacaoDocumentos from './fluxo-aprovacao-documentos'
import GerenciadorDocumentos from './sistema-ged-interface'

function App() {
  return (
    <HashRouter>
      <nav style={{
        backgroundColor: '#333',
        padding: '1rem',
        position: 'fixed',
        top: 0,
        width: '100%',
      }}>
        <ul style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/files">Explorador de Arquivos</Link></li>
          <li style={{ color: '#666' }}>|</li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/preview">Visualização de Documento</Link></li>
          <li style={{ color: '#666' }}>|</li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/explorer">Explorador</Link></li>
          <li style={{ color: '#666' }}>|</li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/options">Opções</Link></li>
          <li style={{ color: '#666' }}>|</li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/search">Buscar</Link></li>
          <li style={{ color: '#666' }}>|</li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/version-control">Controle de Versão</Link></li>
          <li style={{ color: '#666' }}>|</li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/flow">Fluxo de Aprovação</Link></li>
          <li style={{ color: '#666' }}>|</li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/mouse">Mouse Direito</Link></li>
          <li style={{ color: '#666' }}>|</li>
          </ul>
      </nav>

      <div style={{ marginTop: '60px' }}>
      <Routes>
          <Route path="/" element={<FileExplorer />} />
          <Route path="/files" element={<FileExplorer />} />
          <Route path="/preview" element={<DocumentPreview />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/options" element={<OptionsInterface />} />
          <Route path="/search" element={<SearchInterface />} />
          <Route path="/version-control" element={<VersionControlInterface />} />
          <Route path="/flow" element={<FluxoAprovacaoDocumentos />} />
          <Route path="/mouse" element={<GerenciadorDocumentos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
