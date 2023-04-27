import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar-container d-flex flex-column col-3 border border-primary">
 
      <ul className="list-group ">
        <li className="list-group-item list-group-item-action">
          <Link to="/"><i class="fa-solid fa-inbox mx-2"></i>All Tasks</Link>
        </li>
        <li className="list-group-item list-group-item-action">
          <Link to="/today"><i class="fa-solid fa-calendar-week mx-2"></i>Today</Link>
        </li>
      </ul>

    </div>
  );
}

export default Sidebar;
