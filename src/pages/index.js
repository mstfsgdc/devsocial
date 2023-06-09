import Head from 'next/head'
import { Roboto } from 'next/font/google'
import styles from '@/styles/Home.module.scss'

const roboto = Roboto({ subsets: ['latin'], weight: '500' })

export default function Home() {
  return (
    <>
      <Head>
        <title>DevSocial</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${roboto.className}`}>
        <header>
          <div className={`${styles.logo}`}>DevSocial</div>
        </header>
      </main>
    </>
  )
}
