import { useState, useEffect } from "react"
import "./TodoList.css"

export default function AddTodoList({
  todoList,
  onTodoListChange
}: {
  todoList: string,
  onTodoListChange: (text: string) => void
}) {
  const [instructions, setInstructions] = useState(todoList || "")

  useEffect(() => {
    setInstructions(todoList || "")
  }, [todoList])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInstructions(value)
    onTodoListChange(value)
  }

  return (
    <div className="todo-container">
      <label className="todo-label">Инструкция по приготовлению</label>
      <div className="todo-input-container">
        <textarea
          className="todo-textarea"
          value={instructions}
          onChange={handleChange}
          placeholder="Опишите шаги приготовления..."
          rows={8}
          required
        />
      </div>
    </div>
  )
}