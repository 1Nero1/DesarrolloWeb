// ###Variables###
let inputs;
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{1,14}$/ // 7 a 14 numeros.
}
let formulario;
const camposLlenos = { //indica que los campos o inputs no tienen datos
    Colunas: false,
    Filas: false
};
let numColumnas;
let numFilas;
let contTabla;

// ###Etiquetas HTML###
inputs = document.querySelectorAll(".form_input");
formulario = document.querySelector("#formulario");

// ###Eventos###
// Eviar datos
formulario.addEventListener('submit',(event)=>{
    event.preventDefault(); // Este evento evita que se envien datos del formulario
    if(camposLlenos.Colunas && camposLlenos.Filas){
        console.log("no borra nada");
        crearTabla();
        formulario.reset();
        console.log('se borro');
    }
    else{
        document.querySelector('.form_Mess_Error ').classList.add('form_Mess_Error_Activo');
        setTimeout(()=>{
            document.querySelector('.form_Mess_Error ').classList.remove('form_Mess_Error_Activo');
        }, 5000); // Tiempo que muestre el mensaje
    }
});

function crearTabla(){
    numColumnas = document.querySelector(".cont_Colunas .form_input").value;
    numFilas = document.querySelector(".cont_Filas .form_input").value;
    contTabla = document.querySelector(".cont__tabla");

    // REMEMBER: optimizar a una mejor forma la creacion de HTML automatico
    contTabla.innerHTML = "";
    let tabla = `<table id="tablaMuestra" class="tabla__muestra">`;
    for(let i=0; i<numColumnas; i++){
        tabla +=`<tr class="tabla__fila">`;
        for(let j=0; j<numFilas; j++){
            tabla += `<td class="tabla__columna">${i},${j}</td>`
        }
        tabla +="</tr>";
    }
    tabla += "</table>"
    contTabla.innerHTML = tabla;
}

// Evento que se este escribiendo
inputs.forEach((input)=>{
    input.addEventListener('keyup', validaFormulario);
    input.addEventListener('blur', validaFormulario);
});

// ###Validaciones###
// Valida que el documento este listo
document.addEventListener('DOMContentLoaded',()=>{
    console.log('Documento Listo');
});

// Validacion del formulario (no sobreescribirse)
for(let i = 0; i < inputs.length; i++){
    inputs[i].addEventListener('keyup',()=>{
        if(inputs[i].value.length>=1){ // indicamos que en input donde estamos debe tener por lo menos un caracter
            inputs[i].nextElementSibling.classList.add('fijar');
        }
        else{
            inputs[i].nextElementSibling.classList.remove('fijar');
        }
    });
}

// Validacionde inputs
function validaFormulario(e) {
    switch (e.target.name) { //en este punto estamos ingresando a los input y obteniendo su nombre
        case "columnas": // solo colocamos los input que vamos a validar
            campInput(expresiones.telefono,e.target,'Colunas');
        break;
        case "filas":
            campInput(expresiones.telefono,e.target,'Filas');
        break;
        default:
            console.log("Aqui hay un error");
        break;
    }
}

// Validando campo del input
function campInput(expresion,input,campo) {
    if(expresion.test(input.value)){ // Validamos que lo que este dentro del input concuerde con lo que necesitemos de expreciones 
        document.querySelector(`.cont_${campo} .form_input_error`).classList.remove('form_input_error_Activo');
        camposLlenos[campo] = true;
    }
    else{
        document.querySelector(`.cont_${campo} .form_input_error`).classList.add('form_input_error_Activo');
        setTimeout(()=>{ // no ayuda a que se quite el mensaje despues de 5s 
            document.querySelector(`.cont_${campo} .form_input_error`).classList.remove('form_input_error_Activo');
        },5000);
        camposLlenos[campo] = false;
    }
}