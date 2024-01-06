'use client'
import './App.css';
import React, { useEffect } from 'react';
import { SearchElement } from '@tryferos/search';


function App() {
  const [todos, setTodos] = React.useState([]);
  useEffect(() => {
    fetch('https://dummyjson.com/todos').then(res => res.json()).then(data => setTodos(data.todos));
    console.log(todos)

  }, [])
  return (
    <div className='h-[150%]'>hello world</div>
  );
}

export default App;
