import React, {useState, useMemo, useCallback} from 'react';

const getAverage = numbers => { // numbers는 리스트
    console.log('계산 중...');
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((a, b) => a + b); // 리스트의 원소 다 더함
    return sum / numbers.length; // 평균
};

const Average = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState('');

    const onChange = useCallback(e => {
        setNumber(e.target.value);
    }, []); // 컴포넌트가 처음 렌더링 될 때만 함수 생성

    const onInsert = useCallback(() => { // usecallback의 첫 파라미터에는 생성하고 싳은 함수
        const nextList = list.concat(parseInt(number));
        setList(nextList);
        setNumber('');
        // 두번째는 배열
        // 배열에 어떤 값이 바뀌었을때 함수 새로 생성해야 하는지 명시
    }, [number, list]); // number 혹은 list가 바뀌었을때만 함수 생성

    /*const onInsert = e => { // 등록 누르면 입력값 리스트에 삽입됨
        const nextList = list.concat(parseInt(number)); // 입력값을 리스트에 concat으로 붙힘
        setList(nextList); // 새로만든 리스트를 리스트로 설정
        setNumber('');
    };*/

    const avg = useMemo(() => getAverage(list), [list]);

    return (
        <div>
            <input value = {number} onChange = {onChange} />
            <button onClick = {onInsert}>등록</button>
            <ul>
                {list.map((value, index) => {
                    <li key = {index}>{value}</li>
                })}
            </ul>
            <div>
                평균값: {avg}
            </div>
        </div>
    )
}

export default Average;