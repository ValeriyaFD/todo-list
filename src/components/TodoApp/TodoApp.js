import React, { useState, useEffect } from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import './TodoApp.css';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [filtered, setFiltered] = useState(todos);
  const [newTaskText, setNewTaskText] = useState('');

  const newText = (ev) => {
    setNewTaskText(ev.target.value);
  };

  const saveDescription = (todoId, event) => {
    if (event.key === 'Enter') {
      setTodos(
        todos.map((todo) =>
          todo.id === todoId ? { ...todo, description: event.target.value, onEditing: false } : todo
        )
      );
      setNewTaskText('');
    } else if (event.key === 'Escape') {
      setTodos(
        todos.map((todo) => (todo.id === todoId ? { ...todo, description: todo.description, onEditing: false } : todo))
      );
    }
  };

  const todoFiltered = (filter) => {
    if (filter === 'Active') {
      setFiltered(todos.filter((el) => !el.completed));
    } else if (filter === 'Completed') {
      setFiltered(todos.filter((el) => el.completed));
    } else {
      setFiltered(todos);
    }
  };

  useEffect(() => {
    setFiltered(todos);
  }, [todos]);

  const toggleCompleted = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const editTask = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, onEditing: true, editingText: todo.description } : { ...todo, onEditing: false }
      )
    );
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <section className="todoapp">
      <NewTaskForm todos={todos} setTodos={setTodos} nextId={nextId} setNextId={setNextId} />
      <TaskList
        todos={filtered}
        newText={newText}
        newTaskText={newTaskText}
        onSetFiltered={setFiltered}
        onToggleCompleted={toggleCompleted}
        onEdit={editTask}
        onDelete={deleteTask}
        onSaveDescription={saveDescription}
        setTodos={setTodos}
      />
      <Footer todos={filtered} setTodos={setTodos} onTodoFiltered={todoFiltered} />
    </section>
  );
}
