const msgFormS = get(".msgFormS");
const msgSProyecto = get(".msgSProyecto_id");
const msgSsala = get(".msgSsala_id");
const msgInvitadoS = get(".msgInvitadoS");
const BotonCerrarS = document.getElementById("botonC");
const DiagramaId2 = get(".diagrama-id2");
const msgTipoS = get(".msgTipoS");



msgFormS.addEventListener("submit", event => {
    event.preventDefault();
    if (msgInvitadoS.value.length == 0) {
        console.log('Es nulo');
        BotonCerrarS.click();

        Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'no has seleccionado nada'
        }).then(() => {
            console.log('le di click');
            window.location.href = BaseUrl + window.location.pathname;
        });

    } else {
        console.log('al else');
        console.log(DiagramaId2.value);
        axios.post('/invitacionsalas/store', {
            user_recibe_id: msgInvitadoS.value,
            proyecto_id: msgSProyecto.value,
            sala_id: msgSsala.value,
            diagrama_id: DiagramaId2.value,
            tipo: msgTipoS.value

        }).then(res => {
            console.log(res.data);
            BotonCerrarS.click();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Invitacion Enviada',
                showConfirmButton: false,
                timer: 1100
            }).then(() => {
                window.location.href = BaseUrl + window.location.pathname;
            });


        }).catch(error => {
            console.log(error);
        });
    }
});