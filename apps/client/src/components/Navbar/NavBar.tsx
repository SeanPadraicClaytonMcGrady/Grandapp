import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-300 mt-0 border-box">
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

          <div className="flex items-center px-2 border-solid border-2 border-black rounded mt-2 mb-2">
            <Link to="/home">GrandApp</Link>
          </div>

          <div className="flex items-center">
            <Link to="/users">See Users</Link>
          </div>
        </div>
      </nav>
    </>
  );
};

//<LInk to />

export default Navbar;
