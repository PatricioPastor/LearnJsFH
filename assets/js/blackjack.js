

let mazo                 = [];
const simbolos           = ["C", "D", "H", "S"];
const simbolosEspeciales = ["A", "J", "Q", "K"];
let puntajeJugador       = 0;
let puntajeCOM           = 0;


const valJugador1      = document.querySelector('#Jugador1');
const valCOM           = document.querySelector('#COM');
const contCartasJ1     = document.querySelector('#jugadorCartas');
const contCartasCOM    = document.querySelector('#com-cartas');
const btnPedirCarta    = document.querySelector('#btnPedir');
const btnDetener       = document.querySelector('#btnDetener');

const crearMazo = () => {
    mazo = [];

    for (let i = 2; i <= 10; i++) {
        for (palo of simbolos) {
            mazo.push(i + palo);
        }
    }
    for (let i = 0; i <= 3; i++) {
        for (simb of simbolosEspeciales) {
            mazo.push(simb + simbolos[i]);
        }
    }
    return _.shuffle(mazo);
}

mazo = crearMazo();

const darCarta = () => {
    if (mazo.length === 0) {
        throw "No hay mas cartas"
    }
    return mazo.pop();

}

const valorCarta = (carta) => {
    let valor = carta.substring(0, carta.length - 1)

    valor = (isNaN(valor)) ? (valor = (valor != 'A') ? 10 : 11)
                           : (valor * 1)
    return valor
}

const darCartaCOM = () => {
    do {
        let carta   = darCarta()
        const value = valorCarta(carta);
        
        puntajeCOM = puntajeCOM + value;

        valCOM.innerText = puntajeCOM

        const cartaCOM = document.createElement('img')
        cartaCOM.src = `assets/cartas/${carta}.png`
        cartaCOM.classList.add("carta");

        contCartasCOM.appendChild(cartaCOM)
        if(puntajeCOM >= 21){
            btnDetener.disabled = true;
            break;
        }
    } while ((puntajeJugador > puntajeCOM) && (puntajeCOM <= 21));

    
}

const darCartaNotificacion = () => {
    let carta   = darCarta()
    const value = valorCarta(carta);
    
    puntajeJugador = puntajeJugador + value;

    valJugador1.innerText = puntajeJugador

    const cartaJugador1 = document.createElement('img')
    cartaJugador1.src = `assets/cartas/${carta}.png`
    cartaJugador1.classList.add("carta");

    contCartasJ1.appendChild(cartaJugador1)

    if (puntajeJugador > 21) {
        alert("Pasaste 21, Perdiste");
        btnPedirCarta.disabled = true;
        btnDetener.disabled    = true;
    } else if (puntajeJugador === 21) {
        btnPedirCarta.disabled = true;
        btnDetener.disabled    = true;
        darCartaCOM();
    } else {
        btnPedirCarta.disabled = false;
    }

}

const detenerDar = ()=>{
    btnPedirCarta.disabled = true;
    darCartaCOM();
    btnDetener.disabled = true;

    if(puntajeCOM > 21){
        return alert("GANASTE!!");
    }else{
        return alert("Perdiste");
    }
}

const nuevoJuego = ()=>{
    puntajeJugador = 0;
    puntajeCOM     = 0;
    
    const cartasUsadas = document.querySelectorAll("img");

    btnPedirCarta.disabled = false;
    btnDetener.disabled    = false;
    
    for(cartaUsa of cartasUsadas){
        cartaUsa.remove();
    }
    
    mazo = crearMazo();
    
    valCOM.innerText      = puntajeCOM
    valJugador1.innerText = puntajeJugador
}