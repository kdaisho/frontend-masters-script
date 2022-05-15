import Head from 'next/head'
import Form from '../components/Form'
import styles from '../styles/Home.module.css'

export default function Homepage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Frontend masters script</title>
        <meta name='description' content='Find courses from Frontend masters' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Frontend Masters Script</h1>
        <Form />
      </main>

      <footer className={styles.footer}>
        Created by
        <span className={styles.logo}>daishodesign.com</span>
      </footer>
    </div>
  )
}
