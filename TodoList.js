//TodoList.js

import React, { useCallback } from 'react';
import {List} from 'react-virtualized' // ========================(1)
import TodoListItem from './TodoListItem';
import './TodoList.scss';

//app에서 todos를정의한것을 아래에 넣어줘서 받아옴
const TodoList = ({todos,onRemove, onToggle}) => {

    const rowRenderer = useCallback(
        ({index,key,style})=>{
            const todo = todos[index];
            return(
                <TodoListItem 
                todo={todo} 
                key={key} 
                onRemove={onRemove} 
                onToggle={onToggle} 
                style={style}
                />
            )
        },[onRemove, onToggle, todos]
    )

    return(
        <List
      className="TodoList"
      width={495}
      height={513}
      rowCount={todos.length}
      rowHeight={57}
      rowRenderer={rowRenderer}//항목 랜더링을할때 쓰는 함수
      list={todos}
      style={{ outline: 'none' }}
    />
    )
}

export default React.memo(TodoList); 
//todolist의 부모컴포넌트가 app인데 그게 렌더링 될 때가 todolist가 
//업데이트 될 때인데 React.memo를써도 영향이 없다.
