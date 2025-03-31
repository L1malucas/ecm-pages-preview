import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import DocumentPreview from './document-preview'
import FileExplorer from './file-explorer'
import Explorer from './file-explorer (1)'
import OptionsInterface from './options-interface'
import SearchInterface from './search-interface'
import VersionControlInterface from './version-control-interface'

function App() {
  return (
    <BrowserRouter>
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
        }}>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/files">Explorador de Arquivos</Link></li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/preview">Visualização de Documento</Link></li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/explorer">Explorador</Link></li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/options">Opções</Link></li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/search">Buscar</Link></li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/version-control">Controle de Versão</Link></li>
        </ul>
      </nav>

      <div style={{ marginTop: '60px' }}>
        <Routes>
          <Route path="/files" element={<FileExplorer />} />
          <Route path="/preview" element={<DocumentPreview />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/options" element={<OptionsInterface />} />
          <Route path="/search" element={<SearchInterface />} />
          <Route path="/version-control" element={<VersionControlInterface />} />
          <Route path="/" element={<FileExplorer />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
