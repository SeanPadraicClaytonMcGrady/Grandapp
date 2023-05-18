import { Link, Route, Routes } from "react-router-dom";
import ViewTasks from "./ViewTasks";

const Profile = () => {
  return (
    <>
      <div className="flex justify-between ml-2 mr-2">
        {/* profile pic  */}
        <div className="mt-5 mb-5">
          <img
            src="https://ychef.files.bbci.co.uk/976x549/p086k2k4.jpg"
            alt="baby with headphones"
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
        {/* info card - pull these details from the database */}
        <div className="border-solid border-2 border-black rounded">
          <p>User's name</p>
          <p>Senior / volunteer</p>
          <p>Level of independence?</p>
        </div>
      </div>
      {/* communication buttons */}
      <div className="flex justify-center space-x-2 mb-5">
        <button className="bg-blue-500 rounded py-1 px-2">Add Friend</button>
        <button className="bg-blue-500 rounded py-1 px-2">Send Message</button>
      </div>
      {/* bio */}
      <div className="flex justify-center">
        <input
          type="text"
          className="border-black"
          placeholder="Bio if provided, if not placeholder"
        ></input>
      </div>
      {/* outstanding tasks - will take them through to the feed so need a route */}
      <div className="border-solid border-2 border-black rounded">
        <Link to="/seniors/tasks/open">
          You have *number of tasks* tasks outstanding, click here to view them
        </Link>
      </div>

      {/* medical info card */}
      <div className="border-red ">
        <p className="text-red-600">Click here for medical history </p>
      </div>
      <Routes>
        <Route path="/seniors/tasks/open" element={<ViewTasks />} />
      </Routes>
    </>
  );
};

export default Profile;
