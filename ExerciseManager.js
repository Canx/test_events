class StateMachine {
    
}


// gestor de Ejercicios
let str="aAá"
let caracteres=str.split("")
let contador = 0
let keyboard = undefined

let loadHandler = function(event) {   
    // TODO: check that keyboard id exists!
    let bodytag = document.querySelector("body")

    keyboard = new Keyboard(bodytag, layout)

    bodytag.onkeydown = keydownHandler
    bodytag.onkeyup = keyupHandler
    

    //mostrarletraActual()        
}

let keydownHandler = function (event) {
    let key = event.keyCode || event.which
    let generatedchar = keyboard.press(key)
}

let keyupHandler = function (event) {
    let key = event.keyCode || event.which
    
    keyboard.release(key)
}

window.onload = loadHandler

//if (comprobarTecla(key, caracteres[contador])) {
//    //alert("correcto!")
//    contador = contador + 1
//    correcto()
//    mostrarletraActual()
//}
//else {
//    incorrecto(keychar, caracteres[contador])
//}
