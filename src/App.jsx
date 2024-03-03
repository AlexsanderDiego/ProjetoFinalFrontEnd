import { useState } from 'react'
import './App.css'
import TelaLogin from './pages/TelaLogin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TelaLogin />
    </>
  )
}

export default App
