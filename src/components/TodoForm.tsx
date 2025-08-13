import React,{useState} from "react";
import { useTodo } from "../contexts/TodoContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const TodoForm: React.FC = () => {
    const { addTodo } = useTodo();
    const [newTodo, setNewTodo] = useState<string>("");

    const handleAddTodo =(e: React.FormEvent) => {
        e.preventDefault();
        if(newTodo.trim() === "") return;
            addTodo(newTodo)
            setNewTodo("");
        }

    return (
        <>
            <form onSubmit={handleAddTodo} className="flex w-full items-center space-x-2">
            <Input type="text" value={newTodo} id="newTodo" onChange={(e) => setNewTodo(e.target.value)}
            className="" />
            <Button type="submit">
                <Plus className="mr-2 h-2 w-2" />追加
            </Button>
            </form>
        </>
    )
}

export default TodoForm