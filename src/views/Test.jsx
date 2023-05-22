import { useState, useEffect } from 'react'
import axios from 'axios'

function Test() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState('dude')

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(`https://api.openbrewerydb.org/breweries?by_city=${city}`)
        setData(response.data)
        setLoading(false)
      }
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [city])

  const handleSubmit = e => {
    e.preventDefault()
    setCity(e.target.city.value)
  }

  return (
    <div>
      <h1>Test</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='city'>City</label>
        <input type='text' name='city' id='city' onChange={e => setCity(e.target.value)} />
        <input type='submit' value='Submit' />
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.map((item, index) => {
          return (
            <div key={index}>
              <h3>{item.name}</h3>
              <p>{item.brewery_type}</p>
              <p>{item.address_1}</p>
              <p>
                {item.city}, {item.state_province} {item.postal_code}
              </p>
            </div>
          )
        })
      )}
    </div>
  )
}

export default Test
