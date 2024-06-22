document.getElementById("scramble").textContent = scramble_generator();

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

