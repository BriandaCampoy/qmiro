import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/home'
import Media from './routes/movie'
import CategoryPage from './routes/categoryPage'
import './App.css'

function App() {

  return (
      <HashRouter>
        <Routes>
          <Route path="/:media/:id" element={<Media/>}/>
          <Route path="/category/:id" element={<CategoryPage/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </HashRouter>
  )
}

export default App
