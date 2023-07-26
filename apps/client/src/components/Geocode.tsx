export const geocodeAddress = async (
  address: string
): Promise<{ lat: number; lng: number }> => {
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=AIzaSyCcmthqLKYc8kTQxY5ES_VvRgDP00bf2V8`

  const res = await fetch(apiUrl)
  const data = await res.json()

  if (data.status === 'OK' && data.results.length > 0) {
    const result = data.results[0]
    const { lat, lng } = result.geometry.location
    return { lat, lng }
  } else {
    throw new Error('Error in geocode')
  }
}
