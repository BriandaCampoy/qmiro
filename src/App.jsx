import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/home'
import Media from './routes/movie'
import CategoryPage from './routes/categoryPage'
import MediaType from './routes/trends'
import Error404 from './routes/404'
import './App.css'

function App() {

  return (
      <HashRouter>
        <Routes>
          <Route path="/:media/:id/" element={<Media/>}/>
          <Route path="/category/:id" element={<CategoryPage/>}/>
          <Route path="/trends/:mediaType" element={<MediaType/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="*" element={<Error404/>}/>
        </Routes>
      </HashRouter>
  )
}

export default App
