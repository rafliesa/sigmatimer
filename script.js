let scramble = scramble_generator();
document.getElementById("scramble").textContent = scramble;
document.getElementById("scramble-visualization").setAttribute("scramble", `${scramble}`);
const time = document.getElementById("time");

let result = new Map();
let timeOnly = new Array();

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let canStop = true;

function update(){
    const currentTIme = Date.now();
    elapsedTime = currentTIme - startTime;

    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let second = Math.floor(elapsedTime/1000 % 60);
    let milli = Math.floor(elapsedTime %1000 / 10);
    second = String(second).padStart(2,"0");
    milli = String(milli).padStart(2,"0");
    if (minutes != 0) {
        minutes = String(minutes).padStart(2, "0");
        time.textContent = `${minutes}:${second}:${milli}`;
    } else {
        time.textContent = `${second}:${milli}`;
    }
    time.style.color = "white";
}


function scramble_generator() {
    const legal_moves = ["U", "U2", "D", "D2", "R", "R2", "L", "L2", "F", "F2", "B", "B2"];
    let bfr = legal_moves[Math.floor(Math.random()*12)];
    let scramble = bfr;
    let scrlen = (Math.floor(Math.random()*3) + 18);
    for (let i = 0; i < scrlen; i++) {
        let addition = legal_moves[Math.floor(Math.random()*12)];
        while (addition[0] == bfr[0]) {
            addition = legal_moves[Math.floor(Math.random()*12)];
        }
        bfr = addition;
        scramble = scramble + " " + addition;
    }

    return scramble.trim();
}

document.body.onkeydown = function(e){
    const header = document.querySelectorAll(".header")[0];
    const avg = document.querySelectorAll(".avg")[0];
    const time = document.getElementById("time");
    const visualizer = document.getElementById("scramble-visualization");
    if(e.key == " " || e.code == "Space" || e.keycode == 32){
        if(!isRunning){
            header.style.visibility = "hidden";
            avg.style.visibility = "hidden";    
            visualizer.style.visibility = "hidden";    
            time.style.color = "#15ff00";
        }
        else if(isRunning){
            scramble = scramble_generator();
            document.getElementById("scramble").textContent = scramble;
            document.getElementById("scramble-visualization").setAttribute("scramble", `${scramble}`);
            elapsedTime = Date.now() - startTime;
            isRunning = false;
            clearInterval(timer);
            timeOnly.push(elapsedTime/1000);
            result.set(elapsedTime/1000, scramble);
            if (timeOnly.length >= 5) {
                document.getElementById("ao5").textContent = `Ao5: ${aoCounter(timeOnly, 5)}`;
            }
            if (timeOnly.length >= 12) {
                document.getElementById("ao12").textContent = `Ao12: ${aoCounter(timeOnly, 12)}`;
            }
            header.style.visibility = "visible";
            avg.style.visibility = "visible";
            visualizer.style.visibility = "visible";
        }
    }
}

document.body.onkeyup = function(e){
    // timer logic https://youtu.be/d8-LGhKtzRw?si=XTNhMaDqpizZMowu
    if(e.key == " " || e.code == "Space" || e.keycode == 32){
        if(!isRunning && timer == null) {
            startTime = 0;
            elapsedTime = 0;
            startTime = Date.now() - elapsedTime;
            timer = setInterval(update, 10)
            isRunning = true;
        }
        else if (timer != null) {
            timer = null;
        }
    }
}

function aoCounter(param, n){
    let worse = null;
    let best = null;
    let average = 0;
    let slicedParam = param.slice(param.length-n, param.length);

    for (const i of slicedParam) {
        if (worse == null) {
            worse = i;
        }
        if (best == null) {
            best = i;
        }
        if (i > best) {
            best = i;
        }
        if (i < worse) {
            worse = i;
        }
        average += i;
    }
    average -= (best + worse);
    average = average/(n- 2);
    return average.toFixed(2);
}

function changeState() {
    const cube = document.getElementById("scramble-visualization");
    if (cube.getAttribute("visualization") == "3D") {
        cube.setAttribute("visualization", "2D");
    } else {
        cube.setAttribute("visualization", "3D");
    }
}