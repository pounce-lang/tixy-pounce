import repl from './pounceEnv.js';

// Add event listener for code-mini-golf input
const r_PounceProgramEle = document.getElementById("user-pl-r");
const g_PounceProgramEle = document.getElementById("user-pl-g");
const b_PounceProgramEle = document.getElementById("user-pl-b");
const a_PounceProgramEle = document.getElementById("user-pl-a");
// const exampleSelectEle = document.getElementById("example");

const initProgram = decodeURI(location.hash.substr(1))?.split(';');
let r_pounceProgram = initProgram[0] ? initProgram[0] : 'x 64 / dup * y 64 / dup * + sqrt ';
let g_pounceProgram = initProgram[1] ? initProgram[1] : 'y 6 % 4 /';
let b_pounceProgram = initProgram[2] ? initProgram[2] : '48 x dup * y dup * + sqrt - 24 / dup  *';
let a_pounceProgram = initProgram[3] ? initProgram[3] : '40 y -';
let logLevel = 0;

// red
r_PounceProgramEle.addEventListener("blur", (e) => {
    if (e.target.value !== r_pounceProgram) {
        r_pounceProgram = e.target.value;
        repl(`${r_pounceProgram} ${g_pounceProgram} ${b_pounceProgram} ${a_pounceProgram}`, logLevel);
    }
    if (e.key == 'Enter') {
        location.hash = encodeURI(`${r_pounceProgram};${g_pounceProgram};${b_pounceProgram};${a_pounceProgram}`);
    }
}, false);

r_PounceProgramEle.value = r_pounceProgram;

r_PounceProgramEle.focus();

// green
g_PounceProgramEle.addEventListener("blur", (e) => {
    if (e.target.value !== g_pounceProgram) {
        g_pounceProgram = e.target.value;
        repl(`${r_pounceProgram} ${g_pounceProgram} ${b_pounceProgram} ${a_pounceProgram}`, logLevel);
    }
    if (e.key == 'Enter') {
        location.hash = encodeURI(`${r_pounceProgram};${g_pounceProgram};${b_pounceProgram};${a_pounceProgram}`);
    }
}, false);

g_PounceProgramEle.value = g_pounceProgram;

//blue
b_PounceProgramEle.addEventListener("blur", (e) => {
    if (e.target.value !== b_pounceProgram) {
        b_pounceProgram = e.target.value;
        repl(`${r_pounceProgram} ${g_pounceProgram} ${b_pounceProgram} ${a_pounceProgram}`, logLevel);
    }
    if (e.key == 'Enter') {
        location.hash = encodeURI(`${r_pounceProgram};${g_pounceProgram};${b_pounceProgram};${a_pounceProgram}`);
    }
}, false);

b_PounceProgramEle.value = b_pounceProgram;

// alpha
a_PounceProgramEle.addEventListener("blur", (e) => {
    if (e.target.value !== a_pounceProgram) {
        a_pounceProgram = e.target.value;
        repl(`${r_pounceProgram} ${g_pounceProgram} ${b_pounceProgram} ${a_pounceProgram}`, logLevel);
    }
    if (e.key == 'Enter') {
        location.hash = encodeURI(`${r_pounceProgram};${g_pounceProgram};${b_pounceProgram};${a_pounceProgram}`);
    }
}, false);

a_PounceProgramEle.value = a_pounceProgram;

repl(`${r_pounceProgram} ${g_pounceProgram} ${b_pounceProgram} ${a_pounceProgram}`, logLevel);