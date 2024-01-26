import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import MainPage from './Components/MainPage';
import ErrorPage from './Components/ErrorPage';
import './CSS/App.css'
import PetDetails from './Components/Pets/PetDetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/pets" element={<MainPage/>} />
        <Route path="*" element={<ErrorPage/>} />
        <Route path="/pets/:id" element={<PetDetails/>} />
      </Routes>
    </Router>
  )
}

export default App