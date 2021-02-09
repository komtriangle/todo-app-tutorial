import React, { useState, useEffect } from "react";
import "./App.css";
import APIHelper from "./APIHelper.js";
import APIHelperQuestion from "./APIHelperQuestion.js";


function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const[questions, setQuestions]=useState([]);
  const[question, setQuestion]=useState("");

  const[answer, setAnswer]=useState("");

  const[category_ToAdd, setCategory_ToAdd]=useState("");
  const[category, setCategory]=useState("");

  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await APIHelper.getAllTodos();
      const questions= await APIHelperQuestion.getAllQuestion();
      setTodos(todos);
      setQuestions(questions);
    };
    fetchTodoAndSetTodos();
  }, []);

  const createTodo = async e => {
    e.preventDefault();
    if (!todo) {
      alert("please enter something");
      return;
    }
    if (todos.some(({ task }) => task === todo)) {
      alert(`Task: ${todo} already exists`);
      return;
    }
    const newTodo = await APIHelper.createTodo(todo);
    console.log(newTodo);
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation();
      await APIHelper.deleteTodo(id);
      setTodos(todos.filter(({ _id: i }) => id !== i));
    } catch (err) {}
  };

  const updateTodo = async (e, id) => {
    e.stopPropagation();
    const payload = {completed: !todos.find(todo => todo._id === id).completed}
    const updatedTodo  = await APIHelper.updateTodo(id, payload);
    setTodos(todos.map((todo)=> todo._id === id ? updatedTodo: todo));
    
  };

  const chooseCategory=async e =>{
    e.preventDefault();
    if(!category){
      alert("please enter somrthing");
      return;
    }
    setCategory(category);
    const questions= await APIHelperQuestion.getAllQuestion(category);
    setQuestions(questions);
  }

  const createQuestion = async e => {
    e.preventDefault();
    if (!question) {
      alert("please enter something");
      return;
    }
    if (questions.some(({ task }) => task === question)) {
      alert(`Task: ${question} already exists`);
      return;
    }
    const newQuestion = await APIHelperQuestion.createQuestion(question, answer, category_ToAdd);
    console.log(newQuestion)
    console.log(newQuestion);
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = async (e, id) => {
    try {
      e.stopPropagation();
      await APIHelper.deleteTodo(id);
      setTodos(todos.filter(({ _id: i }) => id !== i));
    } catch (err) {}
  };

  const updateQuestion = async (e, id) => {
    e.stopPropagation();
    const payload = {completed: !todos.find(todo => todo._id === id).completed}
    const updatedTodo  = await APIHelper.updateTodo(id, payload);
    setTodos(todos.map((todo)=> todo._id === id ? updatedTodo: todo));
    
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={todo}
          onChange={({ target }) => setTodo(target.value)}
          placeholder="Enter an category"
        />
        <button type="button" onClick={createTodo}>
          Add
        </button>
      </div>  
      <ul>
        {todos.length ? todos.map(({ _id, task }, i) => (
          <li
            key={i}
            onClick={e => updateTodo(e, _id)}
          >
            {task} <span onClick={e => deleteTodo(e, _id)}>X</span>
          </li>
        )): <p>No Questions Yet :(</p>}
      </ul>   
      <div>
      <input
          type="text"
          value={category_ToAdd}
          onChange={({ target }) => setCategory_ToAdd(target.value)}
          placeholder="Enter a category"
        />
        <input
          type="text"
          value={question}
          onChange={({ target }) => setQuestion(target.value)}
          placeholder="Enter an question"
        />
        <input
          type="text"
          value={answer}
          onChange={({ target }) => setAnswer(target.value)}
          placeholder="Enter an answer "
        />
        <button type="button" onClick={createQuestion}>
          Add
        </button>
      </div>
      <div>
        <h1>Выберите категорию:</h1>
        <input
          type="text"
          value={category}
          onChange={({ target }) => setCategory(target.value)}
          placeholder="Enter an question"
        />
        <button type="button" onClick={chooseCategory}>
          Find
        </button>
      </div>
      <ul>
      </ul>
      <ul>
      {questions.length ? questions.map(({ _id, Question, Answer }, i) => (
          <li
            key={i}
            onClick={e => updateTodo(e, _id)}
          >
            {Question} <span onClick={e => deleteTodo(e, _id)}>{Answer}</span>
          </li>
        )): <p>No Questions Yet :(</p>}
      </ul>
    </div>
    
  );
}

export default App;
