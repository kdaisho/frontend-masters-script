import React, { useState } from 'react'
import Head from 'next/head'
import Form from '../components/Form'
import SearchResult from '../components/SearchResult'
import isEmpty from 'lodash/isEmpty'

const Home = () => {
  const [searchResult, setSearchResult] = useState({})
  const [textHidden, setTextHidden] = useState(false)

  const submit = async value => {
    const body = JSON.stringify({ searchTerm: value })
    const response = await fetch('./api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })

    setSearchResult(await response.json())
  }

  return (
    <div className='container mx-auto flex flex-col justify-between h-screen text-gray-600 text-lg'>
      <Head>
        <title>Frontend masters script</title>
        <meta name='description' content='Find courses from Frontend masters' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-col gap-10'>
        <h1 className='text-5xl font-bold'>Frontend Masters Script</h1>
        <Form submit={submit} />
        <button
          className='bg-green-500 text-white py-2 px-6 rounded-md disabled:opacity-50'
          onClick={() => setTextHidden(b => !b)}
          disabled={isEmpty(searchResult.courses)}
        >
          {textHidden ? 'Show text' : 'Hide text'}
        </button>
        <SearchResult result={searchResult} textHidden={textHidden} />
      </main>

      <footer>
        Created by <span>daishodesign.com</span>
      </footer>
    </div>
  )
}

export default Home
