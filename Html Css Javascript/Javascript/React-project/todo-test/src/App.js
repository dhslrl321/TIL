import React, { useState } from 'react';
import Page from "./Page";

function App() {

  const [state, setState] = useState({
    newId: 100,
    taskTitle: '',
    tasks: [],
  })
  const { newId, taskTitle, tasks } = state;

  // todo 제목 변경
  const handleChangeTitle = (e) => {
    setState({
      ...state,
      taskTitle: e.target.value,
    });
  }

  // todo 추가
  const handleClickAddTask = () => {
    setState({
      ...state,
      newId: newId + 1,
      taskTitle: '',
      tasks: [...tasks, { id: newId, title: taskTitle }],
    })
  }

  // todo 삭제
  const handleClickDeleteTask = (id) => {
    setState({
      ...state,
      tasks: tasks.filter(task => task.id !== id),
    });
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
