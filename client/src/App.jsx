import { useEffect, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import ToDoList from './components/ToDoList'

function App() {
      const [todos,setTodos] = useState([]);

      useEffect(() => {
        const result = fetch('http://localhost:3030/jsonstore/todos')
        .then(response => response.json())
        .then(result => setTodos(Object.values(result)))
        .catch(err => console.log(err.message))
      },[])

      console.log(todos);
  return (
    <>
    <Header />
    <main className="main">
      <ToDoList todos={todos} />
      <Footer />
    </main>
    </>
  )
}

export default App
