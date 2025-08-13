import React from "react";
import TodoItem from "./TodoItem";
import { useTodo } from "../contexts/TodoContext";

const TodoList: React.FC = () => {
    const { todos } = useTodo();

    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem
                key={todo.id}
                todo={todo}
                />
            ))}
        </ul>
    )
}

export default TodoList