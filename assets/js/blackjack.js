

let mazo                 = [];
const simbolos           = ["C", "D", "H", "S"];
const simbolosEspeciales = ["A", "J", "Q", "K"];
let puntajeJugador       = 0;
let puntajeCOM           = 0;


const valJugadorHTML   = document.querySelector('#Jugador1');
const contCartas       = document.querySelector('#jugadorCartas');
const btnPedirCarta    = document.querySelector('#btnPedir');

const crearMazo = ()=>{
    for (let i = 2; i <= 10; i++) {
        for (palo of simbolos){
            mazo.push(i + palo);
        }
    }
    for (let i = 0; i <= 3; i++){
        for ( simb of simbolosEspeciales){
            mazo.push(simb + simbolos[i]);
        }
    }
    return _.shuffle(mazo); 
}

mazo = crearMazo();

const darCarta = ()=>{
    if (mazo.length === 0){
        throw "No hay mas cartas"
    }
    return mazo.pop() ;
    
}

const valorCarta = ( carta )=>{
    let valor = carta.substring(0, carta.length - 1)

    valor = (isNaN(valor)) ? (valor = (valor != 'A') ? 10 : 11) 
                           : (valor * 1)
    return valor
}

const darCartaNotificacion = ()=>{
    let carta = darCarta()
    const value = valorCarta(carta);
    puntajeJugador = puntajeJugador + value;

    valJugadorHTML.innerText = puntajeJugador

    const cartaJugador1 = document.createElement('img')
    cartaJugador1.src = `assets/cartas/${carta}.png`
    cartaJugador1.classList.add("carta");

    contCartas.appendChild(cartaJugador1)
    
    if ( puntajeJugador > 21){
        alert("Pasaste 21, Perdiste");
        btnPedirCarta.disabled = true;
    }else if ( puntajeJugador === 21) {
        alert("Felicidades, has conseguido BlackJack")
        btnPedirCarta.disabled = true;
    }else{
        btnPedirCarta.disabled = false;
    }

} 


