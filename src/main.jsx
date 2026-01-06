import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'katex/dist/katex.min.css';

import './styles/css/root.css'
import './styles/css/inputs.css'
import './styles/css/layouts.css'
import './styles/css/modal.css'
import './styles/css/card.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
