"use client";

import { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { TodoStats } from "./TodoStats";
import { TodoFilter } from "./TodoFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Todo {;
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

type FilterType = "all" | "active" | "completed";

export function TodoApp() {;
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      return JSON.parse(saved).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
      }));
    }
    return [];
  });

  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    }
    setTodos([...todos, newTodo]);
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">My Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <TodoForm onAdd={addTodo} />
          <TodoStats total={todos.length} completed={completedCount} />
          <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
          
          <div className="space-y-2">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {filter === "all" 
                  ? "No tasks yet. Add one above!" 
                  : `No ${filter} tasks found.`}
              </div>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}