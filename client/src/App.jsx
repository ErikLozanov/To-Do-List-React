import { useEffect, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Spinner from './components/Spinner'
import ToDoList from './components/ToDoList'

function App() {
      const [todos,setTodos] = useState([]);
      const [isTodosLoaded, setIsTodosLoaded] = useState(false);

      useEffect(() => {
        const result = fetch('http://localhost:3030/jsonstore/todos')
        .then(response => response.json())
        .then(result => {
          setIsTodosLoaded(true);
          setTodos(Object.values(result))
        })
        .catch(err => console.log(err.message))
      },[])

      const onClickHandler = async (todoId) => {
        setTodos(state => state.map((todo) => todo._id === todoId ? {...todo, isCompleted: !todo.isCompleted} : todo));
        const changedTodo = todos.find(todo => todo._id === todoId);
        const body = {
          isCompleted: !changedTodo.isCompleted,
          text: changedTodo.text,
          _id: changedTodo._id,
        }
        console.log(JSON.stringify(body));
       await fetch(`http://localhost:3030/jsonstore/todos/${todoId}`,{method: 'PUT', body: JSON.stringify(body)})
    }

    const addTodo = (todo) => {
      setTodos(() => [...todos, todo]);
    }

  return (
    <>
    {!isTodosLoaded && <Spinner />}
      <Header />
    <main className="main">
      <ToDoList todos={todos} onClickHandler={onClickHandler} addTodo={addTodo}/>
      <Footer />
    </main>
    </>
  )
}

export default App
