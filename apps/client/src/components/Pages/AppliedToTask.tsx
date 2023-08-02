import React, { useEffect, useContext } from 'react'
import Navbar from './NavBar'
import Footer from '../Footer'
import background from '../Assets/background.jpg'
import { UserContext } from '../../lib/userContext'

const AppliedToTask = () => {
  //Continue coding in the area below: cycle the user back to the volunteer dashboard after 5 seconds.
  //Later implement this for a senior posting a task.

  // const { user } = useContext(UserContext)
  // const loggedInVolunteer = user?.volunteer

  // useEffect(() => {
  //   if (loggedInVolunteer) {
  //     const countdown = 5000

  //     const timeoutId = setTimeout(() => {})
  //   }
  // })

  return (
    <div>
      <Navbar />
      <div
        className="w-full"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <form className="max-w-4xl w-full h-screen mx-auto">
          <div className="flex justify-center text-3xl border p-3 rounded-md bg-white text-gray-500">
            You've applied! Returning to your dashboard...
          </div>
        </form>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  )
}

export default AppliedToTask
