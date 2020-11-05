import {useEffect, useState} from 'react'
import MaskedInput from 'react-maskedinput'

const Modal = (props, content) => {
    const {task: {id, name, date}, onSaveTask, onClose} = props
    const {header, body} = content

    const [editedName, setEditedName] = useState('')
    const [editedDate, setEditedDate] = useState('')

    useEffect(() => {
        setEditedName(name)
        setEditedDate(date)
    }, [])

    const handleSave = () => {
        onSaveTask({name: editedName, date: editedDate})
    }

    return (
        <div className="modal open">
            <div className="modal__overlay">
                <div className="modal__window">
                    <div className="modal__header">
                        <span className="modal__title">Редактировать</span>
                        <span className="modal__close" onClick={onClose}>&times;</span>
                    </div>
                    <div className="modal__body">
                            <div className="modal__row">
                                <span>ID</span>
                                <span>{id}</span>
                            </div>
                            <div className="modal__row">
                                <label>Наименование</label>
                                <input type="text" onChange={e => setEditedName(e.target.value)} value={editedName}/>
                            </div>
                            <div className="modal__row">
                                <label>Дата</label>
                                <MaskedInput mask="11.11.1111" type="text" onChange={e => setEditedDate(e.target.value)} value={editedDate}/>
                            </div>
                        <button onClick={handleSave}>Сохранить</button>
                        <button onClick={onClose}>Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
