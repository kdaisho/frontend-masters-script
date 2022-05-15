import React, { useState } from 'react'

const Form = () => {
  const [value, setValue] = useState('')

  const handleChange = ({ target }) => {
    setValue(target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setValue('')

    const body = JSON.stringify({ searchTerm: value })
    const response = await fetch('./api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })

    const result = await response.json()
    console.log('END RESULT', result)

    // TODO: refresh after each query, consider using localStorage if you want to have some persistency
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Type search words
        <input
          id='main-input'
          type='text'
          value={value}
          name='search'
          onChange={handleChange}
        />
      </label>
      <button>Search</button>
    </form>
  )
}

export default Form
