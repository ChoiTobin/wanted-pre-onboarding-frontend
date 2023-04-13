
import * as React from 'react';

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TodoList } from "./TodoList";


const Todo = () => {
  const navigate = useNavigate();
  const [Value, setValue] = useState({
    todo: "",
  });

  const [todoItem, setTodoItem] = useState({
    ListTodo: "",
  });

  const [List, setList] = useState([]);

  let access_token = localStorage.getItem("access_token");

  const { todo } = Value;

  const fetchData = (url, method, body) => {
    return fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  };

  useEffect(() => {
    if(access_token == null ||undefined){
      navigate("/signin")
    }
    fetchData(
      "https://www.pre-onboarding-selection-task.shop/todos",
      "GET"
    ).then((response) => {
      setList(response);
    });
  }, [navigate]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "ListTodo") {
      setTodoItem({
        ...todoItem,
        [name]: value,
      });
    } else {
      setValue({ ...Value, [name]: value });
    }
  };

  const createTodo = () => {
    fetchData("https://www.pre-onboarding-selection-task.shop/todos", "POST", {
      todo: Value.todo,
    }).then((response) => {
      setList([...List, response]);
      setValue({ ...Value, todo: "" });
    });
  };

  return (
    <> 
    <div>
        <input name="todo" value={todo} onChange={handleChange} type="text" />
      <button onClick={createTodo}>추가</button>
      </div>
        <TodoList
          fetchData={fetchData}
          todoItem={todoItem}
          List={List}
          setTodoItem={setTodoItem}
          setList={setList}
          access_token={access_token}
          handleChange={handleChange}
        />
    </>
  );
};


export default Todo;
