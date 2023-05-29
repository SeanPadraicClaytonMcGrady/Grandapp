import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface ExactLocationProps {
  address: string
}

const ExactLocation = ({ address }: ExactLocationProps) => {
  const [googleMapsLink, setGoogleMapsLink] = useState('')

  useEffect(() => {
    if (address) {
      const link = generateGoogleMapsLink(address)
      setGoogleMapsLink(link)
    }
  }, [address])

  const generateGoogleMapsLink = (address: string) => {
    const encodedAddress = encodeURIComponent(address)
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
  }

  return (
    <div>
      {googleMapsLink ? (
        <Link to={googleMapsLink} target="_blank">
          Go to Google Maps
        </Link>
      ) : (
        <p>Invalid address</p>
      )}
    </div>
  )
}

export default ExactLocation
