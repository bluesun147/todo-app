import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';
import { useCallback, useState } from 'react/cjs/react.development';

const TodoListItem = ({todo, onRemove, onToggle}) => { // 파라미터로
    const {id, text, checked} = todo;
    return (
        <div className='TodoListItem' >
            <div className = {cn('checkbox', {checked})} onClick = {() => onToggle(id)}>
                {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                <div className='text'>{text}</div>
                </div>
                {/*삭제 버튼 누르면 onRemove함수에 현재 자신이 가진 id넣어서 삭제 함수 호출*/}
                <div className='remove' onClick = {() => onRemove(id)}> 
                    <MdRemoveCircleOutline />
                </div>
            </div>
    );
};

export default React.memo(TodoListItem);