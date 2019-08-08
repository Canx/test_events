import { Machine, interpret } from 'xstate'

// import { keyboardMachine } afrom './spanish-layout.js'
// Stateless machine definition
// machine.transition(...) is a pure function used by the interpreter.

const machineConfig = {
  id: 'keyboard',
  initial: 'noKey',
  context: {
    char: null
  },
  states: {
    noKey: {
      on: { KeyA_DOWN: 'char_a' }, 
      on: { Quote_DOWN: 'Quote_1' }
    },
    Quote_1: { 
      on: { KeyA_DOWN: 'char_á' }, 
      on: { Quote_UP: 'Quote_2' }
    },
    Quote_2: {
      on: { KeyA_DOWN: 'char_á' },
      on: { Quote_UP: 'char_Quote' }
    },

    // Character states
    char_a:     { meta: { char: 'a' } },
    char_á:     { meta: { char: 'á' } },
    char_Quote: { meta: { char: '´' } }
  }
}

const machineOptions = { actions: {}, activities: {}, guards: {}, services: {}}

const layout = Machine(machineConfig, machineOptions);

// Machine instance with internal state
const keyboard = interpret(layout)
  .onTransition(state => console.log(state.value + ":" + state.context.char))
  .start();

const loadHandler = function(event) {
  let bodytag = document.querySelector("body")

  bodytag.onkeydown = keydownHandler
  bodytag.onkeyup = keyupHandler
}

let keydownHandler = function (event) {
  let event_name = event.code + '_DOWN'
  console.log(event_name)
  keyboard.send(event_name)
}

let keyupHandler = function (event) {
  let event_name = event.code + '_UP'
  console.log(event_name)
  keyboard.send(event_name)
}

window.onload = loadHandler