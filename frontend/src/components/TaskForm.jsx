import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTask } from '../features/tasks/taskSlice'

function TaskForm({defaultDueDate}) {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState(defaultDueDate || null);
  const [priority, setPriority] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      text,
    };

    if (dueDate) {
    const localDate = new Date(dueDate);
    const timezoneOffsetInMilliseconds = localDate.getTimezoneOffset() * 60 * 1000;
    const adjustedDate = new Date(localDate.getTime() + timezoneOffsetInMilliseconds);
    taskData.dueDate = adjustedDate.toISOString();
  }

    if (priority) {
      taskData.priority = priority;
    }
    dispatch(createTask(taskData));
    setText('');
    setDueDate(defaultDueDate || null);
    setPriority('');
  };


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
        <i class="fa-solid fa-plus mr-2"></i>Add Task
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
      </ul>
    </form>

  )
}

export default TaskForm