import React, { Component } from 'react';
import TodoItem from '../todoItem/TodoItem';
class TodoItemList extends Component{
    render() {
        /**
         * todos : 객체가 들어있는 배열
         * onToggle : 체크박스를 끄고 켜는 함수
         * onRemove : 아이템 삭제 함수
         */
        const { todos, onToggle, onRemove } = this.props;
        const todoList = todos.map(
            ({id, text, checked}) => (
                <TodoItem
                id={id}
                text={text}
                checked={checked}
                onToggle={onToggle}
                onRemove={onRemove}
                key={id}
                />
            )
        )
        return (
            <div>
                {todoList}
            </div>
        );
    }
}

export default TodoItemList;