const machine = {
    init: {
        press_char: 'char',
        press_shift: 'shift',
        press_alt: 'alt',
        press_dead: 'dead'
    },

    dead: {
        release_dead: 'dead2',
        press_char: 'char'
    },

    dead2: {
        press_char: 'char',
        other: 'init'
    },

    char: {
        release_last: 'init'
    },

    shift: {
        press_char: 'char',
        release_shift: 'init'
    },

    alt: {

    }

}

const commands = {
    char_a: '', 
    char_A: '',
    shift: '',
}
const initialState = 'init'