import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import { Provider } from 'react-redux'
import store from './store.ts'
import ProtectedRoute from './utils/ProtectedRoute.tsx'
import { Suspense, lazy } from 'react'
import Loading from './components/Loading.tsx'

const Signup = lazy(() => import('./Pages/Signup.tsx'))
const OtpVerifiction = lazy(() => import('./Pages/OtpVerifiction.tsx'))
const Comparison = lazy(() => import('./Pages/Comparison.tsx'))
const Profile = lazy(() => import('./Pages/Profile.tsx'))

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="signup" element={<ProtectedRoute><Signup /></ProtectedRoute>} />
            <Route path="otp-verification" element={<ProtectedRoute><OtpVerifiction /></ProtectedRoute>} />
            <Route path="compare" element={<ProtectedRoute><Comparison /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </Provider>
)
