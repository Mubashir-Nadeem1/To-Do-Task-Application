import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [filter, setFilter] = useState('all');

  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = tasks.length - completedTasks;
  const progress = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return !task.completed;
    }

    if (filter === 'completed') {
      return task.completed;
    }

    return true;
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTask = taskText.trim();

    if (!trimmedTask) {
      return;
    }

    if (editingTaskId) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTaskId ? { ...task, text: trimmedTask } : task
        )
      );
      setEditingTaskId(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: trimmedTask,
        completed: false,
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
      };

      setTasks([...tasks, newTask]);
    }

    setTaskText('');
  };

  const handleEditTask = (task) => {
    setTaskText(task.text);
    setEditingTaskId(task.id);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));

    if (editingTaskId === taskId) {
      setEditingTaskId(null);
      setTaskText('');
    }
  };

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setTaskText('');
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return (
    <main className="app">
      <section className="todo-panel" aria-labelledby="app-title">
        <div className="todo-header">
          <div>
            <p className="eyebrow">React JS Task Manager</p>
            <h1 id="app-title">Daily Focus Board</h1>
            <p className="subtitle">Plan your work, track progress, and finish with clarity.</p>
          </div>

          <div className="progress-card" aria-label={`${progress}% completed`}>
            <span>{progress}%</span>
            <p>Completed</p>
          </div>
        </div>

        <div className="stats-grid" aria-label="Task summary">
          <article>
            <span>{tasks.length}</span>
            <p>Total tasks</p>
          </article>
          <article>
            <span>{activeTasks}</span>
            <p>Active</p>
          </article>
          <article>
            <span>{completedTasks}</span>
            <p>Done</p>
          </article>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={taskText}
            onChange={(event) => setTaskText(event.target.value)}
            placeholder="Add a priority task..."
            aria-label="Task text"
          />
          <button type="submit">{editingTaskId ? 'Update' : 'Add'}</button>
          {editingTaskId && (
            <button className="secondary-button" type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          )}
        </form>

        <div className="toolbar" aria-label="Task filters">
          <div className="filter-tabs">
            {['all', 'active', 'completed'].map((filterName) => (
              <button
                className={filter === filterName ? 'active-filter' : ''}
                key={filterName}
                type="button"
                onClick={() => setFilter(filterName)}
              >
                {filterName}
              </button>
            ))}
          </div>

          <button
            className="clear-button"
            type="button"
            onClick={handleClearCompleted}
            disabled={completedTasks === 0}
          >
            Clear done
          </button>
        </div>

        <ul className="task-list">
          {visibleTasks.length === 0 ? (
            <li className="empty-state">
              {tasks.length === 0
                ? 'No tasks yet. Add your first priority above.'
                : `No ${filter} tasks to show.`}
            </li>
          ) : (
            visibleTasks.map((task) => (
              <li className="task-item" key={task.id}>
                <label className="task-check">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task.id)}
                  />
                  <span className={task.completed ? 'completed' : ''}>
                    {task.text}
                    <small>{task.completed ? 'Completed' : `Added ${task.createdAt || 'today'}`}</small>
                  </span>
                </label>

                <div className="task-actions">
                  <button type="button" onClick={() => handleEditTask(task)}>
                    Edit
                  </button>
                  <button
                    className="danger-button"
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
}

export default App;
