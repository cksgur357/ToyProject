//TodoInsert.js

import React, { useCallback, useState } from 'react'
import {MdAdd} from 'react-icons/md'
import './TodoInsert.scss'

const TodoInsert = ({onInsert}) => {
    const [value,setValue] =useState('');
    const onChange = useCallback((e)=>{
        setValue(e.target.value);
    },[]);

    const onSubmit = useCallback(
        (e)=>{
            onInsert(value); // 현재useState를 통해 관리하고있는 value값을 인자로 전달
            setValue('')//value값 초기화
            e.preventDefault();//============================================(1)
        },
        [onInsert,value],
    )

    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input placeholder="할 일을 입력하세요" value={value} onChange={onChange}/>
            <button type="submit">
                <MdAdd/>
            </button>
        </form>
    )
}

export default TodoInsert

