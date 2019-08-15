import { Machine, interpret, send } from 'xstate'

// import { keyboardMachine } afrom './spanish-layout.js'

const bodytag = document.querySelector("body")

const machineConfig = {
  id: 'keyboard',
  initial: 'start',
  context: {
    lastEvent: null,
    keysPressed: new Set(),
    keys: {
      KeyA: { type: 'char', normal: 'a', shift: 'A', quote: 'á', quoteshift: 'Á'},
      ShiftLeft: { type: 'shift'},
      ShiftRight: { type: 'shift'}
    }
  },
  states: {
    start: {
      onEntry: [ 'log' ],
      on: {
        'keydown': { target: 'checking', actions: ['press','highlight']},
        'keyup': { target: 'checking', actions: ['release','unhighlight']},
      }
    },

    checking: {
      onEntry: [ 'log', 'resend' ],
      on: {
        'shift': { target: 'shift', actions: ['log']},
        'char': { target: 'normal', actions: ['print','log'] }
      }
    },
    shift: {
      onEntry: [ 'log' ]
    },
    quote: {
      onEntry: [ 'log' ]
    },
    quoteshift: {
      onEntry: [ 'log' ]
    }
  }
}

const machineOptions = { 
  actions: {
    'log': (context, event, actionMeta) => {
      console.log("event type=>" + event.type + " code:" + event.code +" STATE:" + actionMeta.state.value + " PRESSED:" + context.keysPressed)
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
      //debugger
      console.log("press")
      context.keysPressed.add(event.code)
      context.lastEvent = event
    },
    'release': (context, event) => {
      console.log("release")
      context.keysPressed.delete(event.code)
      context.lastEvent = event
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
      console.log("resend event: " + type)
      // BUG: does not send event!!!
      send(type, {'code': event.code })
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
    },
    'shiftPressed': (context, event) => {
      //debugger
      let pressed = false
      context.keysPressed.forEach(function(key) {
        if (key.type == 'shift') {
          pressed = true
        }
      })
      return pressed
    }
  },
  services: {}}


const layout = Machine(machineConfig, machineOptions)

// Machine instance with internal state
const keyboard = interpret(layout).start()

const loadHandler = function(event) {
  //bodytag.onkeydown = keydownHandler
  //bodytag.onkeyup = keyupHandler
  keyboard.send('keydown', {code: 'ShiftRight'})
}

let keydownHandler = function (event) {
  keyboard.send(event)
}

let keyupHandler = function (event) {
  keyboard.send(event)
}

window.onload = loadHandler