const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
}
const id = {
    demand: true,
    alias: 'id',
    desc: 'Identificador de la tarea'
}
const completado = {
    default: true,
    alias: 'c',
    desc: 'Define el estado de la tarea (completado o pendiente)'
}
const argv = require('yargs')
    .command('listar', 'Muestra todas las tareas por hacer', {
        filtro: {
            default: 0,
            alias: 'f',
            desc: 'Filtro de tareas por estado'
        }
    })
    .command('crear', 'Crea una tarea por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza una tarea por hacer a completado', {
        id,
        completado
    })
    .command('borrar', 'Borra una tarea por ahacer', {
        id
    })
    .help()
    .argv;


module.exports = {
    argv
}