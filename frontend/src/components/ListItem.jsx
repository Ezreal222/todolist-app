import React from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { removeList, fetchLists  } from '../features/lists/listSlice';

function ListItem({ list }) {
  const dispatch = useDispatch();
  const handleDeleteList = (id) => {
    dispatch(removeList(id)).then(() => {
      dispatch(fetchLists());
    });
  };

  return (
    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
      <Link to={`/${list._id}`}><i className="fa-solid fa-list-alt mx-2"></i>{list.name}</Link>
      <button
        className="btn btn-sm btn-danger"
        onClick={() => handleDeleteList(list._id)}
      >
        <i className="fa-solid fa-trash"></i>
      </button>
    </li>
  );
}

export default ListItem;
