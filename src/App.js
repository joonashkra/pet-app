import { Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import MainPage from './Components/MainPage';
import ErrorPage from './Components/ErrorPage';
import './App.css'
import PetDetails from './Components/Pets/PetDetails';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/pets" element={<MainPage/>} />
      <Route path="/pets/:id" element={<PetDetails/>} />
      <Route path="*" element={<ErrorPage/>} />
    </Routes>
  )
}

export default App