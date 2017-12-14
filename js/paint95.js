var functionalityWrapperDiv = document.createElement('div');
functionalityWrapperDiv.setAttribute('id', 'functionalityWrapper');
functionalityWrapperDiv.setAttribute('height', '300px');

functionalityWrapperDiv.setAttribute('background-color', 'rgb(156, 154, 154);');
document.getElementById('programHome').appendChild(functionalityWrapperDiv);

var paintBoardDiv = document.getElementById('paintBoard');

var canvas = document.createElement('table');
canvas.setAttribute('id', 'canvasArea');
canvas.setAttribute('height', '600px');
canvas.setAttribute('width', '600px');
paintBoardDiv.appendChild(canvas);

for (var i = 0; i < 5; i++){
    var row = document.createElement('tr');
    row.setAttribute('id', 'row' + i);
    canvas.appendChild(row);
    for (var j = 0; j < 5; j++){
        var cell = document.createElement('td');
        cell.setAttribute('id', 'cell' + i + j);
        cell.setAttribute('height', '5px');
        cell.setAttribute('width', '5px');
        cell.setAttribute('background-color', 'blue');
        row.appendChild(cell);
    }
    
}

