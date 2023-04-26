import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask, updateTask } from '../features/tasks/taskSlice'

function TaskItem({ task }) {

  const [text, setText] = useState(task.text);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [priority, setPriority] = useState(task.priority);

  const dispatch = useDispatch()

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      dispatch(deleteTask(task._id));
    }
  };
  const handleUpdateTask = () => {
    const updatedTaskData = {
      dueDate,
      priority,
    };
    dispatch(updateTask({ id: task._id, updatedTaskData }));
  };
  const getBorderColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'blue';
      case 'low':
        return 'yellow';
      default:
        return '';
    }
  };
  const handleTextChange = (e) => {
    const updatedText = e.target.value;
    const updatedTaskData = {
      text: updatedText,
      dueDate,
      priority,
    };
    dispatch(updateTask({ id: task._id, updatedTaskData }));
  };

  return (
    <div className="input-group mb-3">
      <div className="input-group-text"
      style={{ borderColor: getBorderColor(task.priority) }}>
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          className="form-check-input mt-0"
          aria-label="Checkbox for following text input"
        />
      </div>
      <div className="form-control d-flex align-items-center" style={{padding: 0}}>
        <input
          type="text"
          value={task.text}
          className="flex-grow-1 border-0"
          onChange={handleTextChange}
          aria-label="Text input with checkbox"
        />
        <span
          className="px-3"
        >
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString('en-US')
            : ''}
        </span>
      </div>
      <button
        type="button"
        className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split btn-lg"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="visually-hidden">Toggle Dropdown</span>
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <div className="dropdown-item">
            <label htmlFor="dueDate" className="me-2">Due Date</label>
            <input
              type="date"
              name="dueDate"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </li>
        <li>
          <div className="dropdown-item">
            <label htmlFor="priority" className="me-2">Priority</label>
            <select
              name="priority"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button
            className="dropdown-item"
            onClick={handleUpdateTask}
          >
            Update Task
          </button>
        </li>
      </ul>
      <button
        onClick={() => dispatch(deleteTask(task._id))}
        className="btn btn-outline-secondary"
      >
        X
      </button>

    </div>

  )
}

export default TaskItem