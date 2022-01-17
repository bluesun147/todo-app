import React, {useReducer, useState, useRef, useCallback} from 'react';

import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';


function createBulkTodos() {
  const array = [];
  for (let i=1; i<=2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch(action.type) {
    case 'INSERT' : // 새로 추가
      return todos.concat(action.todo);

    case 'REMOVE' :
      return todos.filter(todo => todo.id !== action.id);

    case 'TOGGLE' :
      return todos.map(todo => todo.id === action.id ? {...todo, checked: !todo.checked} : todo);

    default:
      return todos;
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos)

  const nextId = useRef(2501); // 고유값으로 사용될 id. ref 사용해 변수 담기

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    dispatch({type: 'INSERT', todo});
    nextId.current += 1; // nextId 1 씩 더하기
  }, []);

  const onRemove = useCallback(id => {
    dispatch({type: 'REMOVE', id});
  }, [],);

  // 수정 기능
  const onToggle = useCallback(id => {
    dispatch({type: 'TOGGLE', id});
  }, []);

  return ( 
    <TodoTemplate>
      <TodoInsert onInsert = {onInsert}/> {/*onInsert 함수를 TodoInsert 컴포넌트의 props로 설정*/}
      <TodoList todos = {todos} onRemove = {onRemove} onToggle = {onToggle}/> {/* onRemove를 TodoList의 props로 설정 */}
    </TodoTemplate>
    );
}

const App_ = () => {
  const [todos, setTodos] = useState(createBulkTodos);/*useState([
    {
      id: 1,
      text: 'aaaa',
      checked: true,
    },
    {
      id: 2,
      text: 'bbbb',
      checked: true,
    },
    {
      id: 3,
      text: 'cccc',
      checked: false
    }
  ]);*/

  // 고유값으로 사용될 id
  // ref 사용해 변수 담기
  const nextId = useRef(2501); // id는 useState 아닌 useRef로 관리.
  // id는 렌더링 되는 정보 아니기 때문에 리렌터링 할 필요 없음

 // todos 배열에 새 객체 추가
 // 새로운 객체 만들때 마다 id값에 1씩 더함
  const onInsert = useCallback(text => {
    // 컴포넌트 성능 아낄 수 있도록 useCallback으로 감싸 줌
    // props로 전달해야 하는 함수 만들때 useCallback으로 감싸는것 습관화 하기
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos(todos => todos.concat(todo));//setTodos(todos.concat(todo));
    nextId.current += 1; // nextId 1씩 더하기
  }, [],); // [todos] 안써도 됨

  // App 컴포넌트에서 id 파라미터로 받아와 같은 id 가진 항목 todos 배열에서 지우는 함수
  const onRemove = useCallback(id => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }, [],);

  // 수정 기능
  const onToggle = useCallback(id => {
    setTodos(todos => todos.map(todo => todo.id === id ? {...todo, checked : !todo.checked} : todo))
  }, []);

  return ( 
  <TodoTemplate>
    <TodoInsert onInsert = {onInsert}/> {/*onInsert 함수를 TodoInsert 컴포넌트의 props로 설정*/}
    <TodoList todos = {todos} onRemove = {onRemove} onToggle = {onToggle}/> {/* onRemove를 TodoList의 props로 설정 */}
  </TodoTemplate>
  );
};

export default App;