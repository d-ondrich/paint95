var programHomeDiv = document.createElement('div');
programHomeDiv.id = 'programHome';
document.getElementById('mainDiv').appendChild(programHomeDiv);

var functionalityWrapperDiv = document.createElement('div');
functionalityWrapperDiv.setAttribute('id', 'functionalityWrapper');
functionalityWrapperDiv.setAttribute('height', '300px');
functionalityWrapperDiv.setAttribute('background-color', 'rgb(156, 154, 154);');
document.getElementById('programHome').appendChild(functionalityWrapperDiv);

var paintBoardVar = document.createElement('div');
paintBoardVar.id = 'paintBoard';
paintBoardVar.style = "width: 100%;";
document.getElementById('programHome').appendChild(paintBoardVar);

var paletteWrapperVar = document.createElement('div');
paletteWrapperVar.id = 'paletteWrapper';
document.getElementById('paintBoard').appendChild(paletteWrapperVar);

var canvas = document.createElement('div');
canvas.setAttribute('id', 'canvasArea');
canvas.style = "background: white; height: 500px; width: 500px; border: solid 2px black; position:relative;";
paintBoardVar.appendChild(canvas);

var colorArray = ["black", "white", "blue", "red", "green", "orange", "pink", "purple" ];

var colorWrapperVar = document.createElement('div');
colorWrapperVar.id = 'colorWrapper';
document.getElementById('programHome').appendChild(colorWrapperVar);

var colorPaletteVar = document.createElement('div');
colorPaletteVar.id = 'colorPalette';
document.getElementById('colorWrapper').appendChild(colorPaletteVar);

for (var k = 0; k < 8; k++){
    var colorButton = document.createElement('button');
    colorButton.class = "colorButton";
    colorButton.backgroundColor = colorArray[k];
    colorButton.isSelected = false;
    colorButton.id = colorArray[k];
    colorButton.innerHTML = colorArray[k];
    colorButton.addEventListener('click', colorSelection);
    document.getElementById("colorPalette").appendChild(colorButton);
}
var currentPaintBrushColor = 'black';
function colorSelection(){
    if (this.id == 'eraserButton'){
        currentPaintBrushColor = 'white';
    } else {
    currentPaintBrushColor = this.id;
    document.getElementById('brushSizeExample').style.backgroundColor = currentPaintBrushColor;
    }
}
var brushSize = '5px';

// var enablePaint;

// function start(event){
//     enablePaint = setInterval(function() {paintColor(event)}, 100);
// }

function paintColor(event){
    var canvasAreaVar = document.getElementById('canvasArea');
        var brushDiv = document.createElement('div'); 
        brushDiv.style.height = brushSize;
        brushDiv.style.width = brushSize;
        brushDiv.style.backgroundColor = currentPaintBrushColor;
        brushDiv.style.position = 'absolute';
        brushDiv.style.top = event.pageY - this.offsetTop + "px";
        brushDiv.style.left = event.pageX - this.offsetLeft + "px";
        canvasAreaVar.appendChild(brushDiv);
};

// function stop(){
//     clearInterval(enablePaint);
// }

var canvasAreaVar = document.getElementById('canvasArea');
//canvasAreaVar.addEventListener('mousedown', start);
canvasAreaVar.addEventListener('click',paintColor);
//canvasAreaVar.addEventListener('mouseup', stop);

var eraserButtonVar = document.createElement('button');
eraserButtonVar.id = 'eraserButton';
eraserButtonVar.innerHTML = "Eraser";
eraserButtonVar.isSelected = false;
eraserButtonVar.addEventListener('click', colorSelection);
document.getElementById('paletteWrapper').appendChild(eraserButtonVar);

var brushSizeWrapperVar = document.createElement('div');
brushSizeWrapperVar.id = 'brushSizeWrapper';
brushSizeWrapperVar.style = 'display: flex;'
document.getElementById('paletteWrapper').appendChild(brushSizeWrapperVar);

var plusButtonVar = document.createElement('button');
plusButtonVar.id = 'plusButton';
plusButtonVar.innerHTML = "+";
plusButtonVar.addEventListener('click', increaseBrushSize);
document.getElementById('brushSizeWrapper').appendChild(plusButtonVar);

function increaseBrushSize(){
    if (parseInt(brushSize) < 25){
        brushSize = parseInt(brushSize) + 1;
        brushSize = brushSize + 'px';
        document.getElementById('brushSizeExample').style.height = brushSize;
        document.getElementById('brushSizeExample').style.width = brushSize;
    }
}

var brushSizeDisplayVar = document.createElement('div');
brushSizeDisplayVar.style = 'height: 35px; width: 35px; background-color: white; border: solid 2px black;';
brushSizeDisplayVar.style.display = 'flex';
brushSizeDisplayVar.style.justifyContent = 'center';
brushSizeDisplayVar.style.alignItems = 'center';
brushSizeDisplayVar.id = 'brushSizeDisplay';
document.getElementById('brushSizeWrapper').appendChild(brushSizeDisplayVar);

var minusButtonVar = document.createElement('button');
minusButtonVar.id = 'minusButton';
minusButtonVar.innerHTML = "-";
minusButtonVar.addEventListener('click', decreaseBrushSize);
document.getElementById('brushSizeWrapper').appendChild(minusButtonVar);

function decreaseBrushSize(){
    if (parseInt(brushSize) > 1){
        brushSize = parseInt(brushSize) - 1;
        brushSize = brushSize + 'px';
        document.getElementById('brushSizeExample').style.height = brushSize;
        document.getElementById('brushSizeExample').style.width = brushSize;
    }
}

var brushSizeExampleVar = document.createElement('div');
brushSizeExampleVar.id = 'brushSizeExample';
brushSizeExampleVar.style = 'height: 5px; width: 5px; background-color: black;';
document.getElementById('brushSizeDisplay').appendChild(brushSizeExampleVar);

var clearButtonVar = document.createElement('button');
clearButtonVar.id = 'clearButton';
clearButtonVar.innerHTML = "Clear";
clearButtonVar.addEventListener('click', clearCanvas);
document.getElementById('paletteWrapper').appendChild(clearButtonVar);

function clearCanvas(){
    document.getElementById('canvasArea').innerHTML = "";
}