import React from 'react';
import CalendarComponent from '../components/CalendarComponent';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar";




function CalendarPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, message } = useSelector(
      (state) => state.tasks
  );

  return (
    <section className="p-1 d-flex">
      <Sidebar />
      <div className="row col mx-2">
        <h1>Calendar</h1>
        <CalendarComponent tasks={tasks} />
      </div>
    </section>
  );
}

export default CalendarPage;
