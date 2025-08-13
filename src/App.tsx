import React from 'react'
import './App.css'
import TodoApp from "./components/TodoApp"
import { TodoProvider } from './contexts/TodoContext'

function App() {
  return (
      <TodoProvider>
        <TodoApp />
      </TodoProvider>
  )
}

export default App
