import { Link } from 'react-router-dom'
import { UserContext } from '../../lib/userContext'
import { useContext } from 'react'

const Navbar = () => {
  const { user } = useContext(UserContext)
  return (
    <>
      <nav className="bg-teal-400 mt-0 border-box">
        <div className="flex justify-between px-1 py-1">
          <div className="">
            <img
              src="https://ychef.files.bbci.co.uk/976x549/p086k2k4.jpg"
              alt="old man sticking his tongue out"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>

          <div className="flex items-center px-2 border-solid border-2 border-black rounded mt-2 mb-2">
            {!(user?.senior === null) ? (
              <Link to="/senior">GrandApp</Link>
            ) : (
              <Link to="/volunteer">Grandapp</Link>
            )}
          </div>

          <div className="flex items-center">
            <Link to={'/users'}>See Users</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
