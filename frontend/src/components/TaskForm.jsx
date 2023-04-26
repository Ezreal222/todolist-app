import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTask } from '../features/tasks/taskSlice'

function TaskForm() {
  const [text, setText] = useState('')
  const [dueDate, setDueDate] = useState(null)
  const [priority, setPriority] = useState('')

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    const taskData = {
      text,
    };

    if (dueDate) {
      taskData.dueDate = dueDate;
    }

    if (priority) {
      taskData.priority = priority;
    }
    dispatch(createTask(taskData));
    //dispatch(createTask({ text, dueDate, priority }))
    setText('')
    setDueDate(null)
    setPriority('')
  }

  return (
    <form className="input-group my-2" onSubmit={onSubmit}>
      <input
        type="text"
        className="form-control"
        name='text'
        id='text'
        placeholder='Task name'
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Text input with segmented dropdown button"
      />
      <button type="submit" className="btn btn-outline-secondary btn-lg">
        Add Task
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="visually-hidden">Toggle Dropdown</span>
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <div className="dropdown-item">
            <label htmlFor='dueDate'>Due Date</label>
              <input
                type='date'
                name='dueDate'
                id='dueDate'
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
          </div>
        </li>
        <li>
          <div className="dropdown-item">
              <label htmlFor='priority'>Priority</label>
              <select
                name='priority'
                id='priority'
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value=''>Select priority</option>
                <option value='low'>Low</option>
                <option value='medium'>Medium</option>
                <option value='high'>High</option>
              </select>
          </div>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Something else here
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Separated link
          </a>
        </li>
      </ul>
    </form>

  )
}

export default TaskForm