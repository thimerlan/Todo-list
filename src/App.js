import "./App.css";

import { HiPlusSm } from "react-icons/hi";
import { useEffect, useState } from "react";
import Todo from "./Todo";

import {
  collection,
  onSnapshot,
  query,
  QuerySnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState("");
  const [descr, setDescr] = useState("");
  const [count, setCount] = useState({
    seconds: 0,
    minutes: 0,
  });
  useEffect(() => {
    const q = query(collection(db, "notes"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let todosArr = [];
      QuerySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Create
  const createTodo = async (e) => {
    e.preventDefault(e);
    setInput("");
    setDescr("");
    if (input && descr !== "") {
      await addDoc(collection(db, "notes"), {
        text: input,
        descr,
        count,
        completed: false,
      });
      setInput((todos.input = ""));

      setDescr((todos.descr = ""));
    }
    setCount({ minutes: 0 });
  };
  console.log(todos);
  // Update
  const todoComplete = async (todo) => {
    await updateDoc(doc(db, "notes", todo.id), {
      completed: !todo.completed,
    });
  };
  // Edit

  const editTodo = async (todo, title, descr, count) => {
    await updateDoc(doc(db, "notes", todo.id), {
      text: title,
      descr,
      count,
    });
  };

  // Delete
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "notes", id));
  };

  return (
    <div className="TodoApp">
      <div className="container">
        <div className="head">
          <div className="top-head">
            <h1>TO-DO LIST FOR YOU!</h1>
            <form onSubmit={createTodo} className="form">
              <input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                className="input"
                type="text"
                placeholder="Title"
              />

              <input
                placeholder="Description"
                className="input"
                value={descr}
                onChange={(e) => {
                  setDescr(e.target.value);
                }}
                type="text"
              />
              <div className="data-add">
                <input
                  max={59}
                  maxLength={2}
                  value={count.minutes < 0 ? 0 : count.minutes}
                  type="number"
                  onChange={(e) => {
                    setCount((prev) => ({ ...prev, minutes: e.target.value }));
                  }}
                />

                <input
                  max={59}
                  maxLength={2}
                  value={count.seconds < 0 ? 0 : count.seconds}
                  type="number"
                  onChange={(e) => {
                    setCount((prev) => ({ ...prev, seconds: e.target.value }));
                  }}
                />
              </div>
              <button
                disabled={input.length && descr.length ? false : true}
                className="add-btn"
              >
                <HiPlusSm size={50} />
              </button>
            </form>
          </div>
          <ul>
            {todos.map((todo, index) => {
              return (
                <Todo
                  key={index}
                  todo={todo}
                  todoComplete={todoComplete}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  setCount={setCount}
                  count={count}
                  descr={descr}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
