import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup.tsx';
import Layout from './components/Layout.tsx';
import OtpVerifiction from './Pages/OtpVerifiction.tsx';
import Comparison from './Pages/Comparison.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path="signup" element={<Signup />} />
        <Route path="otp-verification" element={<OtpVerifiction />} />
        <Route path="compare" element={<Comparison />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
