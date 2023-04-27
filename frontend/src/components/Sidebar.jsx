import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import ListItem from './ListItem';
import AddList from './AddList';
import { reset, fetchLists } from '../features/lists/listSlice';


function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { lists } = useSelector((state) => state.lists);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  
    dispatch(fetchLists());
  
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);
  
  return (
    <div className="sidebar-container d-flex flex-column col-3">
      <ul className="list-group">
        <li className="list-group-item list-group-item-action">
          <Link to="/"><i className="fa-solid fa-inbox mx-2"></i>All Tasks</Link>
        </li>
        <li className="list-group-item list-group-item-action">
          <Link to="/today"><i className="fa-solid fa-calendar-week mx-2"></i>Today</Link>
        </li>
        <li className="list-group-item list-group-item-action">
          <Link to="/calendar"><i className="fa-solid fa-calendar mx-2"></i>Calendar</Link>
        </li>

        <AddList />
        {lists.map((list) => (
          <ListItem key={list._id} list={list} />
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
