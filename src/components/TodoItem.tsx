import React, { useState } from "react";
import {type Todo} from "../reducers/todoReducer"
import { useTodo } from "../contexts/TodoContext";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger } from "./ui/alert-dialog";
import { Pencil, Trash2,Check,X } from "lucide-react";
type TodoItemProps = {
    todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({
    todo
}) =>{
    const { toggleTodo,deleteTodo,editTodo } = useTodo(); 
    const [isEditing,setIsEditing] = useState<boolean>(false);

    const [editingText,setEditingText] = useState<string>(todo.text);

    // 編集内容を保存する関数
    const handleSave = () => {
        if(editingText.trim() === "") return;
        editTodo(todo.id,editingText)
        setIsEditing(false);
    }

    //編集をキャンセルする関数
    const handleCancelEditing = () => {
        setIsEditing(false);
        setEditingText(todo.text);
      }
    
    const handleDelete = () => {
        const confirmDelete = window.confirm("本当にこのタスクを削除しますか？")
        if(confirmDelete){
            deleteTodo(todo.id)
        }
    }

    return (
        <li key={todo.id} className={`flex items-center rounded-md border p-3 m-2 transition-colors ${
            todo.completed ? "bg-muted/50" : "bg-background"
          }`}>
          <input
              type="checkbox" 
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onChange={()=> toggleTodo(todo.id)
              }
              className="text-2xl"
              />
          {/* 編集モードかどうか判定 */}
          { isEditing ?(
            <>
              <Input 
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
               />
               <Button type="button" onClick={handleSave} className="mr-2"> <Check className="h-2 w-2" /></Button>
               <Button type="button"
               onClick={handleCancelEditing}
               ><X className="h-4 w-4" /></Button>
              
            </>
          ) :(
            <>
            <span style={{ textDecoration: todo.completed ? "line-through" :"none"}}>{todo.text}</span>
            <Button size="icon" onClick={() => setIsEditing(true)} className="mr-3"><Pencil className="h-2 w-2" /></Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
                  <AlertDialogDescription>
                    この操作は元に戻せません。タスク「{todo.text}」が完全に削除されます。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-white hover:text-gray-300">キャンセル</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteTodo(todo.id)}>
                    削除
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            </>
          )}
          
          </li>
    )
}
export default TodoItem