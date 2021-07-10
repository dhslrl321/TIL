import React from 'react'

import Input from "./Input";
import List from "./List";

const Page = ({ taskTitle, onChangeTitle, onClickAddTask, onClickDeleteTask, tasks }) => {
  return (
    <div>
      <h1>To-do</h1>
      <Input value={taskTitle} onChange={onChangeTitle} onClick={onClickAddTask} />
      <List tasks={tasks} onClickDelete={onClickDeleteTask} />
    </div>
  )
}

export default Page
