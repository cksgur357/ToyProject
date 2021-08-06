import React,{useRef, useCallback, useReducer} from 'react'
import TodoTemplate from './TodoTemplate';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';


//오늘할일1~20 배열에 담아 생성
function createBulkTodos(){//======================================(4)
  const array = [];
  for (let i = 1; i<20; i++){
    array.push({
      id:i,
      text:`오늘할일${i}`,
      checked:false,
    }) 
  } 
  return array
}


//리듀서==========================================================(1)
function todoReducer(todos, action) {
    switch (action.type) {
        case 'INSERT':
            return todos.concat(action.todo);
        case 'REMOVE':
            return todos.filter((todo) => todo.id !== action.id);
        case 'TOGGLE':
            return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
        default:
            return todos;
    }
}

const App = () => {

    const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);//===(2)
    const nextId = useRef(1); // id값은 1부터시작============================(3)

    //props전달할 함수는 useCallback
    //insert
    const onInsert = useCallback((text) => {
            const todo = {id: nextId.current, text, checked: false};
            dispatch({ type: 'INSERT', todo });
            nextId.current += 1;
        },[]);

    //remove
    const onRemove = useCallback((id) => {
        dispatch({ type: 'REMOVE', id });
    }, []);

    //check
    const onToggle = useCallback((id) => {
        dispatch({ type: 'TOGGLE', id });
    }, []);

    //return 
    return (
        <TodoTemplate>
            <TodoInsert onInsert={onInsert} />
            <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        </TodoTemplate>
    );
};


export default App;



