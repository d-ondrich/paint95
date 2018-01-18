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
    $('<div/>').attr('id', 'brushSizeExample').appendTo($('#brushSizeDisplay'));
    $('<button/>').attr('id', 'minusButton').text('-').click(Paint.decreaseBrushSize).appendTo($('#brushSizeWrapper'));

    $('<button/>').attr('id', 'clearButton').text('Clear').click(Paint.clearCanvas).appendTo($('#paletteWrapper'));
    $('<button/>').attr('id', 'saveButton').text('Save').click(Paint.saveCanvas).appendTo($('#paletteWrapper'));
    $('<button/>').attr('id', 'loadButton').text('Load').click(Paint.loadCanvas).appendTo($('#paletteWrapper'));

    $('#canvasArea').on('click',Paint.paintSingleColor)
    .on('mousedown', Paint.start)
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


Paint.paintColor = function(event){
    if (Paint.allowPaint){
        var canvasAreaVar = $('#canvasArea');
        var brushDiv = $('<div/>'); 
        brushDiv.css({'height':Paint.brushSize,'width':Paint.brushSize,
        'background-color':Paint.currentPaintBrushColor,'position':'absolute','top':(event.pageY - this.offsetTop) + "px",
        'left':(event.pageX - this.offsetLeft) + "px"});
        //brushDiv.style.height = Paint.brushSize;
        //brushDiv.style.width = Paint.brushSize;
        //brushDiv.style.backgroundColor = Paint.currentPaintBrushColor;
        //brushDiv.style.position = 'absolute';
        // brushDiv.style.top = event.pageY - this.offsetTop + "px";
        // brushDiv.style.left = event.pageX - this.offsetLeft + "px";
        canvasAreaVar.append(brushDiv);
    }
};

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
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

Paint.redraw = function() {
    Paint.ctx.clearRect(0, 0, Paint.ctx.width, Paint.ctx.height); // Clears the canvas
    
    Paint.ctx.strokeStyle = "#df4b26";
    Paint.ctx.lineJoin = "round";
    Paint.ctx.lineWidth = Paint.brushSize;
              
    for(var i=0; i < clickX.length; i++) {		
        Paint.ctx.beginPath();
      if(clickDrag[i] && i){
        Paint.ctx.moveTo(clickX[i-1], clickY[i-1]);
       }else{
        Paint.ctx.moveTo(clickX[i]-1, clickY[i]);
       }
       Paint.ctx.lineTo(clickX[i], clickY[i]);
       Paint.ctx.closePath();
       Paint.ctx.stroke();
    }
  }

Paint.paintSingleColor = function(event){
    // var canvasAreaVar = $('#canvasArea');
    // var brushDiv = $('<div/>'); 
    // brushDiv.css({'height':Paint.brushSize,'width':Paint.brushSize,
    // 'background-color':Paint.currentPaintBrushColor,'position':'absolute','top':(event.pageY - this.offsetTop) + "px",
    // 'left':(event.pageX - this.offsetLeft) + "px"});
    var posistion = Paint.getMousePos(Paint.c, event);

    Paint.ctx.fillStyle = Paint.currentPaintBrushColor;
    Paint.ctx.fillRect (posistion.x, posistion.y, Paint.brushSize, Paint.brushSize);

    //brushDiv.style.height = Paint.brushSize;
    //brushDiv.style.width = Paint.brushSize;
    //brushDiv.style.backgroundColor = Paint.currentPaintBrushColor;
    //brushDiv.style.position = 'absolute';
    // brushDiv.style.top = event.pageY - this.offsetTop + "px";
    // brushDiv.style.left = event.pageX - this.offsetLeft + "px";
    // canvasAreaVar.append(brushDiv);
};

Paint.start = function(){
    Paint.allowPaint = true;
}

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
    Paint.clickX = new Array();
    Paint.clickY = new Array();
    Paint.clickDrag = new Array();
    Paint.brushSize = 5;
    Paint.currentPaintBrushColor = 'black';
    Paint.createElement();
    Paint.createColorPallette();
}

$(document).ready(Paint.init);



