import axios from 'axios';

export const getTodos = async () => {
  const response = await axios.get(`https://1e2a696c5781.ngrok.io/todos`);
  const todos = await response.data;
  return todos;
};

export const createTodo = async todo => {
  const response = await axios.post(
    `https://1e2a696c5781.ngrok.io/todos`,
    todo
  );
  const newtodo = await response.data;
  return newtodo;
};

export const deleteTodo = async id => {
  await axios.delete(`https://1e2a696c5781.ngrok.io/todos/${id}`);
};

export const updateTodo = async todo => {
  await axios.patch(`https://1e2a696c5781.ngrok.io/todos/${todo.id}`, todo);
};
