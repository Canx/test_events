// clase KeyBoard
class Keyboard {
    pressed = []
    previousKey = undefined
    dom = undefined
    keys = undefined

    constructor(dom, layout) {
               
        let keys = {}
        let currentrow = document.createElement("div")
        dom.appendChild(currentrow)
        layout.keys.forEach(function(key) {
            if (key.nextrow) {
                currentrow = document.createElement("div")
                dom.appendChild(currentrow)
            }

            let domkey = document.createElement("span")
            
            domkey.id = key.id
            domkey.textContent = key.char
            currentrow.appendChild(domkey)
            keys[key.id] = domkey
        })

        this.keys = keys

        // TODO: check that dom is a DOM element
        this.dom = dom      
    }

    press(key) {
        if (!this.pressed[key]) {
            let keychar = String.fromCharCode(key)     
            
            this.pressed[key] = true

            if (key in this.keys) {    
                this.keys[key].style.color = "red"
            }
            console.log("Se ha pulsado la tecla: " + keychar + "(" + key + ")")
            
        }
    }

    release(key) {
        let keychar = String.fromCharCode(key)

        delete this.pressed[key]
        this.previousKey = key

        if (key in this.keys) {
            this.keys[key].style.color = "black"
        }
        console.log("Se ha liberado la tecla: " + keychar + "(" + key + ")")
    }
}

// gestor de Ejercicios
let str="aAá"
let caracteres=str.split("")
let contador = 0
let keyboard = undefined

let layout = {
        name : "spanish",
        keys : [{id: 81, char: 'Q'},
                {id: 87, char: 'W'},
                {id: 69, char: 'E'},
                {id: 82, char: 'R'},
                {id: 84, char: 'T'},
                {id: 89, char: 'Y'},
                {id: 85, char: 'U'},
                {id: 73, char: 'I'},
                {id: 79, char: 'O'},
                {id: 80, char: 'P'},
                {id: 65, char: 'A', nextrow: true}]
    }

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
    keyboard.press(key)
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