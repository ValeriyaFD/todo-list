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
    timers: {}
  };

  componentWillUnmount() {
    Object.values(this.state.timers).forEach(timer => {
      if (timer && timer.intervalId) {
        clearInterval(timer.intervalId);
      }
    });
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => el.id !== id);
      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text, minutes, seconds) => {
    const { maxId } = this.state;
    const newItem = {
      description: text,
      completed: false,
      onEditing: false,
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
      date: new Date(),
      id: maxId + 1,
    };

    this.setState((prevState) => ({
      todoData: [...prevState.todoData, newItem],
      maxId: prevState.maxId + 1,
    }));
  };

  deleteCompleted = () => {
    this.setState(({ todoData, timers }) => {
      const newArray = todoData.filter((todo) => !todo.completed);

      const newTimers = Object.keys(timers).reduce((acc, key) => {
        if (newArray.some((todo) => todo.id === Number(key))) {
          acc[key] = timers[key];
        } else if (timers[key].intervalId) {
          clearInterval(timers[key].intervalId);
        }
        return acc;
      }, {});

      return {
        todoData: newArray,
        timers: newTimers,
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
          return { ...item, completed: !item.completed, minutes:'00', seconds:'00'};
        }
        return item;
      }),
    }));
    this.stopTimer(id);
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

// Здесь реализую запуск таймера
startTimer = (id) => {
  this.setState((prevState) => {
    const todo = prevState.todoData.find((t) => t.id === id);

    const totalSeconds = parseInt(todo.minutes) * 60 + parseInt(todo.seconds);

    const intervalId = setInterval(() => {
      this.setState((prev) => {
        const currentTimer = prev.timers[id];
        if (!currentTimer || !currentTimer.isRunning) {
          clearInterval(intervalId);
          return null;
        }

        let newTotalSeconds = currentTimer.totalSeconds - 0.5;

        if (newTotalSeconds <= 0) {
          clearInterval(intervalId);
          return {
            timers: {
              ...prev.timers,
              [id]: {
                ...currentTimer,
                isRunning: false,
                intervalId: null,
                totalSeconds: 0,
              },
            },
            todoData: prev.todoData.map((item) =>
              item.id === id ? { ...item, minutes: '00', seconds: '00' } : item
            ),
          };
        }

        const newMinutes = Math.floor(newTotalSeconds / 60);
        const newSeconds = newTotalSeconds % 60;

        return {
          timers: {
            ...prev.timers,
            [id]: {
              ...currentTimer,
              totalSeconds: newTotalSeconds,
            },
          },
          todoData: prev.todoData.map((item) =>
            item.id === id
              ? {
                  ...item,
                  minutes: String(newMinutes).padStart(2, '0'),
                  seconds: String(newSeconds).padStart(2, '0'),
                }
              : item
          ),
        };
      });
    }, 1000);

    return {
      timers: {
        ...prevState.timers,
        [id]: {
          isRunning: true,
          intervalId,
          totalSeconds,
        },
      },
    };
  });
};

pauseTimer = (id) => {
  this.setState((prevState) => {
    const timer = prevState.timers[id];

    clearInterval(timer.intervalId);
    return {
      timers: {
        ...prevState.timers,
        [id]: {
          ...timer,
          isRunning: false,
          intervalId: null,
        },
      },
    };
  });
};

stopTimer = (id) => {
  this.setState((prevState) => {
    const timer = prevState.timers[id];

    if (timer.intervalId) {
      clearInterval(timer.intervalId);
    }

    return {
      timers: {
        ...prevState.timers,
        [id]: {
          isRunning: false,
          intervalId: null,
          totalSeconds: 0,
        },
      },
      todoData: prevState.todoData.map((item) =>
        item.id === id ? { ...item, minutes: '00', seconds: '00' } : item
      ),
    };
  });
};

  render() {
    const { todoData, filter, timers } = this.state;
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
          timers={timers}
          onStartTimer={this.startTimer}
          onPauseTimer={this.pauseTimer}
          onStopTimer={this.stopTimer}
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
