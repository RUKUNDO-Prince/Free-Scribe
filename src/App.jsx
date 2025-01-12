import React from 'react'
import './index.css'
import HomePage from './components/HomePage'
import Header from './components/Header'

const App = () => {
  return (
    <div className='flex flex-col max-w-[1000px] mx-auto w-full'>
      <section className='min-h-screen flex flex-col'>
        <Header />
        <HomePage />
      </section>
      <h1 className='text-green-400'>hello</h1>
      <footer></footer>
    </div>
  )
}

export default App