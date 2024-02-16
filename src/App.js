import { Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import MainPage from './Components/MainPage';
import ErrorPage from './Components/ErrorPage';
import './App.css'
import PetDetails from './Components/Pets/PetDetails';
import RequireAuth from './Components/RequireAuth';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/pets" element={<RequireAuth><MainPage/></RequireAuth>} />
      <Route path="/pets/:id" element={<RequireAuth><PetDetails/></RequireAuth>} />
      <Route path="*" element={<RequireAuth><ErrorPage/></RequireAuth>} />
    </Routes>
  )
}

export default App