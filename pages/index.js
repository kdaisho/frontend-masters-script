import Head from 'next/head'
import Form from '../components/Form'
import styles from '../styles/Home.module.css'
import fs from 'fs'
import { DS_STORE } from './constants'
import { killJunkFile } from './utils'

export default function Homepage({ found }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend masters script</title>
        <meta name='description' content='Find courses from Frontend masters' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Frontend Masters Script</h1>
        {found && <p>.DS_Store file(s) found, successfully deleted.</p>}
        <Form />
      </main>

      <footer className={styles.footer}>
        Created by
        <span className={styles.logo}>daishodesign.com</span>
      </footer>
    </div>
  )
}

Homepage.getInitialProps = () => {
  let found = false

  if (fs.readdirSync('./scripts').includes(DS_STORE)) {
    killJunkFile(DS_STORE)
    found = true
  }

  for (const folder of fs.readdirSync('./scripts')) {
    if (fs.readdirSync(`./scripts/${folder}`).includes(DS_STORE)) {
      killJunkFile(`${folder}/${DS_STORE}`)
      found = true
    }
  }

  return { found }
}
