import { Link } from 'react-router-dom'
import { UserContext } from '../../lib/userContext'
import { useContext } from 'react'

const Navbar = () => {
  const { user } = useContext(UserContext)
  return (
    <>
      <nav className="mt-0 border-box text-3xl font-bold text-center border rounded-b-md bg-teal-400 text-white">
        {/* <div className="flex justify-between px-1 py-1"> */}
        {/* <div className="">
            <img
              src="https://ychef.files.bbci.co.uk/976x549/p086k2k4.jpg"
              alt="old man sticking his tongue out"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div> */}

        <div className="text-3xl font-bold bg-teal-400 px-2 border-solid border-1 rounded-b-md mt-2 mb-2 text-white">
          {!(user?.senior === null) ? (
            <Link to="/senior">GrandApp</Link>
          ) : (
            <Link to="/volunteer">GrandApp</Link>
          )}
        </div>
        {/* 
          <div className="flex items-center"></div> */}
        {/* </div> */}
      </nav>
    </>
  )
}

export default Navbar
