import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TaskForm from '../components/TaskForm'
import TaskItem from '../components/TaskItem'
import Spinner from '../components/Spinner'
import { getTasks, reset, getTasksDueToday } from '../features/tasks/taskSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  )
  const [tasksDueToday, setTasksDueToday] = useState([])

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  
    dispatch(getTasks());
  
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  return (
    <section className='p-1 d-flex'>
      <div className='row col'>
        <TaskForm />
        <section className='content'>
          {tasks.length > 0 ? (
            <div className='d-flex-column'>
              {tasks.map((task) => (
                <TaskItem key={task._id} task={task} />
              ))}
            </div>
          ) : (
            <h3>Start add some tasks!</h3>
          )}
        </section>
      </div>
    </section>
  )
}

export default Dashboard