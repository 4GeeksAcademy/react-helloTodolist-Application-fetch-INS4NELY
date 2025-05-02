import React, { useEffect, useState } from "react";

const Tasks = () => {

    const [listTask, setListTask] = useState([])
    const [task, setTask] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        userSearch()
    },[])

    async function userSearch() {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/nomastrabajos', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.status === 404) {
                createUser();
                return
            };

            const responseJson = await response.json()
            setListTask(responseJson.todos)
            
        } catch (error) {
            setError('Ha ocurrido un error: ' + error.message)
            console.log('Ha ocurrido un error: ' + error.message);
        }
    }

    async function createUser() {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/nomastrabajos', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })

            if(response.status === 201) {
              console.log('Is a new user');
                return
            }

        } catch (error) {
            console.log(error);
            
        }
    }

      const buildTask = async (e) => {
        if (e.key === 'Enter' && task !== '') {
            // setListTask((actTask) => ([...actTask, { id: listTask.length + 1, task: task }]))
            
            try {
                const response = await fetch('https://playground.4geeks.com/todo/todos/nomastrabajos', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        "label": task,
                        "is_done": false
                      })
                })

                if (response.status === 201) {
                    userSearch()
                    setTask('')
                    return
                }
                
            } catch (error) {
                console.log('No task', error);
                
            }
        }
    }

    const deleteTask = async (id) => {
        // setListTask((actTask) => actTask.filter(task => task.id !== id))
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            })
             if(response.status === 204) {
                userSearch()
                return
             }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div>
            <div className="text-center mt-5">
                <h1>Todo List by NoMasTrabajos</h1>
            </div>
            <div className="container-fluid boxStyle position-absolute top-50 start-50 translate-middle rounded-3">
                <div className="mx-3 mb-3 mt-4">
                    <input className="form-control" type="text" placeholder={listTask.length === 0 ? `No tasks, add a task` : `Write more tasks`} value={task} onChange={(e) => { setTask(e.target.value) }} onKeyUp={buildTask} />
                </div>
                <div className="boxTaskStyle">
                    {listTask.map((task, id  ) => (
                        <div className="taskContainer border-top my-2 container" id={id} key={id}>
                            <div className="d-flex justify-content-between align-items-center m-3">
                                <p className="m-0">{task.label}</p>
                                <button className="btnStyle" onClick={() => deleteTask(task.id)}>
                                    <i className="ri-close-line fs-4"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className=" mb-2 py-2 border-top countStyle">
                    <p className="mt-2 ms-2">{listTask.length} item left</p>
                </div>
            </div>
        </div>
    )
}

export default Tasks