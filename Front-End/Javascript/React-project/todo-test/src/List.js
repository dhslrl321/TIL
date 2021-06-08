import React from 'react';
import Item from "./Item";

const List = ({ tasks, onClickDelete }) => {
  return (
    <div>
      {tasks.length === 0 ?
        <span>할 일이 없습니다.</span> :
        tasks.map(task =>
          <Item key={task.id}
            task={task}
            onClickDelete={onClickDelete} />)
      }

    </div>
  )
}

export default List
