import { useState, useEffect } from 'react'
import axios from 'axios'

function Test() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get('https://api.openbrewerydb.org/v1/breweries?by_city=rocklin')
      .then(res => {
        setData(res.data)
        setLoading(false)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <h1>Test</h1>
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
