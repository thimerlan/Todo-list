import React, { useEffect, useRef, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";

const Todo = ({
  todo,
  todoComplete,
  deleteTodo,
  editTodo,
  setCount,
  count,
  descr,
}) => {
  const [upText, setUptext] = useState(todo.text);
  const [upDescr, setUpDescr] = useState(todo.descr);
  const [edit, setEdit] = useState(true);
  const editRef = useRef(null);

  useEffect(() => {
    todo.completed == false;
    if (todo.count.minutes == undefined) {
      setCount((todo.count.minutes = 0));
    }
    if (todo.count.minutes > 0) {
      todo.count.seconds == 0 && setCount((todo.count.seconds = 59));
    }
    let countInterval = setInterval(() => {
      +todo.count.seconds > 0 &&
        setCount((todo.count.seconds = +todo.count.seconds - 1));

      if (+todo.count.seconds === 0) {
        if (+todo.count.minutes === 0) {
          if (+todo.count.hours === 0) {
            clearInterval(bla);
          }
        } else {
          setCount((todo.count.minutes = +todo.count.minutes - 1));
          setCount((todo.count.seconds = 59));
        }
      } else {
        editRef.current !== null && editRef.current.click();
        // console.clear(); //Извините! :) Что бы убит bug!
      }
    }, 1000);
    //   : "";

    // setInterval();
    +count.seconds > 0
      ? clearInterval(countInterval)
      : editRef.current !== null && editRef.current.click();
    todo.completed && clearInterval(countInterval);
    return () => {
      clearInterval(countInterval);
    };
  }, [count, todo.count]);

  //todo.count.seconds === 1 ? (todo.count.seconds = 0) : todo.count.seconds
  return (
    <li className="todo-items">
      <div className="td-content">
        <span className="date"></span>
        <input
          disabled={todo.count.seconds === 0 ? true : false}
          onChange={() => todoComplete(todo)}
          type="checkbox"
          checked={todo.completed ? true : false}
        />
        <div className={todo.count.seconds === 0 ? "off-tasks" : ""}>
          <textarea
            disabled={todo.count.seconds === 0 ? true : false}
            onChange={(e) => {
              setUptext(e.target.value);
            }}
            className={todo.completed ? "t-comp" : ""}
            value={edit ? upText : todo.text}
          >
            {todo.text}
          </textarea>
          <textarea
            disabled={todo.count.seconds === 0 ? true : false}
            onChange={(e) => {
              setUpDescr(e.target.value);
            }}
            className={todo.completed ? "t-comp" : ""}
            value={edit ? upDescr : todo.descr}
          >
            {todo.descr}
          </textarea>
        </div>
      </div>

      <div className="c-time">{`${
        todo.count.minutes < 10 ? `0${todo.count.minutes}` : todo.count.minutes
      } : ${
        todo.count.seconds < 10 ? `0${todo.count.seconds}` : todo.count.seconds
      } `}</div>

      <div className="btns">
        <button
          ref={editRef}
          onClick={() => {
            setEdit(!false), editTodo(todo, upText, upDescr, todo.count);
          }}
          className={
            upText !== todo.text || upDescr !== todo.descr
              ? "r-btn re-btn"
              : "r-btn"
          }
          size={53}
        >
          <AiFillEdit />
        </button>
        <button className="r-btn" onClick={() => deleteTodo(todo.id)}>
          <RiDeleteBin5Line size={19} />
        </button>
      </div>
    </li>
  );
};

export default Todo;
