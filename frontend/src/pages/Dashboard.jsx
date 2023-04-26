import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import TaskForm from '../components/TaskForm'
import TaskItem from '../components/TaskItem'
import Spinner from '../components/Spinner'
import { getTasks, reset } from '../features/tasks/taskSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  )

  /*
  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }
    else {
      dispatch(getTasks())
    }
    //dispatch(getTasks())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])*/
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
  /*
  useEffect(() => {
  if (isError) {
    console.log(message);
  }
  }, [isError, message]);
  */
  /*
  if (isLoading) {
    return <Spinner />
  }
  */

  return (
    <section className='p-1'>
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
    </section>
  )
}

export default Dashboard