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

        // TODO: generate state machine!
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