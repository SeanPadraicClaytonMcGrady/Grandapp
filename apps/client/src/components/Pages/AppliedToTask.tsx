import { useEffect } from 'react'
import Navbar from './NavBar'
import Footer from '../Footer'
import background from '../Assets/background.jpg'
import { useNavigate } from 'react-router-dom'

const AppliedToTask = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/volunteer')
    }, 5000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [navigate])

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
