// src/hooks/useCountries.js
import axios from 'axios'
import { useState, useEffect } from 'react'

const useCountries = (selectedCountries) => {
  const [countries,  setCountries]  = useState([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)

  useEffect(() => {
    // if no countries selected, you can even skip the fetch altogether:
    if (!selectedCountries?.length) {
      setCountries([])
      setLoading(false)
      return
    }

    axios.get(
      'https://restcountries.com/v3.1/all',
      {
        params: {
          // <-- this is now required
          fields: 'name,flags,region'
        }
      }
    )
    .then(response => {
      const filtered = response.data
        .filter(c => selectedCountries.includes(c.name.common))
        .map(c => ({
          name:   c.name.common,
          flag:   c.flags.png,
          region: c.region
        }))

      setCountries(filtered)
      setLoading(false)
    })
    .catch(err => {
      console.error('Error fetching country data:', err)
      setError('Failed to load country data.')
      setLoading(false)
    })
  }, [selectedCountries])

  return { countries, loading, error }
}

export default useCountries
