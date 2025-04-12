import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import './TodoApp.css';

export default class TodoApp extends Component {
  state = {
    todoData: [],
    filter: 'all',
    maxId: 100,
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => el.id !== id);
      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    const { maxId } = this.state;
    const newItem = {
      description: text,
      completed: false,
      onEditing: false,
      date: new Date(),
      id: maxId + 1,
    };

    this.setState((prevState) => ({
      todoData: [...prevState.todoData, newItem],
      maxId: prevState.maxId + 1,
    }));
  };

  deleteCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((todo) => !todo.completed);
      return {
        todoData: newArray,
      };
    });
  };

  // eslint-disable-next-line class-methods-use-this
  filter = (items, filterValue) => {
    switch (filterValue) {
      case 'active':
        return items.filter((item) => !item.completed);
      case 'completed':
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  };

  onFilterChange = (filter) => this.setState({ filter });

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => {
        if (item && item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      }),
    }));
  };

  editItem = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              onEditing: true,
            }
          : todo
      ),
    }));
  };

  handleSave = (id, newDescription) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((todo) =>
        todo.id === id ? { ...todo, description: newDescription, onEditing: false } : todo
      ),
    }));
  };

  render() {
    const { todoData, filter } = this.state;
    const visibleTodos = this.filter(todoData, filter);
    const doneCount = todoData.filter((el) => !el.completed).length;
    return (
      <section className="todoapp">
        <header>
          <h1>Todos</h1>
          <NewTaskForm addItem={this.addItem} />
        </header>
        <TaskList
          date={todoData.date}
          todos={visibleTodos}
          onEdit={this.editItem}
          onDelete={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onSave={this.handleSave}
        />
        <Footer
          done={doneCount}
          deleteCompleted={this.deleteCompleted}
          filter={this.filter}
          onFilterChange={this.onFilterChange}
        />
      </section>
    );
  }
}
