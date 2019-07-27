"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StateMachine = function StateMachine() {
    _classCallCheck(this, StateMachine);
};

// gestor de Ejercicios


var str = "aAá";
var caracteres = str.split("");
var contador = 0;
var keyboard = undefined;

var loadHandler = function loadHandler(event) {
    // TODO: check that keyboard id exists!
    var bodytag = document.querySelector("body");

    keyboard = new Keyboard(bodytag, layout);

    bodytag.onkeydown = keydownHandler;
    bodytag.onkeyup = keyupHandler;

    //mostrarletraActual()        
};

var keydownHandler = function keydownHandler(event) {
    var key = event.keyCode || event.which;
    var generatedchar = keyboard.press(key);
};

var keyupHandler = function keyupHandler(event) {
    var key = event.keyCode || event.which;

    keyboard.release(key);
};

window.onload = loadHandler;

//if (comprobarTecla(key, caracteres[contador])) {
//    //alert("correcto!")
//    contador = contador + 1
//    correcto()
//    mostrarletraActual()
//}
//else {
//    incorrecto(keychar, caracteres[contador])
//}
