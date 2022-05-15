import React, { useState } from 'react'

const Form = ({ submit }) => {
  const [value, setValue] = useState('')

  const handleChange = ({ target }) => {
    setValue(target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    submit(value)
    setValue('')
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
