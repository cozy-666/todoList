// タスクの型定義
export type Todo = {
    id: number;
    text: string;
    completed: boolean; // "compoleted" のタイポを修正
  };
  
  // アクションの型定義
  export type TodoAction =
    | { type: "ADD_TODO"; text: string }
    | { type: "TOGGLE_TODO"; id: number }
    | { type: "DELETE_TODO"; id: number }
    | { type: "EDIT_TODO"; id: number; text: string };
  
  // Reducer関数: アクションの種類に応じて状態をどう変更するかを定義
  export const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
    switch (action.type) {
      case "ADD_TODO":
        return [
          ...state,
          {
            id: Date.now(), // 一意なIDを生成
            text: action.text,
            completed: false,
          },
        ];
      case "TOGGLE_TODO":
        return state.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        );
      case "DELETE_TODO":
        return state.filter((todo) => todo.id !== action.id);
      case "EDIT_TODO":
        return state.map((todo) =>
          todo.id === action.id ? { ...todo, text: action.text } : todo
        );
      default:
        return state;
    }
  };
  