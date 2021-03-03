import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Page from "./Page";

const initialState = {
  newId: 100,
  taskTitle: '',
  tasks: [],
}

const updateTaskTitle = (state, taskTitle) => {
  return {
    ...state,
    taskTitle
  }
}

const addTask = (state) => {
  const { newId, taskTitle, tasks } = state;

  return {
    ...state,
    newId: newId + 1, // ++
    taskTitle: '', // 비워주기 
    tasks: [...tasks, { id: newId, title: taskTitle }],
  }
}

const deleteTask = (state, id) => {

  const { tasks } = state;

  return {
    ...state,
    tasks: tasks.filter(task => task.id !== id)
  }
}



function App() {
  const dispatch = useDispatch();
  const { taskTitle, tasks } = useSelector((state) => ({
    taskTitle: state.taskTitle,
    tasks: state.tasks
  }));

  // todo 제목 변경
  const handleChangeTitle = (e) => {
    dispatch(updateTaskTitle(state, e.target.value));
  }

  // todo 추가
  const handleClickAddTask = () => {
    dispatch(addTask(state));
  }

  // todo 삭제
  const handleClickDeleteTask = (id) => {
    dispatch(deleteTask(state, id));
  }

  return (
    <div>
      <Page
        taskTitle={taskTitle}
        onChangeTitle={handleChangeTitle}
        onClickAddTask={handleClickAddTask}
        onClickDeleteTask={handleClickDeleteTask}
        tasks={tasks} />
    </div>
  );
}

export default App;
