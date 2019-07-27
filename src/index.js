import { Machine, interpret } from 'xstate'

// Stateless machine definition
// machine.transition(...) is a pure function used by the interpreter.
const toggleMachine = Machine({
  id: 'keyboard',
  initial: 'init',
  states: {
    init: { on: { press_dead: 'dead1' } },
    dead1: { on: { press_a: 'char_á', release_dead: 'dead2' } },
    dead2: { on: { press_a: 'char_á', press_dead: 'char_dead' } },
    char_á: { on: { release_all: 'init' } },
    char_dead: { on: { release_all: 'init' } }
  }
});

// Machine instance with internal state
const toggleService = interpret(toggleMachine)
  .onTransition(state => console.log(state.value))
  .start();
// => 'inactive'

toggleService.send('press_dead');
// => 'active'

toggleService.send('press_a');
// => 'inactive':w

