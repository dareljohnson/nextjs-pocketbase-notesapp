import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main >
      <div>
        <h1 className='text-2xl font-bold p-4'>Home Page</h1>
        <p className='text-sm p-4'>Some content</p>
      </div>
    </main>
  )
}
