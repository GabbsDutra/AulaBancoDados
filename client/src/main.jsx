import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import CreateBoneco from './CriarBoneco'
import ReadBoneco from './ListarBoneco'
import UpdateBoneco from './AlterarBoneco'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
            <Routes>
                  <Route path="/" element={ <Home/> }/>
                  <Route path="/Boneco/cadastrar" element={ <CreateBoneco/> }/>
                  <Route path="/Boneco" element={ <ReadBoneco/> }/>
                  <Route path="/Boneco/alterar" element={ <UpdateBoneco/>}/>
            </Routes> 
      </BrowserRouter>
  </React.StrictMode>,
)



