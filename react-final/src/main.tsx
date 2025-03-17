import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
      <App />
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      {/* <Route path="" element={<Movies/>}></Route >
      <Route path="" element={<TV/>}></Route>
      <Route path="" element={<Actors/>}></Route> */}
      
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
