const buttons = document.querySelectorAll('.btn');
const btn_turn = document.querySelector('.btn_turn > .turn_player');
const btn_reiniciar = document.querySelector('.btn_reiniciar');
const modal = document.querySelector('.container2');
const next = document.querySelector('.btn_next');
const quit = document.querySelector('.btn_quit');
const win = document.querySelector('.win');
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let options= ["", "", "", "", "", "", "", "", ""];
let player = "X";
let jugada = false;

juegoInicial();

function juegoInicial() {
    buttons.forEach(btn => btn.addEventListener('click',seleccionar ))
    btn_reiniciar.addEventListener('click', reiniciar);
    next.addEventListener('click', reiniciar);
    quit.addEventListener('click', reiniciar);
    btn_turn.textContent = `${player}`;
    jugada = true;
}
function seleccionar() {
    const btnIndex = this.getAttribute('btnIndex');
    if (options[btnIndex] != "" || !jugada) {
        return;
        
    }
    actualizar(this, btnIndex);
    ganador();

}
function actualizar(btn, id) {
    options[id] = player;
    btn.textContent = player;
}
function cambiarJugador() {
    player = (player == "X") ? "O" : "X";
    btn_turn.textContent = `${player}`;
}

function ganador() {
    let partida1 = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const btnA = options[condition[0]];
        const btnB = options[condition[1]];
        const btnC = options[condition[2]];

        if (btnA == "" || btnB == "" || btnC == "") {
            continue;
            
        }
        if (btnA == btnB && btnB == btnC) {
            partida1 = true;
            break;     
        }
    }

    if (partida1) {

        modal.classList.remove('hidden');
        win.textContent = `${player} TAKES THE ROUND`;

    } else if (!options.includes("")) {

        win.textContent = `TIE`;
        modal.classList.remove('hidden');
        jugada = false;
    }
    else{ 
        cambiarJugador();

    }
}

function reiniciar() {
    player = "X";
    options= ["", "", "", "", "", "", "", "", ""];
    btn_turn.textContent = `${player}`;
    buttons.forEach(btn => btn.textContent = "");
    modal.classList.add('hidden');
    jugada = true;
} 

