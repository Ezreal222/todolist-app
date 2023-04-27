// components/AddList.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createList } from '../features/lists/listSlice';

function AddList() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(createList(name));
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <input
        type="text"
        className="form-control"
        placeholder="Add new list"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" className="btn btn-primary ms-2">
        Add
      </button>
    </form>
  );
}

export default AddList;
