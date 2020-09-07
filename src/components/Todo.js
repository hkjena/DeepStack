import React, { useState, useEffect } from 'react';

import { getTodos, createTodo, deleteTodo, updateTodo } from '../API';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Todo = () => {
  const [input, setInput] = useState('');

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const get = async () => {
      const data = await getTodos();
      setTodos(data);
    };
    get();
  }, []);

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handelChecked = async id => {
    const cindex = todos.findIndex(x => x.id === id);
    const todosCopy = [...todos];
    todosCopy[cindex].checked = !todosCopy[cindex].checked;
    const [targetTodo] = todosCopy.filter(todo => todo.id === id);
    updateTodo(targetTodo);
    setTodos(todosCopy);
  };

  const handelSubmit = async e => {
    e.preventDefault();
    const data = await createTodo({
      name: input,
      checked: false,
    });
    const todo = [...todos, data];
    setTodos(todo);
    setInput('');
  };

  const handelDelete = async id => {
    await deleteTodo(id);
    const filteredTodos = todos.filter(todo => todo.id !== id);
    console.log(filteredTodos);
    setTodos(filteredTodos);
  };

  return (
    <>
      <form onSubmit={handelSubmit}>
        <TextField
          id='outlined-basic'
          label='Enter your Todo'
          variant='outlined'
          required
          value={input}
          name='todo'
          onChange={handleChange}
        />
        <Button variant='contained' type='submit' color='primary'>
          Primary
        </Button>
      </form>
      <div>
        {!!todos.length &&
          todos.map(({ id, name, checked }) => (
            <div key={id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={() => handelChecked(id)}
                    name='checkedB'
                    color='primary'
                  />
                }
                label={name}
              />
              <button
                style={{ cursor: 'pointer' }}
                onClick={() => handelDelete(id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Todo;
