import { useDispatch } from 'react-redux'
import { deleteTask } from '../features/tasks/taskSlice'

function TaskItem({ task }) {
  const dispatch = useDispatch()
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      dispatch(deleteTask(task._id));
    }
  };

  return (
    <div className='task'>
      <div>{new Date(task.createdAt).toLocaleString('en-US')}</div>
      <h2>{task.text}</h2>
      <div>
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString('en-US')
          : ''}
      </div>
      <div>{task.priority}</div>
      <button onClick={() => dispatch(deleteTask(task._id))} className='close'>
        X
      </button>
            <input
        type="checkbox"
        onChange={handleCheckboxChange}
        className="task-checkbox"
      />
    </div>
  )
}

export default TaskItem