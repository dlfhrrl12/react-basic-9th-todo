import { useState } from 'react'
const SAMPLE_TODOS = [
  { id: 1, text: "Buy milk" },
  { id: 2, text: "Clean the house" },
  { id: 3, text: "Go for a run" },
  { id: 4, text: "Finish homework" },
  { id: 5, text: "Call mom" },
  { id: 6, text: "Buy groceries" },
  { id: 7, text: "Walk the dog" },
  { id: 8, text: "Read a book" },
  { id: 9, text: "Do laundry" },
  { id: 10, text: "Write code" },
];


function TodoList() {
  const [todos, setTodos] = useState(SAMPLE_TODOS);
  const [todoText, setTodoText] = useState('123');

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('handleSubmit');

    if(!todoText.trim()){
      return;
    }

    // console.log("todoText :>> ", todoText, todoText.length);

    setTodos([{id: crypto.randomUUID(), text: todoText}, ...todos]);

    setTodoText('');
  }

  const handleChange = (e) => {
    setTodoText(e.target.value)
  }
  // ------------ delete ----------------
  // const handleDelete = (id) => {
  //   const filteredTodos = todos.filter((todo) => {
  //     if(todo.id === id){
  //       return false;
  //     }
      
  //     return true;
  //   });
  //   setTodos(filteredTodos);
  // }
  // const handleDelete = (id) => {
  //   setTodos((prev) => {
  //      prev.filter((todo) => {
  //       if(todo.id === id){
  //         return false;
  //       }
  //       return true;
  //     });
  //   });
  // }
  const handleDelete = (id) => {
    // todo.id가 내가 찾는 id와 같지 않을 때 true를 반환하여 그대로 남겨둠
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }
  //---------------------------------
  const handleToggleCompleted = (id) => {
    const updatedTodos = todos.map((todo) => {
      return todo.id === id ? {...todo, completed: !todo.completed} : todo;
    });

    setTodos(updatedTodos);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={todoText} onChange={handleChange} />
        <button type='submit'>제출하기</button>
        
      </form>
    <ul>
      {todos.map(({id, text, completed}) => (
        <li key={id}>
          <p
            style={{
              textDecoration: completed ? "line-through" : "none",
            }}
          >{text}</p>
          <div>
          <button onClick={() => handleToggleCompleted(id)}>
            {completed ? "취소하기" : "완료하기"}
          </button>
          <button onClick={() => handleDelete(id)}>삭제하기</button>
          </div>
        </li>
      ))}
    </ul>
    </div>
  )
}

export default TodoList
