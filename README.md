# To-Do List Application (React JS)

This project is a simple React JS to-do list application built with functional components, `useState`, JSX, and React event handlers.

## Step 1: Project Setup

The app was created with Vite and React.

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal, usually:

```bash
http://127.0.0.1:5173/
```

## Step 2: Main Files

- `index.html` contains the root HTML element.
- `src/main.jsx` connects React to the page.
- `src/App.jsx` contains the main To-Do application component.
- `src/style.css` contains the styling.

## Step 3: State Management

The app uses `useState` for:

- `tasks`: stores all tasks.
- `taskText`: stores the text typed in the input.
- `editingTaskId`: tracks which task is being edited.

## Step 4: Add Tasks

When the form is submitted, the app creates a new task object:

```js
{
  id: Date.now(),
  text: trimmedTask,
  completed: false
}
```

The task is added to the `tasks` array with `setTasks`.

## Step 5: Edit Tasks

Clicking `Edit` puts the selected task text back into the input. Submitting the form updates that task in the array.

## Step 6: Delete Tasks

Clicking `Delete` filters the selected task out of the `tasks` array.

## Step 7: Mark Completed

The checkbox toggles the `completed` value between `true` and `false`. Completed tasks are shown with a line-through style.

## Step 8: Dynamic Rendering

The task list is rendered dynamically with JSX using:

```jsx
tasks.map((task) => (
  <li key={task.id}>...</li>
))
```

## Step 9: Build Check

Run this command before submission:

```bash
npm run build
```

The app should build without errors.
