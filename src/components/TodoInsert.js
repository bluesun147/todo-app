import React , {useState, useCallback} from 'react';
import {MdAdd} from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({onInsert}) => {
    const [value, setValue] = useState('');

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    const onSubmit = useCallback(e => { // 이 함수 호출되면 props로 받아 온 
        // onInsert 함수에 현재 value값을 파라미터로 넣어서 호출하고 현재 value값 초기화 함
        onInsert(value);
        setValue(''); // value값 초기화
        // submit 이벤트는 브라우저 새로고침 발생 시킴
        e.preventDefault(); // 이를 방지하기 위해 이 함수 호출
    }, [onInsert, value]); // 함수안에 사용하는 상태/props 있다면 꼭 deps배열에 포함시켜야 함

    const onClick = useCallback(
        () => {
          onInsert(value);
          setValue(''); // value 값 초기화
        },
        [onInsert, value],
      );

    return (
        // 클릭 이벤트로만으로 할 수 있는데 form과 onSubmit 이벤트
        // 사용한 이유는 onSubmit 이벤트의 경우 인풋에서 Enter 눌렀을때도 발생하기 때문
        // onClick 사용하려면 enter 감지 로직 따로 또 만들어야 함
        <form className='TodoInsert' onSubmit={onSubmit}>>
            <input 
            placeholder = "할 일을 입력하세요"
            value ={value}
            onChange = {onChange}
            />
            <button type='submit'>
                <MdAdd /> {/*react-icons의 아이콘 사용 */}
            </button>
        </form>
    );
};

export default TodoInsert;