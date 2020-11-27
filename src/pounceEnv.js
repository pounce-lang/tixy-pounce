import { interpreter, parse, unParse } from '@pounce-lang/core';

// const stackEle = document.querySelector('#canvas');
let interp;
let pounceAst;
let nextPounceAst = null;
const rows = 16;
const columns = 16;
const off = 20;
const scale = 20;
let start_t = Date.now();
const frame_int = 100;
let last_update = 0;
let work_time = 0;
let next = 0;
let fn_of_time = false;

// parse the Pounce program
export default function repl(pounceProgram, logLevel = 0) {
    start_t = Date.now();
    nextPounceAst = parse(pounceProgram);
    if (!next || !fn_of_time) {
        window.requestAnimationFrame(step);
    }
    fn_of_time = pounceProgram.indexOf("t") >= 0;
};

const ctx = document.getElementById("output").getContext("2d");

const step = () => {
    const t = Date.now() - start_t;
    if (nextPounceAst) {
        pounceAst = nextPounceAst;
    }
    let i = 0;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 340, 340);
    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < columns; x++) {
            let dataPlusPounce = [t/1000, i, x, y, ['t', 'i', 'x', 'y'], pounceAst, 'pounce'];
            interp = interpreter(dataPlusPounce);
            let res = interp?.next?.();
            let v = res?.value?.stack?.[0] ?? 0;
            // ctx.scale(1, 1);
            ctx.beginPath();
            ctx.fillStyle = v < 0 ? "#F24" : "#FFF";
            v = Math.min(1, Math.abs(v));
            // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
            ctx.arc(x * scale + off, y * scale + off, v * scale / 2, 0, 2 * Math.PI);
            ctx.fill();
            i++
        }
    }
    if (!fn_of_time) {
        return;
    }
    const post_work_t = Date.now() - start_t;
    // work_time = post_work_t - t;
    next = t + frame_int;
    const time_till_next = next - post_work_t;
    if (time_till_next > 10) {
        setTimeout(() => {
            window.requestAnimationFrame(step);
        }, time_till_next);
    }
    else {
        window.requestAnimationFrame(step);
    }
};

const cleanStart = domEle => {
    while (domEle.firstChild) {
        domEle.firstChild.remove();
    }
}
