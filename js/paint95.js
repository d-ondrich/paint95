var functionalityWrapperDiv = document.createElement('div');
functionalityWrapperDiv.setAttribute('id', 'functionalityWrapper');
functionalityWrapperDiv.setAttribute('height', '300px');

functionalityWrapperDiv.setAttribute('background-color', 'rgb(156, 154, 154);');

document.getElementById('programHome').appendChild(functionalityWrapperDiv);

var paintBoardDiv = document.getElementById('paintBoard');
paintBoardDiv.style = "width: 100%;";


var canvas = document.createElement('div');
canvas.setAttribute('id', 'canvasArea');
canvas.style = "background: white; height: 500px; width: 500px; border: solid 2px black; position:relative;";
paintBoardDiv.appendChild(canvas);

var colorArray = ["black", "white", "blue", "red", "green", "orange", "pink", "purple" ]

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

var canvasAreaVar = document.getElementById('canvasArea');
canvasAreaVar.addEventListener('click',paintColor);


function paintColor(e){
    var canvasAreaVar = document.getElementById('canvasArea');
        var brushDiv = document.createElement('div'); 
        brushDiv.style.height = brushSize;
        brushDiv.style.width = brushSize;
        brushDiv.style.backgroundColor = currentPaintBrushColor;
        brushDiv.style.position = 'absolute';
        brushDiv.style.top = e.pageY - this.offsetTop + "px";
        brushDiv.style.left = e.pageX - this.offsetLeft + "px";
        canvasAreaVar.appendChild(brushDiv);
};

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