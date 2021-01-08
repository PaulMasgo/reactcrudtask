import './App.css';
import React, { useState } from 'react'
import shortid from 'shortid';

function App() {

    const [ task, setTask ] = useState('');
    const [ tasks, setTasks ] = useState([]);
    const [ updateMod, setUpdateMod ] = useState(false);
    const [ idUpdate, setIdUpdate ] = useState();
    const [ erros, setErros ] = useState('');

    function addTask(e) {
        e.preventDefault();
        if (task == '') {
            setErros('El campo no puede estar vacio');
            return
        }
        setTasks([
            ...tasks, { id: shortid.generate(), task }
        ])
        setTask('');
        setErros('');
    }

    function deleteTask(id) {
        const resultfilter = tasks.filter(item => item.id !== id);
        setTasks(resultfilter);
    }

    function updateModChange(item) {
        setUpdateMod(true);
        setTask(item.task);
        setIdUpdate(item.id);
    }

    function UpdateTask(e) {
        e.preventDefault();
        if (task == '') {
            setErros('El campo no puede estar vacio');
            return
        }
        const newArray = tasks.map(item =>
            item.id === idUpdate ? { id: idUpdate, task } : item
        );
        setTasks(newArray);
        setUpdateMod(false);
        setErros('');
    }

    return (
        <div className="content" >
            <div className="table" >
                <div className="table-header" >
                    <div className="element">
                        Nro.
                    </div>
                    <div className="element ">
                        Nombre
                    </div>
                    <div className="element">
                        Opciones
                    </div>
                </div>
                {
                    tasks.map((item, index) => (
                        <div className="table-content" key={ item.id } >
                            <div className="element">
                                { index + 1 }
                            </div>
                            <div className="element ">
                                { item.task }
                            </div>
                            <div className="element">
                                <button className="btn-edit" onClick={ () => updateModChange(item) }  >Editar</button>
                                <button className="btn-delete" onClick={ () => deleteTask(item.id) } >Eliminar</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="form">
                <h2>
                    {
                        !updateMod ? 'Agregar Tarea' : 'Editar Tarea'
                    }
                </h2>
                <form onSubmit={ !updateMod ? addTask : UpdateTask } >
                    <input type="text" onChange={ (e) => setTask(e.target.value) } value={ task } placeholder="Ingrese una tarea ...." />
                    {
                        erros.length > 0 ? (<span> {erros } </span>) : ''
                    }
                    {
                        !updateMod ? (<button type="submit">Agregar</button>) : (<button className="update-button" type="submit">Editar Tarea</button>)
                    }
                </form>
            </div>
        </div>
    );
}

export default App;
