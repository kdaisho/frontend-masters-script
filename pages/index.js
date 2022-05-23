import React, { useState } from 'react'
import Head from 'next/head'
import Form from '../components/Form'
import SearchResult from '../components/SearchResult'
import isEmpty from 'lodash/isEmpty'

const Home = () => {
  const [searchResult, setSearchResult] = useState({})
  const [sessionsHidden, setSessionsHidden] = useState(false)
  const [textHidden, setTextHidden] = useState(false)
  const [history, setHistory] = useState([])

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
    setSearchResult(result)

    if (!history.some(h => h.search === result.search)) {
      setHistory([...history, result])
    }
  }

  return (
    <div className='container mx-auto flex flex-col justify-between h-screen text-gray-600 text-lg py-6'>
      <Head>
        <title>Frontend masters script</title>
        <meta name='description' content='Find courses from Frontend masters' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-col gap-10'>
        <h1 className='text-5xl font-bold'>Frontend Masters Script</h1>
        <Form submit={submit} history={history} />
        <div className='flex gap-2'>
          <button
            className='bg-green-500 text-white py-2 px-6 rounded-md disabled:opacity-50 w-full'
            onClick={() => setSessionsHidden(s => !s)}
            disabled={isEmpty(searchResult.courses)}
          >
            {sessionsHidden ? 'Show sessions' : 'Hide sessions'}
          </button>
          <button
            className='bg-green-500 text-white py-2 px-6 rounded-md disabled:opacity-50 w-full'
            onClick={() => setTextHidden(b => !b)}
            disabled={isEmpty(searchResult.courses) || sessionsHidden}
          >
            {textHidden ? 'Show text' : 'Hide text'}
          </button>
        </div>
        {!isEmpty(searchResult.courses) && (
          <SearchResult
            result={searchResult}
            sessionsHidden={sessionsHidden}
            textHidden={textHidden}
          />
        )}
      </main>

      <footer className='h-20 py-4'>
        Created by <span>daishodesign.com</span>
      </footer>
    </div>
  )
}

export default Home
