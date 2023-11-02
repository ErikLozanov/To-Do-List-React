import { useEffect } from "react";

export default function Todo({todo,onClickHandler}) {

    return(
        <tr className={`todo${todo.isCompleted ? ' is-completed' : ''}`}>
        <td>{todo.text}</td>
        <td>{todo.isCompleted}</td>
        <td className="todo-action">
          <button onClick={() => onClickHandler(todo._id)} className="btn todo-btn">Change status</button>
        </td>
      </tr>
    );
}