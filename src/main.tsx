import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import EnclosureGame from './pages/enclosure-game'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EnclosureGame />
  </StrictMode>,
)
