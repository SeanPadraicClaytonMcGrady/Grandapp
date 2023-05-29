import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchLoginUsers } from '../../lib/apiClient'
import { Link } from 'react-router-dom'
import { UserContext } from '../../lib/userContext'
import background from '../assets/background.jpg'
import Footer from '../Footer'
const SplashPage = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const { setUser } = useContext(UserContext)

  const navigate = useNavigate()

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!username) {
      setError('Invalid username format')
    }

    //PASSWORD VALIDATION
    if (!password) {
      setError('Please enter your password')
    }
    setError(null)
    try {
      const user = await fetchLoginUsers({ username, password })

      setUser(user)

      if (user.type == 'senior') {
        navigate('/senior')
      } else if (user.type == 'volunteer') {
        navigate('/volunteer')
      } else {
        navigate('/welcome')
      }
    } catch (e) {
      const error = e as Error
      setError(error.message)
    }
  }
  return (
    <>
      <div className="text-3xl font-bold text-center border rounded-b-md bg-teal-400 text-white py-3">
        GrandApp
      </div>
      <div
        className="min-h-screen min-w-screen flex flex-col justify-center w-full"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-md w-full mx-auto">
          {/* <div className="text-3xl font-bold text-center border-1 rounded-md bg-teal-400 text-white">
            GrandApp
          </div> */}
        </div>
        <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300 rounded-lg">
          <form action="" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="text-left text-sm font-bold text-gray-600 block"
              >
                Username
              </label>
              <input
                type="username"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                required
                className="w-full p-2 border border-gray-300 rounded mt1"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-left text-sm font-bold text-gray-600 block"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="w-full p-2 border border-gray-300 rounded mt1"
              />
            </div>
            <div>
              <button className="w-full py-2 px-4 bg-teal-400 hover:bg-teal-600 rounded-md text-white text-sm">
                Proceed
              </button>
            </div>
            <div className="flex justify-between text-gray-600 font-bold">
              <div>Don't have an account?</div>
              <div>
                <Link to="/register">Register here</Link>
              </div>
            </div>
            <div className="text-red-500 px-4 py-2 font-bold">
              <p> {error}</p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SplashPage
