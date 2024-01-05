const mainContainer = document.querySelector("#container");

// mouse down variable filter active
let mouseDown = false;
document.body.addEventListener("mousedown", () => {
    mouseDown = true;
});
document.body.addEventListener("mouseup", () => {
    mouseDown = false;
});


// change input range
let rangeValue = document.querySelector("#squares")
const rangeText = document.querySelector("#range-text")
function changeRange() {
    let rangeVal = rangeValue.value
    rangeText.textContent = rangeVal + " x " + rangeVal    
    console.log("current area: ", rangeVal)

    return rangeVal * rangeVal
}

// clear grid on less range
function clearGrid() {
    // Eliminar todos los elementos hijos de mainContainer
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    }
}

const CONTAINER_SIZE = 512;

function addGridEventListeners(div) {
    div.addEventListener("mouseover", paintDiv);
    div.addEventListener("mousedown", paintDiv);
}

//create squares
function createDivs() {
    let area = changeRange();


    const squareSize = CONTAINER_SIZE / Math.sqrt(area);
    for (let x = 0; x < area ; x++) {
        
        const div = document.createElement("div");
        div.classList.add("grid");
        div.style.width = squareSize + "px";
        div.style.height = squareSize + "px";
        addGridEventListeners(div)
        
        mainContainer.appendChild(div);   
    }
}
rangeValue.addEventListener("input", () => {
    clearGrid();
    createDivs();
});

//paintdiv + mouse filters detectors
let finalColor = ""
function paintDiv(e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del navegador
    
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

//clear

const clearButton = document.querySelector("#clear")
clearButton.addEventListener("click", reset)

function reset() {
    rangeValue.value = 16
    clearGrid()
    createDivs()
    btnEraser.classList.remove("eraser-active")
    eraser = 0
    btnRainbow.classList.remove("rainbow-active")
    rainbow = 0
}

createDivs()