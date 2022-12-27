const msgForm = get(".msgForm");
const msgProyecto = get(".msgProyecto_id");
const msgInvitadosP = get(".msgInvitadosP");
const BotonCerrar = document.getElementById("botonM");

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



msgForm.addEventListener("submit", event => {
    event.preventDefault();
    if (msgInvitadosP.value.length == 0) {
        console.log('Es nulo');
        BotonCerrar.click();

        Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'no has seleccionado nada'
        }).then(() => {
            console.log('le di click');
            window.location.href = BaseUrl + window.location.pathname;
        });

    } else {

        axios.post('/invitaciones/store2', {
            user_recibe_id: msgInvitadosP.value,
            proyecto_id: msgProyecto.value

        }).then(res => {

            BotonCerrar.click();

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Invitacion Enviada',
                showConfirmButton: false,
                timer: 1100
            });
            setTimeout(function() { window.location.href = BaseUrl + window.location.pathname; }, 1000);

        }).catch(error => {
            console.log(error);
        });
    }
});