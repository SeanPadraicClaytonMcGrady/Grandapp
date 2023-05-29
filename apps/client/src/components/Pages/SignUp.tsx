import React, { useState } from 'react'
import Navbar from './NavBar'
import { Link } from 'react-router-dom'
import { createSenior, createVolunteer } from '../../lib/apiClient'
import background from '../assets/background.jpg'
import Footer from '../Footer'

const SignUp = () => {
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [password, setPassword] = useState<string>('')
  const [volunteer, setVolunteer] = useState<boolean>(true)
  const [medicalNeeds, setMedicalNeeds] = useState<string>('')
  const [biography, setBiography] = useState<string>('')

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value)
  }

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }

  const handleUserChange = () => {
    setVolunteer(!volunteer)
    console.log('senior:', !volunteer, 'volunteer', volunteer)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleMedicalNeedsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMedicalNeeds(event.target.value)
  }

  const handleBiographyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBiography(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload = {
      name,
      username,
      password,
      email,
      medicalNeeds,
      address,
      phoneNumber,
      biography,
    }

    try {
      if (volunteer) {
        const newVolunteer = await createVolunteer(payload)

        console.log('new volunteer created:', newVolunteer)
      } else {
        const newSenior = await createSenior(payload)
        console.log('new senior created:', newSenior)
      }
      setName('')
      setUsername('')
      setPassword('')
      setEmail('')
      setMedicalNeeds('')
      setAddress('')
      setPhoneNumber('')
      setBiography('')
    } catch (e) {
      const newError = e as Error
      setError(newError.message)
      console.error('failed to create a new volunteer:', newError)
    }
  }

  return (
    <>
      <div
        className="min-h-screen min-w-screen flex flex-col justify-center"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-md w-full mx-auto">
          <div className="text-3xl font-bold text-white mt-2 text-center">
            GrandApp
          </div>
          <div className="text-center font-medium text-xl text-white">
            Create an account
          </div>
        </div>
        <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300 rounded-lg">
          <form action="" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="text-left text-sm font-bold text-gray-600 block"
              >
                Please select your user type:
              </label>
              <select
                name="User Type"
                id="userType"
                value={volunteer ? 'volunteer' : 'senior'}
                onChange={handleUserChange}
                className="w-full p-2 border border-gray-300 rounded mt1"
              >
                <option value="senior">Senior</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-left text-sm font-bold text-gray-600 block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="w-full p-2 border border-gray-300 rounded mt1"
              />
            </div>

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
                htmlFor="name"
                className="text-left text-sm font-bold text-gray-600 block"
              >
                Full Name
              </label>
              <input
                type="name"
                id="name"
                value={name}
                onChange={handleFullNameChange}
                required
                className="w-full p-2 border border-gray-300 rounded mt1"
              />
            </div>

            <div>
              <label
                htmlFor="phone number"
                className="text-left text-sm font-bold text-gray-600 block"
              >
                Phone Number
              </label>
              <input
                type="phone number"
                id="phone number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
                className="w-full p-2 border border-gray-300 rounded mt1"
              />
            </div>

            <div>
              <label
                htmlFor="Address"
                className="text-left text-sm font-bold text-gray-600 block"
              >
                Address
              </label>
              <input
                type="Address"
                id="Address"
                value={address}
                onChange={handleAddressChange}
                required
                className="w-full p-2 border border-gray-300 rounded mt1"
              />
            </div>

            <div>
              <label
                htmlFor="Biography"
                className="text-left text-sm font-bold text-gray-600 block"
              >
                Biography
              </label>
              <input
                type="Biography"
                id="Biography"
                value={biography}
                onChange={handleBiographyChange}
                className="w-full p-2 border border-gray-300 rounded mt1"
              />
            </div>

            {!volunteer && (
              <div>
                <label
                  htmlFor="Medical Needs"
                  className="text-left text-sm font-bold text-gray-600 block"
                >
                  Medical Needs
                </label>
                <input
                  type="Medical Needs"
                  id="Medical Needs"
                  value={medicalNeeds}
                  onChange={handleMedicalNeedsChange}
                  className="w-full p-2 border border-gray-300 rounded mt1"
                />
              </div>
            )}

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
                <Link to={volunteer ? '/volunteer' : '/senior'}>
                  Create Account
                </Link>
              </button>
            </div>
            <div className="flex justify-between text-gray-600 font-bold">
              <div>Already have an account?</div>
              <div>
                <Link to="/login">Login here</Link>
              </div>
            </div>
            <div className="text-red-500 px-4 py-2 font-bold">
              <p>{error}</p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SignUp
