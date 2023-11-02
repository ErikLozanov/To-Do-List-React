import { useState } from "react";
import Todo from "./Todo";

export default function ToDoList({todos, onClickHandler, addTodo}) {
  
    const [todo, setTodo] =  useState({text: ''});

    const onChangeHandler = (e) => {
      setTodo((state) => ({...state, [e.target.name]: e.target.value}));
    }

    const onSubmitHandler = async (e) => {
      e.preventDefault();
      addTodo(todo)
      await fetch('http://localhost:3030/jsonstore/todos',{method: 'POST', body: JSON.stringify({...todo, isCompleted: false})})
    }

    return(
        <section className="todo-list-container">
  <h1>Todo List</h1>
  <div className="add-btn-container">
    <form onSubmit={onSubmitHandler}>
    <label htmlFor="task">Task:</label>
    <input name="text" type="text" onChange={onChangeHandler} value={todo.text} required/>
    <button className="btn">+ Add new Todo</button>
    </form>
  </div>
  <div className="table-wrapper">
    <table className="table">
      <thead>
        <tr>
          <th className="table-header-task">Task</th>
          <th className="table-header-status">Status</th>
          <th className="table-header-action">Action</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => <Todo key={todo._id} todo={todo} onClickHandler={onClickHandler}/>)}
      </tbody>
    </table>
  </div>
</section>

    );
}