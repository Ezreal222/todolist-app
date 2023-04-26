import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTask } from '../features/tasks/taskSlice'

function TaskForm() {
  const [text, setText] = useState('')
  const [dueDate, setDueDate] = useState(null)
  const [priority, setPriority] = useState('')
  const [isEditMode, setIsEditMode] = useState(false)


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
  const onEditButtonClick = () => {
    setIsEditMode(!isEditMode)
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Task</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {isEditMode && (
          <>
            <div className='form-group'>
              <label htmlFor='dueDate'>Due Date</label>
              <input
                type='date'
                name='dueDate'
                id='dueDate'
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className='form-group'>
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
          </>
        )}

        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Task
          </button>
        </div>
      </form>
      <button className='btn btn-block btn-edit' onClick={onEditButtonClick}>
        {isEditMode ? 'Hide Edit Form' : 'Edit Task'}
      </button>
    </section>
  )
}

export default TaskForm