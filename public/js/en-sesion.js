const BotonToggle = document.getElementById("sidebarToggle");
const msgNotify = get(".notificaciones");
const cuerpoInvitacionesP = get(".cuerpo-invitaciones");
const cuerpoInvitacionesS = get(".cuerpo-invitaciones-salas");
var lengthInvitacionesP = 0;
var lengthInvitacionesS = 0;
const BaseUrl = window.location.origin;

window.onload = function() {

    axios.get('/invitacionsalas/cantidad/Proyectosysalas').then(res => {
        msgNotify.innerHTML = res.data;

    }).then(() => {
        axios.get('/invitaciones/get/proyecto').then(res => {
            lengthInvitacionesP = res.data.length;
            cargarInvitaciones(res.data);

        }).then(() => {
            axios.get('/invitacionsalas/get/sala').then(res => {
                lengthInvitacionesS = res.data.length;
                cargarInvitacionesS(res.data);
            });

        });

    }).catch(error => {
        console.log(error);
    });


    Echo.join('en-sesion').listen('MessageProyectoEvent', (e) => {
        console.log(e);

        axios.get('/invitacionsalas/cantidad/Proyectosysalas').then(res => {
            msgNotify.innerHTML = res.data;

        }).then(() => {
            axios.get('/invitaciones/get/proyecto').then(res => {
                cargarInvitaciones2(lengthInvitacionesP, res.data);
            }).then(() => {
                axios.get('/invitacionsalas/get/sala').then(res => {
                    cargarInvitaciones2S(lengthInvitacionesS, res.data);
                });

            });

        }).catch(error => {
            console.log(error);
        });

    }).listen('MessageSalaEvent', (e) => {
        axios.get('/invitacionsalas/cantidad/Proyectosysalas').then(res => {
            msgNotify.innerHTML = res.data;

        }).then(() => {
            axios.get('/invitaciones/get/proyecto').then(res => {
                cargarInvitaciones2(lengthInvitacionesP, res.data);

            }).then(() => {
                axios.get('/invitacionsalas/get/sala').then(res => {
                    cargarInvitaciones2S(lengthInvitacionesS, res.data);
                });

            });

        }).catch(error => {
            console.log(error);
        });

    }).here((users) => {

        /* result = users.filter(user => user.id != 9);
        console.log('AQUI');
        result.forEach(u => {
            console.log(u.name);
        });
        console.log('===='); */

    }).joining((user) => {
        /* console.log('ENTRANDO:');
        console.log(user.name);
        console.log('===='); */

    }).leaving((user) => {
        /* console.log('SALIENDO:');
        console.log(user.name);
        console.log('===='); */

    });

}


// Utils
//cuando carge por primera vez
function cargarInvitaciones(invitaciones) {
    invitaciones.forEach(invitacion => {
        ingresarInvitacion(invitacion);
    });
}

//cuando cargue ya en 2da o más sin refrescar
function cargarInvitaciones2(longitudBase, invitaciones) {
    const tope = longitudBase;
    lengthInvitacionesP = invitaciones.length;
    var i = 1;
    invitaciones.forEach(invitacion => {
        if (i > tope) {
            ingresarInvitacion(invitacion);
        }
        i++;
    });
}

function ingresarInvitacion(invitacion) {
    const plantillaHTML = `
    <li><a class="dropdown-item" href="${BaseUrl}/invitaciones/${invitacion.id}/show">${invitacion.title}</a></li>
    `;
    cuerpoInvitacionesP.insertAdjacentHTML("beforeend", plantillaHTML);
}


function cargarInvitacionesS(invitaciones) {
    invitaciones.forEach(invitacion => {
        ingresarInvitacionS(invitacion);
    });
}


function cargarInvitaciones2S(longitudBase, invitaciones) {
    const tope = longitudBase;
    lengthInvitacionesS = invitaciones.length;
    var i = 1;
    invitaciones.forEach(invitacion => {
        if (i > tope) {
            ingresarInvitacionS(invitacion);
        }
        i++;
    });
}


function ingresarInvitacionS(invitacion) {
    const plantillaHTML = `
    <li><a class="dropdown-item" href="${BaseUrl}/invitacionsalas">${invitacion.asunto}</a></li>
    `;
    cuerpoInvitacionesS.insertAdjacentHTML("beforeend", plantillaHTML);
}

function get(selector, root = document) {
    return root.querySelector(selector);
}