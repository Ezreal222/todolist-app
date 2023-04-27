import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import { reset, getTasksDueToday } from "../features/tasks/taskSlice";
import Sidebar from "../components/Sidebar";

function Today() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  
    dispatch(getTasksDueToday());
  
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);


  return (
    <section className="p-1 d-flex">
      <Sidebar />
      <div className="row col">
        <TaskForm defaultDueDate={todayDate} />
        <section className="content">
          <h2>Tasks Due Today</h2>
          {tasks.length > 0 ? (
            <div className="d-flex-column">
              {tasks.map((task) => (
                <TaskItem key={task._id} task={task} />
              ))}
            </div>
          ) : (
            <h3>No tasks due today!</h3>
          )}
        </section>
      </div>
    </section>
  );
}

export default Today;
