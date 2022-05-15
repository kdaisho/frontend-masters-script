import React, { useState } from 'react'
import Head from 'next/head'
import Form from '../components/Form'
import SearchResult from '../components/SearchResult'
import styles from '../styles/Home.module.css'

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
    <div className={styles.container}>
      <Head>
        <title>Frontend masters script</title>
        <meta name='description' content='Find courses from Frontend masters' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Frontend Masters Script</h1>
        <Form submit={submit} />
        <SearchResult searchResult={searchResult} />
      </main>

      <footer className={styles.footer}>
        Created by
        <span className={styles.logo}>daishodesign.com</span>
      </footer>
    </div>
  )
}

export default Home
