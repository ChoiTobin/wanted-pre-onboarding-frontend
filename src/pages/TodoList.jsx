import { useState } from "react";
import styled from "styled-components";
export const TodoList = ({
  fetchData,
  todoItem,
  List,
  setTodoItem,
  setList,
  access_token,
  handleChange,
}) => {
  const [toggle, setToggle] = useState();

  const [closeToggle, setCloseToggle] = useState(false);

  const { ListTodo } = todoItem;

  const ToggleTodo = (item) => {
    const filteredList = List.filter((compare) => compare.id === item.id);
    if (filteredList.length > 0) {
      setToggle(filteredList);
    }
    setTodoItem({ ListTodo: item?.todo, ...ListTodo });
    setCloseToggle(!closeToggle);
  };

  const updateTodo = (item) => {
    fetchData(
      `https://www.pre-onboarding-selection-task.shop/todos/${item.id}`,
      "PUT",
      { todo: todoItem.ListTodo, isCompleted: true }
    ).then((response) => {
      const updatedList = List.map((todo) => {
        if (todo.id === item.id) {
          return response;
        }
        return todo;
      });
      setList(updatedList);
    });
    setCloseToggle(!closeToggle);
  };

  const deleteTodo = (item) => {
    fetch(`https://www.pre-onboarding-selection-task.shop/todos/${item.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => {
        const updatedList = List.filter((todo) => todo.id !== item.id);
        setList(updatedList);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  
  return (
    <div>

        {List?.map((item, i) => {
          return (
            <>
              <LiTag key={item.id}>
                <input type="checkbox" />
                {closeToggle == true && toggle?.[0].id == item.id ? (
                  <>
                    <input
                    data-testid="modify-input"
                      name="ListTodo"
                      value={ListTodo}
                      onChange={handleChange}
                      type="text"
                    />
                    <button data-testid="submit-button" onClick={() => updateTodo(item)}>제출</button>
                    <button data-testid="cancel-button" onClick={() => setCloseToggle(!closeToggle)}>
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    {item.todo}
                    <button data-testid="modify-button" onClick={() => ToggleTodo(item)}>수정</button>
                    <button data-testid="delete-button" onClick={() => deleteTodo(item)}>삭제</button>
                  </>
                )}
              </LiTag>
            </>
          );
        })}

    </div>
  );
};

const LiTag = styled.li`
border:1px solid;
background:white;
list-style-type: none;
width:100%;

`