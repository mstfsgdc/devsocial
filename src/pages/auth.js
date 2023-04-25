import React from 'react';
import { Roboto } from 'next/font/google'
import styles from '@/styles/Auth.module.scss';

const roboto = Roboto({ subsets: ['latin'], weight: '500' })

export default function auth() {
  return (
    <main>
      <div className={`${styles.popup} ${roboto.className}`}>
        test
      </div>
    </main>
  )
}
