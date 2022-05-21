import React, { useState } from 'react'
import Head from 'next/head'
import Form from '../components/Form'
import SearchResult from '../components/SearchResult'

const Home = () => {
  const [searchResult, setSearchResult] = useState({})

  const submit = async value => {
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
    setSearchResult(result)
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
        <SearchResult result={searchResult} />
      </main>

      <footer>
        Created by <span>daishodesign.com</span>
      </footer>
    </div>
  )
}

export default Home
