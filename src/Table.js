import {useEffect, useState} from 'react'
import Task from './Task'
import Modal from './Modal';

const Table = () => {

    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem('tasks')) || [
            {
                id: 1,
                name: 'Сверстать',
                date: '12.12.2020',
                done: true,
            },
            {
                id: 2,
                name: 'Закодить',
                date: '13.12.2020',
                done: false,
            }
        ]
    })
    const [watchUnfinishedTasks, setWatchUnfinishedTasks] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [openedTask, setOpenedTask] = useState(null)

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const hideUnhideDoneTasks = (event) => {
        setWatchUnfinishedTasks(event.target.checked)
    }

    const handleChangeDone = id => checked => {
        setTasks(prevState => {
            const newState = [...prevState]
            const index = newState.findIndex(item => item.id === id)
            newState[index].done = checked
            return newState
        })
    }

    const handleEditTask = (id) => () => {
        setOpenedTask(tasks.find(task => task.id === id))
        setIsModalOpen(true)
    }

    const handleSaveTask = (id) => editedProps => {
        setTasks(prevState => {
            const newState = [...prevState]
            const index = newState.findIndex(item => item.id === id)
            newState[index] = {...newState[index], ...editedProps}
            return newState
        })
    }

    const handleDeleteTask = (id) => () => {
        setTasks(prevState => {
            return prevState.filter(item => item.id !== id)
        })
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setOpenedTask(null)
    }

    const renderTasks = () => {
        const items = watchUnfinishedTasks ? tasks.filter(task => task.done === false) : tasks

        console.log(items)

        return items.map(task => {
            return (
                <Task
                    task={task}
                    onChangeDone={handleChangeDone(task.id)}
                    onEditTask={handleEditTask(task.id)}
                    onDeleteTask={handleDeleteTask(task.id)}
                />
                )
            }
        )
    }

    return (!tasks.length) ? (
        <div>
            <span>У вас пока нет задач</span>
        </div>
    ) : (
        <div>
            {isModalOpen &&
            <Modal
                task={openedTask}
                onSaveTask={handleSaveTask(openedTask.id)}
                onClose={handleCloseModal}
            />
            }
            <div style={{textAlign: "right"}}>
                <input type="checkbox" onChange={hideUnhideDoneTasks} checked={watchUnfinishedTasks} id="checkbox"/>
                <label for="checkbox">Скрыть выполненные</label>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Наименование</th>
                        <th>Дата</th>
                        <th>Статус</th>
                        <th>Действия</th>
                    </tr>
                    {renderTasks()}
                </tbody>
            </table>
        </div>
    )
}

export default Table
