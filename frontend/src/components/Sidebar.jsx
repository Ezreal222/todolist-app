import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar-container d-flex flex-column col-3">
      <ul className="list-group">
        <li className="list-group-item list-group-item-action">
          <Link to="/">All Tasks</Link>
        </li>
        <li className="list-group-item list-group-item-action">
          <Link to="/today">Today</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
