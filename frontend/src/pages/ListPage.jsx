import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import { getTasks, reset } from "../features/tasks/taskSlice";
import Sidebar from "../components/Sidebar";

function ListPage() {
  const { listId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );

  const [sortType, setSortType] = useState("none");
  
  const sortTasks = (tasks, type) => {
    if (type === "none") {
      return tasks;
    }

    return [...tasks].sort((a, b) => {
      if (type === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (type === "priority") {
        const priorityOrder = { low: 3, medium: 2, high: 1, undefined: 4 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
    });
  };
  const filterTasksByList = (tasks, listId) => {
    return tasks.filter((task) => task.list && task.list === listId);
  };
  const filteredTasks = filterTasksByList(tasks, listId);
  const sortedTasks = sortTasks(filteredTasks, sortType);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  
    dispatch(getTasks());
  
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, listId]);
  return (
    <section className="p-1 d-flex">
      <Sidebar />
      <div className="row col mx-2">
        <TaskForm listId={listId} />
        <section className="content">
            <div className="d-flex justify-content-between align-items-center">
              <h2>List Tasks</h2>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sort by: {sortType}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => setSortType("none")}
                      >
                        None
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => setSortType("dueDate")}
                      >
                        Due Date
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => setSortType("priority")}
                      >
                        Priority
                      </button>
                    </li>
                  </ul>
                </div>
            </div>
          {sortedTasks.length > 0 ? (
            <div className="d-flex-column">
              {sortedTasks.map((task) => (
                <TaskItem key={task._id} task={task} />
              ))}
            </div>
          ) : (
            <h3>Start adding some tasks to this list!</h3>
          )}
        </section>
      </div>
    </section>
  );
}

export default ListPage;
