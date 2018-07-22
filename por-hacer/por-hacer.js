const fs = require('fs');
// const db = 'db/data.json';

let listadoporhacer = [];

const guardarDB = () => {
    return new Promise((res, rej) => {
        let data = JSON.stringify(listadoporhacer);
        fs.writeFile('db/data.json', data, (err) => {
            if (err)
                rej(err);
            else
                res('Datos guardados en la base de datos');
        });

    })
}

const cargarBD = () => {
    try {

        listadoporhacer = require('../db/data.json');
    } catch (error) {
        listadoporhacer = [];
    }
}

const crear = (descripcion) => {
    // console.log(db);
    cargarBD();
    const porHacer = {
        id: getMaxId() + 1,
        descripcion,
        estado: false
    }

    listadoporhacer.push(porHacer);
    // console.log(listadoporhacer);
    guardarDB();
    return porHacer;
}

const getListado = (f = 0) => {
    cargarBD();
    // getMaxId();
    if (f == 0) {
        return listadoporhacer;
    }
    f = (f == 1) ? true : false;
    // console.log(f);
    let retorno = listadoporhacer.filter(tarea => tarea.estado == f);
    return retorno;

}

const getMaxId = () => {
    let max = 0;
    try {
        max = listadoporhacer.reduce((a, b) => {

            return (a.id > b.id ? a : b);

        }).id;
        // console.log(max);
    } catch (error) {
        max = 0;
    }
    // console.log(max);
    return max;
}

const actualizar = (id, estado = true) => {
    cargarBD();
    let tarea = listadoporhacer.find(t => t.id === id)
        // console.log(tarea, estado);
    if (tarea) {
        tarea.estado = estado;
        guardarDB();
        const msg = (estado) ? 'completada' : 'pendiente';
        console.log(`Tarea ${tarea.descripcion} => ${msg}`);
    } else {
        console.log('Error al intentar actualizar');
    }
}

const borrar = (id) => {
    cargarBD();
    const idx = listadoporhacer.findIndex(tarea => tarea.id === id);
    if (idx >= 0) {
        const tarea = listadoporhacer[idx].descripcion;
        listadoporhacer.splice(idx, 1);
        guardarDB();
        console.log(`Tarea ${tarea} borrada`);
    } else {
        console.log('Error al intentar borrar');
    }
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}