const layout = {
    name : "spanish",
    keys : [{id:  81, char: 'q', shift: 'Q'},
            {id:  87, char: 'w', shift: 'W'},
            {id:  69, char: 'e', shift: 'E', dead:'é', dead_shift: 'É'},
            {id:  82, char: 'r', shift: 'R'},
            {id:  84, char: 't', shift: 'T'},
            {id:  89, char: 'y', shift: 'Y'},
            {id:  85, char: 'u', shift: 'U', dead: 'ú', dead_shift: 'Ú'},
            {id:  73, char: 'i', shift: 'I', dead: 'í', dead_shift: 'Í'},
            {id:  79, char: 'o', shift: 'O', dead: 'ó', dead_shift: 'Ó'},
            {id:  80, char: 'p', shift: 'P'},
            {id:  65, char: 'a', shift: 'A', dead: 'á', dead_shift: 'Á', nextrow: true},
            {id:  83, char: 's', shift: 'S'},
            {id:  68, char: 'd', shift: 'D'},
            {id:  70, char: 'f', shift: 'F'},
            {id:  71, char: 'g', shift: 'G'},
            {id:  72, char: 'h', shift: 'H'},
            {id:  74, char: 'j', shift: 'J'},
            {id:  75, char: 'k', shift: 'K'},
            {id:  76, char: 'l', shift: 'L'},
            {id: 192, char: 'ñ', shift: 'Ñ'},
            {id: 222, name: 'dead'},
            {id:  16, name: 'shift'},
            ],
    states : [{state: 'dead', keys : ['press', 222, 'release', 222]},
              {state: 'shift', keys : ['press', 16]},
              {state: 'dead_shift', previous: 'dead', keys : ['press', 16]}]
              
}