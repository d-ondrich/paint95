var Paint = {}

Paint.createElement = function(){
    $('<div/>').attr('id','programHome').appendTo('#mainDiv');
    $('<div/>').attr('id', 'functionalityWrapper').appendTo($('#programHome'));
    $('<div/>').attr('id', 'paintBoard').appendTo($('#programHome'));
    $('<div/>').attr('id', 'colorWrapper').appendTo($('#programHome'));

    $('<div/>').attr('id', 'paletteWrapper').appendTo($('#paintBoard'));
    $('<canvas width="500" height="500"/>').attr('id', 'canvasArea').appendTo($('#paintBoard'));
    Paint.c = $("#canvasArea")[0];
    Paint.ctx = $("#canvasArea")[0].getContext('2d');

    $('<div/>').attr('id', 'colorPalette').appendTo($('#colorWrapper'));

    $('<button/>').attr('id', 'eraserButton').text('Eraser').click(Paint.colorSelection).appendTo($('#paletteWrapper'));
    $('#eraserButton').isSelected = false;

    $('<div/>').attr('id', 'brushSizeWrapper').appendTo($('#paletteWrapper'));

    $('<button/>').attr('id', 'plusButton').text('+').click(Paint.increaseBrushSize).appendTo($('#brushSizeWrapper'));
    $('<div/>').attr('id', 'brushSizeDisplay').appendTo($('#brushSizeWrapper'));
    $('<div/>').attr('id', 'brushSizeExample').css({'border-radius': '5px/5px'}).appendTo($('#brushSizeDisplay'));
    $('<button/>').attr('id', 'minusButton').text('-').click(Paint.decreaseBrushSize).appendTo($('#brushSizeWrapper'));

    $('<button/>').attr('id', 'clearButton').text('Clear').click(Paint.clearCanvas).appendTo($('#paletteWrapper'));
    $('<button/>').attr('id', 'saveButton').text('Save').click(Paint.saveCanvas).appendTo($('#paletteWrapper'));
    $('<button/>').attr('id', 'loadButton').text('Load').click(Paint.loadCanvas).appendTo($('#paletteWrapper'));

    $('#canvasArea').on('mousedown', Paint.paintSingleColor)
    .on('mousemove', Paint.paintColor)
    .on('mouseup', Paint.stop)
    .on('mouseout', Paint.stop);
}

Paint.createColorPallette = function(){
    Paint.colorArray = ["black", "white", "blue", "red", "green", "orange", "pink", "purple" ];
    for (var k = 0; k < Paint.colorArray.length; k++){
        var colorButton = $('<button/>');
        colorButton.addClass("colorButton");
        colorButton.css({"background-color":Paint.colorArray[k], 'height': '30px', 'width': '30px'});
        colorButton.isSelected = false;
        colorButton.attr('id',Paint.colorArray[k]);
        colorButton.click(Paint.colorSelection);
        $("#colorPalette").append(colorButton);
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

Paint.getMousePos = function(canvas, evt) {
    var rect = Paint.c.getBoundingClientRect(), // abs. size of element
        scaleX = Paint.c.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = Paint.c.height / rect.height;  // relationship bitmap vs. element for Y
  
    return {
        x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
  }

Paint.addClickPosition = function(x, y, dragging){
    Paint.clickX.push(x);
    Paint.clickY.push(y);
    Paint.clickDrag.push(dragging);
}

Paint.redraw = function() {
    Paint.ctx.clearRect(0, 0, Paint.ctx.width, Paint.ctx.height); // Clears the canvas

    Paint.ctx.strokeStyle = Paint.currentPaintBrushColor;
    Paint.ctx.lineJoin = "round";
    Paint.ctx.lineWidth = Paint.brushSize;
    Paint.ctx.stroke();        
    for(var i=0; i < Paint.clickX.length; i++) {		
        Paint.ctx.beginPath();
        if(Paint.clickDrag[i] && i){
            Paint.ctx.moveTo(Paint.clickX[i-1], Paint.clickY[i-1]);
        }else{
            Paint.ctx.moveTo(Paint.clickX[i], Paint.clickY[i]);
        }
        Paint.ctx.lineTo(Paint.clickX[i], Paint.clickY[i]);
    }
    Paint.ctx.closePath();
  }

Paint.paintSingleColor = function(event){
    var posistion = Paint.getMousePos(Paint.c, event);
    Paint.allowPaint = true;
    Paint.addClickPosition(posistion.x, posistion.y);
    Paint.redraw();
};

Paint.paintColor = function(event){
    if (Paint.allowPaint){
        var posistion = Paint.getMousePos(Paint.c, event);
        Paint.addClickPosition(posistion.x, posistion.y, true);
        Paint.redraw();
    }
};

Paint.stop = function(){
    Paint.allowPaint = false;
}

Paint.increaseBrushSize = function(){
    if (parseInt(Paint.brushSize) < 25){
        Paint.brushSize += 1
        $('#brushSizeExample').css({'height':Paint.brushSize + 'px'});
        $('#brushSizeExample').css({'width':Paint.brushSize + 'px'});
    }
}

Paint.decreaseBrushSize = function(){
    if (parseInt(Paint.brushSize) > 1){
        Paint.brushSize -= 1
        $('#brushSizeExample').css({'height':Paint.brushSize + 'px'});
        $('#brushSizeExample').css({'width':Paint.brushSize + 'px'});
    }
}

Paint.clearCanvas = function(){
    Paint.ctx.clearRect(0, 0, Paint.c.width, Paint.c.height);
    Paint.clickX = [];
    Paint.clickY = [];
    Paint.clickDrag = [];
}

Paint.saveCanvas = function(){
    var canvasSaveName = prompt("Enter file name:");
    var canvasAreaVar = [Paint.clickX, Paint.clickY, Paint.clickDrag];
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
    Paint.clickX = JSON.parse(localStorage.getItem(canvasLoadName))[0];
    Paint.clickY = JSON.parse(localStorage.getItem(canvasLoadName))[1];
    Paint.clickDrag = JSON.parse(localStorage.getItem(canvasLoadName))[2];
    Paint.redraw()
    if (canvasLoadName != "null"){
        $("#fileName").html(JSON.parse(canvasLoadName));
    }
}

Paint.init = function(){
    Paint.allowPaint = false;
    Paint.clickX = new Array();
    Paint.clickY = new Array();
    Paint.clickDrag = new Array();
    Paint.brushSize = 5;
    Paint.currentPaintBrushColor = 'black';
    Paint.createElement();
    Paint.createColorPallette();
}

$(document).ready(Paint.init);



