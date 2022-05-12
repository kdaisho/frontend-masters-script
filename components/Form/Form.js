import React, { useState } from 'react'

const Form = () => {
  const [value, setValue] = useState('')

  const handleChange = ({ target }) => {
    setValue(target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setValue('')
    console.log('submit', value)
    const body = JSON.stringify({ searchTerm: value })
    const response = await fetch('./api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })

    const j = await response.json()

    console.log('PARSE', j)
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
