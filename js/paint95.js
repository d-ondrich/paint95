var Paint = {}

Paint.createElement = function(){
    $('<div/>').attr('id','programHome').appendTo('#mainDiv');
    $('<div/>').attr('id', 'functionalityWrapper').appendTo($('#programHome'));
    $('<div/>').attr('id', 'paintBoard').appendTo($('#programHome'));
    $('<div/>').attr('id', 'colorWrapper').appendTo($('#programHome'));

    $('<div/>').attr('id', 'paletteWrapper').appendTo($('#paintBoard'));
    $('<div/>').attr('id', 'canvasArea').appendTo($('#paintBoard'));

    $('<div/>').attr('id', 'colorPalette').appendTo($('#colorWrapper'));

    $('<button/>').attr('id', 'eraserButton').text('Eraser').click(Paint.colorSelection).appendTo($('#paletteWrapper'));
    $('#eraserButton').isSelected = false;

    $('<div/>').attr('id', 'brushSizeWrapper').appendTo($('#paletteWrapper'));

    $('<button/>').attr('id', 'plusButton').text('+').click(increaseBrushSize).appendTo($('#brushSizeWrapper'));
    $('<div/>').attr('id', 'brushSizeDisplay').appendTo($('#brushSizeWrapper'));
    $('<div/>').attr('id', 'brushSizeExample').appendTo($('#brushSizeDisplay'));
    $('<button/>').attr('id', 'minusButton').text('-').click(decreaseBrushSize).appendTo($('#brushSizeWrapper'));

    $('<button/>').attr('id', 'clearButton').text('Clear').click(clearCanvas).appendTo($('#paletteWrapper'));
    $('<button/>').attr('id', 'saveButton').text('Save').click(saveCanvas).appendTo($('#paletteWrapper'));
    $('<button/>').attr('id', 'loadButton').text('Load').click(loadCanvas).appendTo($('#paletteWrapper'));
}

Paint.createColorPallette = function(){
    Paint.colorArray = ["black", "white", "blue", "red", "green", "orange", "pink", "purple" ];

    for (var k = 0; k < Paint.colorArray.length; k++){
        var colorButton = document.createElement('button');
        colorButton.class = "colorButton";
        colorButton.style= "background-Color: " + Paint.colorArray[k] + "; height: 30px; width: 30px;";
        colorButton.isSelected = false;
        colorButton.id = Paint.colorArray[k];
        colorButton.addEventListener('click', Paint.colorSelection);
        document.getElementById("colorPalette").appendChild(colorButton);
    }
}


Paint.colorSelection = function(){
    if ($(this).attr('id') == 'eraserButton'){
        Paint.currentPaintBrushColor = 'white';
    } else {
    Paint.currentPaintBrushColor = $(this).attr('id');
    $('#brushSizeExample').css({'background-color':Paint.currentPaintBrushColor});
    }
}


function start(){
    Paint.allowPaint = true;
    //enablePaint = setInterval(paintColor, 100);
}

function paintColor(event){
    if (Paint.allowPaint){
        var canvasAreaVar = document.getElementById('canvasArea');
            var brushDiv = document.createElement('div'); 
            brushDiv.style.height = Paint.brushSize;
            brushDiv.style.width = Paint.brushSize;
            brushDiv.style.backgroundColor = Paint.currentPaintBrushColor;
            brushDiv.style.position = 'absolute';
            brushDiv.style.top = event.pageY - this.offsetTop + "px";
            brushDiv.style.left = event.pageX - this.offsetLeft + "px";
            canvasAreaVar.appendChild(brushDiv);
    }
};

function paintSingleColor(event){
    var canvasAreaVar = document.getElementById('canvasArea');
        var brushDiv = document.createElement('div'); 
        brushDiv.style.height = Paint.brushSize;
        brushDiv.style.width = Paint.brushSize;
        brushDiv.style.backgroundColor = Paint.currentPaintBrushColor;
        brushDiv.style.position = 'absolute';
        brushDiv.style.top = event.pageY - this.offsetTop + "px";
        brushDiv.style.left = event.pageX - this.offsetLeft + "px";
        canvasAreaVar.appendChild(brushDiv);
};

function stop(){
    //clearInterval(enablePaint);
    Paint.allowPaint = false;
}

$('#canvasArea').on('mousedown', start)
.on('mousedown',paintSingleColor)
.on('mousemove', paintColor)
.on('mouseup', stop)
.on('mouseout', stop)




function increaseBrushSize(){
    if (parseInt(Paint.brushSize) < 25){
        Paint.brushSize = parseInt(Paint.brushSize) + 1;
        Paint.brushSize = Paint.brushSize + 'px';
        document.getElementById('brushSizeExample').style.height = Paint.brushSize;
        document.getElementById('brushSizeExample').style.width = Paint.brushSize;
    }
}



function decreaseBrushSize(){
    if (parseInt(Paint.brushSize) > 1){
        Paint.brushSize = parseInt(Paint.brushSize) - 1;
        Paint.brushSize = Paint.brushSize + 'px';
        document.getElementById('brushSizeExample').style.height = Paint.brushSize;
        document.getElementById('brushSizeExample').style.width = Paint.brushSize;
    }
}



function clearCanvas(){
    document.getElementById('canvasArea').innerHTML = "";
}



function saveCanvas(){
    var canvasSaveName = prompt("Enter file name:");
    var canvasAreaVar = document.getElementById('canvasArea').innerHTML;
    canvasSaveName = JSON.stringify(canvasSaveName);
    canvasAreaVar = JSON.stringify(canvasAreaVar);
    localStorage.setItem(canvasSaveName, canvasAreaVar);
    if (canvasSaveName != "null"){
        document.getElementById("fileName").innerHTML = JSON.parse(canvasSaveName);
    }
}



function loadCanvas(){
    var canvasLoadName = prompt("Enter file name to load:");
    canvasLoadName = JSON.stringify(canvasLoadName);
    document.getElementById('canvasArea').innerHTML = JSON.parse(localStorage.getItem(canvasLoadName));
    if (canvasLoadName != "null"){
        document.getElementById("fileName").innerHTML = JSON.parse(canvasLoadName);
    }
}

Paint.init = function(){
    Paint.allowPaint = false;
    Paint.brushSize = '5px';
    Paint.currentPaintBrushColor = 'black';
    Paint.createElement();
    Paint.createColorPallette();


}


Paint.init()

