import { useState, useEffect } from "react";
import {useGetTodos} from "./useGetTodos"

const Todo = () => {
  const [list, setList] = useState([
    { id: "1", text: "this is a test todo 1", checked: false },
    { id: "2", text: "this is a test todo 2", checked: true },
  ]);
  const [input, setInput] = useState("");
  const [quote, setQuote] = useState("");
  useEffect(() => {
    const fetchQuote = async () =>
      await fetch(`https://type.fit/api/quotes`)
        .then((res) => res.json())
        .then((data) => {
          setQuote(data[Math.floor(Math.random() * 1600) + 1]);
        });
    fetchQuote();
  }, []);
  useGetTodos();

  const addTodo = () => {
    setList([
      ...list,
      { text: input, id: Math.random().toString(), checked: false },
    ]);
    setInput("");
  };

  const removeTodo = (target) => {
    const filteredList = list.filter((item) => item.id !== target);
    setList(filteredList);
  };

  const [styling, setStyling] = useState("button-blue");
  const changeStyling = () => {
    setStyling("button-red");
  };

  const onChangeHandler = (e) => {
    const newList = list.map((item) => {
      const newItem = { ...item };
      if (item.id === e.target.id) {
        newItem.checked = !newItem.checked;
      }
      return newItem;
    });
    setList(newList);
  };
  console.log(quote);
  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
      />
      <button onClick={addTodo}>Todo</button>
      <h2>"{quote.text}"</h2>
      <h2> Authors Name: {quote.author}</h2>
      <h2>To do list</h2>

      {list.map((item) => (
        <div className="todowrapper" key={item.id}>
          <input
            type="checkbox"
            id={item.id}
            name={item.text}
            checked={item.checked}
            onChange={onChangeHandler}
          />
          <p className={item.checked && "p-checked"}>
            {item.text.toUpperCase()}
          </p>
          <button onClick={() => removeTodo(item.id)}>x</button>
          {/* <button className={styling} onClick={() => changeStyling()}>
            button color
          </button> */}
        </div>
      ))}
    </div>
  );
};
export default Todo;
