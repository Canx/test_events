const SHIFT = 16
const DEAD = 222

let str="aAá"
let caracteres=str.split("")
let contador = 0
let previousKey

let pressed={}

let mostrarletraActual = function () {
    document.getElementById("next").innerHTML = caracteres[contador]
}
 
let correcto = function () {
    document.getElementById("correcto").innerHTML = "CORRECTO!"
    document.getElementById("correcto").style.display = "block"
}

let incorrecto = function (c1, c2) {
    document.getElementById("correcto").innerHTML = "INCORRECTO! " + c1 + "<>" + c2
    document.getElementById("correcto").style.display = "none"
}

let isUpperCase = function (c) {
    return c === c.toUpperCase()
}

let esTeclaEspecial = function (k) {
    let estado = false

    switch (k) {
        case SHIFT: estado = true; break
    }

    return estado

}

let keydownHandler = function (event) {
    let key = event.keyCode || event.which
    let keychar = String.fromCharCode(key)

    pressed[key] = true
    console.log("Se ha pulsado la tecla: " + keychar + "(" + key + ")")

    if (comprobarTecla(key, caracteres[contador])) {
        //alert("correcto!")
        contador = contador + 1
        correcto()
        mostrarletraActual()
    }
    else {
        incorrecto(keychar, caracteres[contador])
    }
}

let isPressed = function(key) {
    return pressed[key]
}

let comprobarTecla = function (tecla, caracter) {
    let estado = false
    let caracterTecla = String.fromCharCode(tecla)
    
    if (isUpperCase(caracter) && caracterTecla === caracter.toUpperCase() && isPressed(SHIFT)) {
        estado = true
    }
    if (!isUpperCase(caracter) && caracterTecla == caracter.toUpperCase() && !isPressed(SHIFT)) {
        estado = true
    }

    else if (caracter == 'á' && caracterTecla == 'A' && previousKey === 222) {
        estado = true
    }

    return estado
}

let keyupHandler = function (event) {
      let key = event.keyCode || event.which

      delete pressed[key]
      previousKey = key
}

let loadHandler = function(event) {   
    let bodytag = document.querySelector("body")

    bodytag.onkeydown = keydownHandler
    bodytag.onkeyup = keyupHandler
    
    mostrarletraActual()        
}


window.onload = loadHandler
