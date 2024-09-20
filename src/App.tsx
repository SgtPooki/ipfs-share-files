// Components
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

// Styles
import './App.css'
import { useHelia } from './hooks/useHelia'
import { Page } from './page/Page'

export const App = () => {
  const { starting, error } = useHelia()

  // Only shows the page if IPFS is ready or if the initialization has failed.
  const ready = !starting || error

  return (
    <div className='App sans-serif'>
      <div className='flex flex-column min-vh-100'>
        <Header />
        <main className='flex-auto ph4'>
          { ready && <Page /> }
        </main>
        <Footer />
      </div>
    </div>
  )
}
