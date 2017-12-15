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
var currentPaintBrushColor;
function colorSelection(){
    currentPaintBrushColor = this.id;
}

var paint = {};


var canvasAreaVar = document.getElementById('canvasArea');
canvasAreaVar.addEventListener('click',paintColor);



 function paintColor(e){
    var canvasAreaVar = document.getElementById('canvasArea');
        var brushDiv = document.createElement('div'); 
        brushDiv.style.height = '5px';
        brushDiv.style.width = '5px';
        brushDiv.style.backgroundColor = currentPaintBrushColor;
        brushDiv.style.position = 'absolute';
        brushDiv.style.top = e.pageY - this.offsetTop + "px";
        brushDiv.style.left = e.pageX - this.offsetLeft + "px";
        canvasAreaVar.appendChild(brushDiv);
};

