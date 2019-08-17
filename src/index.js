import { Machine, interpret, actions, send } from 'xstate'

const { raise } = actions;
// import { keyboardMachine } afrom './spanish-layout.js'

const bodytag = document.querySelector("body")

const keyboardStates = {

}
const machineConfig = {
  id: 'keyboard',
  initial: 'start',
  context: {
    lastEvent: null,
    keysPressed: new Set(),
    keys: {
      KeyA: { type: 'char', char: 'a', shift: 'A', quote: 'á', quoteshift: 'Á'},
      Quote: { type: 'quote', quote: '´' },
      ShiftLeft: { type: 'shift'},
      ShiftRight: { type: 'shift'},

    }
  },
  states: {
    start: {
      initial: 'char',
      onEntry: [ 'log' ],
      states: {
        checking: {},
        shift: {},
        quote: {
          on: {
            'quotekeydown' : { target: 'char', actions: [ 'print' ]}
          }
        },
        quoteshift: {},
        char: {},
        hist: {
          type: 'history',
          target: 'char'
        }
      },
      on: {
        'keydown': { actions: ['press','highlight', 'resend']},
        'keyup': { actions: ['release','unhighlight', 'resend']},
        'shiftkeydown': { target: '.shift'},
        'shiftkeyup' : { target: '.char'},
        'quotekeyup': { target: '.quote' },
        'charkeydown' : { target: '.hist', actions: ['print'] }
      }
    }
  }
}

const machineOptions = { 
  actions: {
    'log': (context, event, actionMeta) => {
      console.log("event type=>" + event.type + " code:" + event.code)
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
      console.log("press " + event.code)
      context.keysPressed.add(event.code)
      context.lastEvent = event
    },
    'release': (context, event) => {
      console.log("release " + event.code)
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
    'resend': //(context, event) => raise({ type: context.keys[event.code].type, code: event.code } ) 
      send((context, event) => (
        { type: context.keys[event.code].type + event.type,
          code: event.code }))
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
    'noshift': (context, event) => {
      let shift = false
      context.keysPressed.forEach(function(key) {
        if (key.type == 'shift') {
          shift = true
        }
      })
      return !shift
    },
    'isDown': (context, event) => ( context.lastEvent.type === 'keydown' ),
    'isUp': (context, event) => ( context.lastEvent.type === 'keyup' )
  },
  services: {}}


const layout = Machine(machineConfig, machineOptions)

// Machine instance with internal state
const keyboard = interpret(layout)
  .onTransition(
    state => {console.log(state.value) }
  )
  .start()

const loadHandler = function(event) {
  bodytag.onkeydown = keydownHandler
  bodytag.onkeyup = keyupHandler
  //keyboard.send('keydown', {code: 'ShiftRight'})
  //keyboard.send('keydown', {code: 'KeyA'})
  //keyboard.send('keyup', {code: 'KeyA'})
  //keyboard.send('keyup', {code: 'ShiftRight'})
}

let keydownHandler = function (event) {
  keyboard.send(event)
}

let keyupHandler = function (event) {
  keyboard.send(event)
}

window.onload = loadHandler