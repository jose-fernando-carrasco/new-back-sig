const Prueba = get(".prueba");
const Prueba2 = get(".prueba2");
const idDiagrama = get(".diagrama_id");

Prueba.addEventListener("submit", event => {
    event.preventDefault();
    console.log('clicks Salvar');
    console.log(idDiagrama.value);
    axios.put(`/salas/guardarDiagrama/${idDiagrama.value}`, {
        diagram: JSON.stringify(app.graph.toJSON()),
        sala_id: Salita.value
    }).then(res => {
        console.log('resultado');
        console.log(res.data);
    });

});



Prueba2.addEventListener("submit", event => {
    event.preventDefault();

    console.log('click Cargar');
    axios.get(`/salas/mostrarDiagrama/${idDiagrama.value}`).then(res => {
        console.log(res.data);
        console.log('cad');
        app.graph.fromJSON(res.data);
    });


});