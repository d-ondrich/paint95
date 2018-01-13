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

    $('<button/>').attr('id', 'plusButton').text('+').click(Paint.increaseBrushSize).appendTo($('#brushSizeWrapper'));
    $('<div/>').attr('id', 'brushSizeDisplay').appendTo($('#brushSizeWrapper'));
    $('<div/>').attr('id', 'brushSizeExample').appendTo($('#brushSizeDisplay'));
    $('<button/>').attr('id', 'minusButton').text('-').click(Paint.decreaseBrushSize).appendTo($('#brushSizeWrapper'));

    $('<button/>').attr('id', 'clearButton').text('Clear').click(Paint.clearCanvas).appendTo($('#paletteWrapper'));
    $('<button/>').attr('id', 'saveButton').text('Save').click(Paint.saveCanvas).appendTo($('#paletteWrapper'));
    $('<button/>').attr('id', 'loadButton').text('Load').click(Paint.loadCanvas).appendTo($('#paletteWrapper'));

    $('#canvasArea').on('mousedown', Paint.start)
    .on('mousedown',Paint.paintSingleColor)
    .on('mousemove', Paint.paintColor)
    .on('mouseup', Paint.stop)
    .on('mouseout', Paint.stop)
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

Paint.start = function(){
    Paint.allowPaint = true;
}

Paint.paintColor = function(event){
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

Paint.paintSingleColor = function(event){
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

Paint.stop = function(){
    Paint.allowPaint = false;
}

Paint.increaseBrushSize = function(){
    if (parseInt(Paint.brushSize) < 25){
        Paint.brushSize = parseInt(Paint.brushSize) + 1;
        Paint.brushSize = Paint.brushSize + 'px';
        document.getElementById('brushSizeExample').style.height = Paint.brushSize;
        document.getElementById('brushSizeExample').style.width = Paint.brushSize;
    }
}

Paint.decreaseBrushSize = function(){
    if (parseInt(Paint.brushSize) > 1){
        Paint.brushSize = parseInt(Paint.brushSize) - 1;
        Paint.brushSize = Paint.brushSize + 'px';
        $('#brushSizeExample').css({'height':Paint.brushSize});
        $('#brushSizeExample').css({'width':Paint.brushSize});
    }
}

Paint.clearCanvas = function(){
    $('#canvasArea').html("");
}

Paint.saveCanvas = function(){
    var canvasSaveName = prompt("Enter file name:");
    var canvasAreaVar = $('#canvasArea').html()
    canvasSaveName = JSON.stringify(canvasSaveName);
    canvasAreaVar = JSON.stringify(canvasAreaVar);
    localStorage.setItem(canvasSaveName, canvasAreaVar);
    if (canvasSaveName != "null"){
        $("#fileName").html(JSON.parse(canvasSaveName));
    }
}

Paint.loadCanvas = function(){
    var canvasLoadName = prompt("Enter file name to load:");
    canvasLoadName = JSON.stringify(canvasLoadName);
    $('#canvasArea').html(JSON.parse(localStorage.getItem(canvasLoadName)));
    if (canvasLoadName != "null"){
        $("#fileName").html(JSON.parse(canvasLoadName));
    }
}

Paint.init = function(){
    Paint.allowPaint = false;
    Paint.brushSize = '5px';
    Paint.currentPaintBrushColor = 'black';
    Paint.createElement();
    Paint.createColorPallette();
}

$(document).ready(Paint.init);



