import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/home'
import Movie from './routes/movie'
import CategoryPage from './routes/categoryPage'
import './App.css'

function App() {

  return (
      <HashRouter>
        <Routes>
          <Route path="/movie/2" element={<Movie/>}/>
          <Route path="/category/:id" element={<CategoryPage/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </HashRouter>
  )
}

export default App
