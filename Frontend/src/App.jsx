import { useState, useRef, useEffect} from "react";
import { Card} from "./Components/Card"
import { Todo } from "./Components/Todo";
import axios from 'axios'
import {Circle, CircleCheckBig} from 'lucide-react'



function App() {
  const inputRef = useRef(null);
  const [AllTodos, setAllTodos] = useState([]);

  function fetchTodos() {
    axios.get('http://localhost:3000/get')
      .then((result) => {
        setAllTodos(result.data.allTodos);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchTodos();
  }, [])

  function handleAddTodo(){
    const newTodoText = inputRef.current.value.trim(); 

    if (newTodoText !== "") {
      axios.post('http://localhost:3000/add', {task:newTodoText})
      .then((result) => {
          fetchTodos()
      })
      .catch((err) => {
        console.log(err)
      })
      inputRef.current.value = "";
    }
  }

  function handleDelete(id){
    axios.delete(`http://localhost:3000/delete/${id}`)
    .then((result) => {
      fetchTodos()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleEdit(id){
    axios.put(`http://localhost:3000/update/${id}`)
    .then((result) => {
      fetchTodos()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="flex pt-20 items-center justify-center">
        <Card>
            <div className="flex flex-col space-y-10 items-center justify-center">
              <div className="font-bold text-4xl pt-10">AJ's Todo Application</div>
              <div><input ref={inputRef} className="border-2 w-sm sm:w-md p-3 rounded-md" type="text" placeholder="Enter your Todo....." maxLength={50}/></div>
              <div><button onClick={handleAddTodo} className="bg-green-400 p-3 cursor-pointer px-8 font-bold rounded-full shadow-md">Add todo</button></div>
              <div className="flex flex-col space-y-5">
                {
                  AllTodos.length === 0 
                  ?
                  <div className="text-black font-semibold text-2xl font-[Kalam]">No todos</div>
                  :
                  AllTodos.map((item, index) => {
                    return <div key={index}>
                      {
                        !item.done ?
                        <div><Todo title={item.task} style={"text-black font-semibold text-3xl font-[Kalam]"} edit={() => handleEdit(item._id)} removed={() => handleDelete(item._id)}><Circle size={16} color="#040101" /></Todo></div>
                        :
                        <div><Todo title={item.task} style={"text-black font-semibold text-3xl font-[Kalam] line-through decoration-red-400"} edit={() => handleEdit(item._id)} removed={() => handleDelete(item._id)}><CircleCheckBig size={16} color="#01f411" strokeWidth={2.25} /></Todo></div>
                      }
                    </div>
                  })
                }
              </div>
            </div>
        </Card>
    </div>
  )
}

export default App
