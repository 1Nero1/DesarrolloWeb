// ###Variables###
let inputs;
let numero;

// ###Etiquetas HTML###
inputs = document.getElementsByClassName("form_input");
console.log(inputs);

numero = inputs.length;
// console.log(`el numero de inputs es: ${numero}`);
// ###Eventos###

// ###Validaciones###
// Valida que el documento este listo
document.addEventListener('DOMContentLoaded',()=>{
    console.log('Documento Listo');
});

//Validacion del formulario (no sobreescribirse)
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