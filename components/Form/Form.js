import React, { useEffect, useState, useRef } from 'react'
import isEmpty from 'lodash/isEmpty'

const Form = ({ submit }) => {
  const [value, setValue] = useState('')
  const inputEl = useRef(null)

  useEffect(() => {
    inputEl.current.focus()
  }, [])

  const handleChange = ({ target }) => {
    setValue(target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    submit(value)
    setValue('')
  }

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <h2 className='text-2xl'>Search courses</h2>
      <label>
        Search Keyword
        <input
          className='border shadow-sm w-full rounded-md p-2'
          id='main-input'
          type='text'
          value={value}
          name='search'
          onChange={handleChange}
          ref={inputEl}
        />
      </label>
      <button
        className='bg-sky-500/100 text-white py-2 px-6 rounded-md disabled:opacity-50'
        disabled={isEmpty(value)}
      >
        Search
      </button>
    </form>
  )
}

export default Form
