// timer logic https://youtu.be/d8-LGhKtzRw?si=XTNhMaDqpizZMowu


document.getElementById("scramble").textContent = scramble_generator();

document.body.onkeydown = function(e){
    const header = document.querySelectorAll(".header")[0];
    const avg = document.querySelectorAll(".avg")[0];
    const time = document.getElementById("time");
    if(e.key == " " || e.code == "Space" || e.keycode == 32){
        if(!isRunning){
            header.style.visibility = "hidden";
            avg.style.visibility = "hidden";
            time.style.color = "#15ff00";
        }
        else if(isRunning){
            document.getElementById("scramble").textContent = scramble_generator();
            elapsedTime = Date.now() - startTime;
            isRunning = false;
            clearInterval(timer);
            header.style.visibility = "visible";
            avg.style.visibility = "visible";
        }
    }
}

document.body.onkeyup = function(e){
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

const time = document.getElementById("time");

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

