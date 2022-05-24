import React, { useState } from 'react'
import Head from '../components/Head'
import Footer from '../components/Footer'
import Form from '../components/Form'
import SearchResult from '../components/SearchResult'
import isEmpty from 'lodash/isEmpty'
import { AppTitle } from '../constants'

const Home = () => {
  const [searchResult, setSearchResult] = useState({})
  const [sessionsHidden, setSessionsHidden] = useState(false)
  const [textHidden, setTextHidden] = useState(false)
  const [history, setHistory] = useState([])

  const submit = async value => {
    const cache = history.find(h => h.search === value)

    if (!cache) {
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
      setHistory([...history, result])
    } else {
      setSearchResult(cache)
    }
  }

  return (
    <div className='container mx-auto flex flex-col justify-between h-screen text-indigo-700 text-lg pt-6'>
      <Head />

      <main className='flex flex-col gap-4'>
        <h1 className='text-5xl font-bold py-6'>{AppTitle}</h1>

        <Form submit={submit} history={history} />

        <div className='flex gap-2'>
          <button
            className='bg-indigo-400 text-white py-2 px-6 rounded-md disabled:opacity-50 w-full'
            onClick={() => setSessionsHidden(s => !s)}
            disabled={isEmpty(searchResult.courses)}
          >
            {sessionsHidden ? 'Show time frames' : 'Only session titles'}
          </button>
          <button
            className='bg-indigo-400 text-white py-2 px-6 rounded-md disabled:opacity-50 w-full'
            onClick={() => setTextHidden(b => !b)}
            disabled={isEmpty(searchResult.courses) || sessionsHidden}
          >
            {textHidden ? 'Show everything' : 'Only time frames'}
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

      <Footer />
    </div>
  )
}

export default Home
