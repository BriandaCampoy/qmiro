import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/home'
import Movie from './routes/movie'
import CategoriePage from './routes/categoriePage'
import './App.css'

function App() {

  return (
      <HashRouter>
        <Routes>
          <Route path="/movie/2" element={<Movie/>}/>
          <Route path="/categorie/:id" element={<CategoriePage/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </HashRouter>
  )
}

export default App
