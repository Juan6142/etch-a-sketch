const mainContainer = document.querySelector("#container");
let mouseDown = false;

document.body.addEventListener("mousedown", () => {
    mouseDown = true;
});

document.body.addEventListener("mouseup", () => {
    mouseDown = false;
});
// changerane
function createDivs() {
    for (let x = 0; x < 256; x++) {
        const div = document.createElement("div");
        div.classList.add("grid");
        div.addEventListener("mouseover", paintDiv);
        div.addEventListener("mousedown", paintDiv);
        mainContainer.appendChild(div);
    }
}

function paintDiv(e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del navegado
    let finalColor = ""
    if (eraser == 1) {
        finalColor = "#FFFFFF"
    } else if (rainbow == 1) {
        finalColor = rainbowMode()
    } else {
        finalColor = color()
    }
    if (e.buttons === 1) {
        // Si el botón izquierdo está presionado, pinta la casilla
        e.target.style.backgroundColor = finalColor;
    }
    if (!mouseDown) return;
    // Verifica que solo el botón izquierdo del mouse está presionado
    if (e.buttons !== 1 || e.button !== 0) return;
    e.target.style.backgroundColor = finalColor;
}

// color 

const colorPicker = document.querySelector("#colorpicker")
colorPicker.addEventListener("input", colorPicker)

function color() {
    const currentColor = colorPicker.value;
    console.log("Current color: " + currentColor)
    return currentColor
}

// eraser
const btnEraser = document.querySelector("#eraser")
let eraser = 0
btnEraser.addEventListener("click", () => {
    eraser = !eraser
    if (eraser == 1) {
        btnEraser.classList.add("eraser-active")
    } else {
        btnEraser.classList.remove("eraser-active")
    }
});

//rainbow
const btnRainbow = document.querySelector("#rainbow")
let rainbow = 0
btnRainbow.addEventListener("click", () => {
    rainbow = !rainbow
    if (rainbow == 1) {
        btnRainbow.classList.add("rainbow-active")
    } else {
        btnRainbow.classList.remove("rainbow-active")
    }
});

function rainbowMode() {
    const red = Math.floor(Math.random() * 1 * 255)
    const green = Math.floor(Math.random() * 1 * 255)
    const blue = Math.floor(Math.random() * 1 * 255)

    const redStr = red.toString()
    const greenStr = green.toString()
    const blueStr = blue.toString()

    const rgb = "rgb" + "(" + redStr + ", " + greenStr + ", " + blueStr + ")"
    return rgb
}

//range
const rangeValue = document.querySelector("#squares")
const rangeText = document.querySelector("#range-text")
// mover el input tambien es un evento
// la funcion devuelve el valor actual
function changeRange() {
    let rangeVal = rangeValue.value
    rangeText.textContent = rangeVal + " x " + rangeVal 
    console.log(rangeVal)
    return rangeVal
}

rangeValue.addEventListener("input", changeRange)
//usar un fauncion fantasama el el bucle de arriba para hacer todo ahi, declerar 
// y usar los valores para hacer el calculo de la nueva cuadricula ej size * 2

createDivs();

