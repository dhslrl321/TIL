import React from 'react'

const Item = ({ task: { title, id }, onClickDelete }) => {
  return (
    <li>
      {title}
      <button type="button" onClick={() => onClickDelete(id)}>
        완료
      </button>
    </li>
  )
}

export default Item
