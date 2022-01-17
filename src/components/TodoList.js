import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({todos, onRemove, onToggle}) => {
    return (
        /*
        props로 받아온 todos 배열을 map 통해 TodoListItem으로 이뤄진 
        배열로 변환해 렌더링.
        key로는 고유값인 id
        todo 데이터는 통째로 props로 전달
        여러 종류의 값 전달해야 하는 경우에는 객체 통쨰로
        전달하는 편이 좋다
        */
        <div className = 'TodoList'>
            {todos.map(todo => (
                // props로 받아온 값 TodoListItem으로 전달
                <TodoListItem todo = {todo} key = {todo.id} onRemove = {onRemove} onToggle = {onToggle}/>
            ))}
        </div>
    );
};

export default TodoList;