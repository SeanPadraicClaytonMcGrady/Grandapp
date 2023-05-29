import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav className="bg-white mt-0 border-box p-2 m-4">
        <div className="flex justify-between px-1 py-1">
          <div className="">
            <Link to="/profile">
              <img
                src="https://ychef.files.bbci.co.uk/976x549/p086k2k4.jpg"
                alt="baby with headphones"
                className="w-12 h-12 rounded-full object-cover"
              />
            </Link>
          </div>

          <div className="flex items-center bg-teal-400 px-2 border-solid border-1 rounded mt-2 mb-2 text-white">
            <Link to="/login">GrandApp</Link>
          </div>

          <div className="flex items-center">
            <Link to="/users">See Users</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
