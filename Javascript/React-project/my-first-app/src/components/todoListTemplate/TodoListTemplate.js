import React from 'react';
import './TodoListTemplate.css';


const TodoListTemplate = ({ form, children, login }) => {
    return (
        <main>

            <div className="todo-list-template">
                <section>
                    {login}
                </section>
                <div className="title">
                    React로 구현한 Todo List
                </div>
                <section className="form-wrapper">
                    {form}
                </section>
                <section className="todos-wrapper">
                    {children}
                </section>
            </div>
        </main>
    )
}

export default TodoListTemplate;