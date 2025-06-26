import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Pages/Signup.tsx'
import Layout from './components/Layout.tsx'
import OtpVerifiction from './Pages/OtpVerifiction.tsx'
import Comparison from './Pages/Comparison.tsx'
import Profile from './Pages/Profile.tsx'
import { Provider } from 'react-redux'
import store from './store.ts'
import ProtectedRoute from './utils/ProtectedRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="signup" element={<ProtectedRoute><Signup /></ProtectedRoute>} />
          <Route path="otp-verification" element={<ProtectedRoute><OtpVerifiction /></ProtectedRoute>} />
          <Route path="compare" element={<ProtectedRoute><Comparison /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
