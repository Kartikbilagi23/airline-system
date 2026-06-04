import {Link, Outlet} from 'react-router-dom'

const Mainlayout = () => {
  return (
    <div>
        <nav className='flex'>
            <Link to="/">Home</Link>
            <Link to="/search">Search Flights</Link>
            <Link to="/login">Login</Link>
        </nav>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}

export default Mainlayout