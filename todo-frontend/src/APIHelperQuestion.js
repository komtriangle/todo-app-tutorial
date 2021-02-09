import axios from "axios";

const API_URL="http://localhost:3000/questions/"
async function createQuestion(task, answer, category) {
    console.log(task)
  const { data: newTodo } = await axios.post(API_URL, {
    Question: task, Answer: answer, Category: category
  });
  return newTodo;
}

async function deleteQuestion(id) {
  const message = await axios.delete(`${API_URL}${id}`);
  return message;
}

async function updateQuestion(id, payload) {
  const {data:newTodo} = await axios.put(`${API_URL}${id}`, payload);
  return newTodo;
}

async function getAllQuestion(category) {  
  const { data: todos } = await axios.get(API_URL, {
    params: {
      Cat: category
    }});
  return todos;
}

export default { createQuestion, deleteQuestion, updateQuestion, getAllQuestion };