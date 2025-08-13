import React,{ createContext, useContext, useEffect, useReducer,  type ReactNode } from "react";
import {todoReducer,type Todo } from "../reducers/todoReducer";
import { useLocalStorage } from "../hooks/useLocalStorage";

// コンテキストが持つ値の型
type TodoContextType = {
    todos:Todo[],
    addTodo: (text:string)=> void
    toggleTodo: (id:number)=> void
    deleteTodo: (id:number)=> void
    editTodo: (id:number,text:string)=> void
    incompleteTodoCount: number
}


// コンテキストを作成(default: undefined)
export const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Provider コンポーネントを定義
type TodoProviderProps = {
    children: ReactNode
}

export const TodoProvider: React.FC<TodoProviderProps> = ({children}) => {
    // 1.useLocalStorageから初期値とセッターを取得
    const [initialTodos,setStoredTodos] = useLocalStorage<Todo[]>("todos",[]);
    console.log(initialTodos);
    // 2.useReducerの初期値→ローカルストレージの値に変更
    const [todos,dispatch] = useReducer(todoReducer,initialTodos);

    //3.todosの状態が変更されたら、ローカルストレージに更新を加える
    useEffect(() => {
        setStoredTodos(todos);
    },[todos,setStoredTodos])

    const addTodo = (text:string) => dispatch({type:"ADD_TODO", text});
    const toggleTodo = (id:number) => dispatch({type:"TOGGLE_TODO",id});
    const deleteTodo = (id:number) => dispatch({type:"DELETE_TODO",id});
    const editTodo = (id:number,text:string) => dispatch({type:"EDIT_TODO",id,text});
    
    //未完了のタスク数をカウントする
    const incompleteTodoCount = todos.filter((todo) => !todo.completed).length

    const value = {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        incompleteTodoCount
    }
    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
};

// コンテキストを簡単に利用するためのカスタムフッ
export const useTodo = (): TodoContextType => {
    const context = useContext(TodoContext);

    if (!context){
        throw new Error("useTodoは必ずTodoProviderの中で使ってください！")
    }

    return context;
}