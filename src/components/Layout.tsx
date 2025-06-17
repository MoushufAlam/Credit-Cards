import { Outlet } from 'react-router-dom'
import Header from './Header'

function Layout() {
  return (
    <>
      <Header />
      <div>
        <Outlet/>
      </div>
    </>
  )
}

export default Layout