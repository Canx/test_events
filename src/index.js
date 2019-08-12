import { Machine, interpret, send } from 'xstate'

// import { keyboardMachine } afrom './spanish-layout.js'

const bodytag = document.querySelector("body")

const machineConfig = {
  id: 'keyboard',
  initial: 'start',
  context: {
    keysPressed: new Set(),
    keys: {
      KeyA: { type: 'char', normal: 'a', shift: 'A', quote: 'á', quoteshift: 'Á'},
      ShiftLeft: { type: 'shift'},
      ShiftRight: { type: 'shift'}
    }
  },
  states: {
    start: {
      initial: 'normal',
      states: {
        normal: {},
        checking: {},
        shift: {},
        quote: {},
        quoteshift: {}
      },
      on: {
        'keydown': { target: '.checking', actions: ['log','press','highlight','resend']},
        'keyup': { target: '.checking', actions: ['log','release','unhighlight']},
        'char': { target: '.normal', actions: ['log','print'] }
      }
    }
  }
}

const machineOptions = { 
  actions: {
    'log': (context, event, actionMeta) => {
      console.log("log EVENT=>" + event.type + " KEY:" + event.code +" STATE:" + actionMeta.state.value.start + " PRESSED:" + context.keysPressed)
    },
    'highlight': (context, event) => {
      console.log("highlight")
      // TODO: comprobar que es null
      let node = document.getElementById(event.code)
      node.setAttribute("class", "highlight")
    },
    'unhighlight': (context, event) => {
      console.log("unhighlight")
      // TODO: comprobar que es null
      let node = document.getElementById(event.code)
      node.setAttribute("class", "")
    },
    'press': (context, event) => {
      console.log("press")
      context.keysPressed.add(event.code)
    },
    'release': (context, event) => {
      console.log("release")
      context.keysPressed.delete(event.code)
    },
    'print': (context, event, actionMeta) => {
      console.log("print")
      let state = actionMeta.state.value.start
      let char = context.keys[event.code][state]
      let node = document.getElementById("typing")
      node.innerText += char
    },
    'resend': (context, event) => {
      let type = context.keys[event.code].type
      //debugger
      console.log("resend")
      // BUG: does not send event!!!
      send({ 'type': type }, {'source': event })
      // , 'source': event, 'keydownus': event.type === 'keydown' }
    }
  },
  activities: {},
  guards: {
    'isChar': (context, event) => {
      let ischar = context.keys[event.code].type == 'char'
      console.log("is char key?" + ischar)
      return ischar
    },
    'isShift': (context, event) => {
      let isshift = context.keys[event.code].type == 'shift'
      console.log("is shift?" + isshift)
      return isshift
    }
  },
  services: {}}


const layout = Machine(machineConfig, machineOptions)

// Machine instance with internal state
const keyboard = interpret(layout)
  .onTransition(state => console.log("onTransition: STATE=>" + state.value.start))
  .start()

const loadHandler = function(event) {
  bodytag.onkeydown = keydownHandler
  bodytag.onkeyup = keyupHandler
}

let keydownHandler = function (event) {
  keyboard.send(event)
}

let keyupHandler = function (event) {
  keyboard.send(event)
}

window.onload = loadHandler