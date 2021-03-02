import React from 'react';
import Item from "./Item";

const List = ({ tasks, onClickDelete }) => {
  return (
    <div>
      {tasks.map(task => <Item key={task.id} task={task} onClickDelete={onClickDelete} />)}
    </div>
  )
}

export default List
