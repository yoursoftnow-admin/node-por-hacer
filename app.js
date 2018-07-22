const argv = require('./config/config.yargs').argv;
const { crear, getListado, actualizar, borrar } = require('./por-hacer/por-hacer');
const colors = require('colors');

const accion = argv._[0];
const desc = argv.descripcion;
const id = argv.id;
const c = argv.completado;
const f = argv.filtro;

switch (accion) {
    case 'listar':
        const listado = getListado(f);
        listado.map((tarea, idx) => {
            console.log('================Por hacer================='.green);
            console.log(tarea.descripcion);
            console.log(`Estado: ${tarea.estado}`);
            console.log('=========================================='.green);
        })
        break;
    case 'crear':
        console.log(crear(desc));
        // console.log(desc);
        break;
    case 'actualizar':
        actualizar(id, c);
        break;
    case 'borrar':
        borrar(id);
        break;

    default:
        console.log('Comando no reconocido');
        break;
}