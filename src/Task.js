const Task = (props) => {
    const {task: {id, name, date, done}, onChangeDone, onEditTask, onDeleteTask} = props
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{date}</td>
            <td><input type="checkbox" onChange={event => onChangeDone(event.target.checked)} checked={done}/></td>
            <td>
                <div>
                    <button onClick={onEditTask}>Редактировать</button>
                    <button onClick={onDeleteTask}>Удалить</button>
                </div>
            </td>
        </tr>
    )
}

export default Task
