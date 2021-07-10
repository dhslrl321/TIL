import React from 'react'

const Input = ({ value, onChange, onClick }) => {
  return (
    <p>
      <label htmlFor="input-task-title">
        할 일
      </label>
      <input
        id="input-task-title"
        type="text:"
        placeholder="할 일을 입력하쇼"
        value={value}
        onChange={onChange} />
      <button type="button" onClick={onClick}>
        추가
      </button>
    </p>
  )
}

export default Input
