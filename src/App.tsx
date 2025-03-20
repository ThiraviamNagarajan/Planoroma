import { useState } from 'react'

import './App.css'
import HomePage from './components/HomePage'
import LoginInPage from './components/LoginPage'
import SignInPage from './components/SignInPage'
import { BrowserRouter, Route, Routes,Navigate } from 'react-router'
import { NavigationProvider, useNavigationControl } from './NavigationProvide'



function App() {
  const [count, setCount] = useState(0)

  
const ProtectedRoute = ({ element }:any) => {
  const { allowed } = useNavigationControl();
  return allowed ? element : <Navigate to="/" />;
};

  return (
    <>
     <NavigationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginInPage />} />
          <Route path="/landingpage" element={<ProtectedRoute element={<HomePage />} />} />
          <Route path="/sign-in-page" element={<ProtectedRoute element={<SignInPage />} />} />
        </Routes>
      </BrowserRouter>
    </NavigationProvider>
    </>
  )
}

export default App
