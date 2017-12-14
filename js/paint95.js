var functionalityWrapperDiv = document.createElement('div');
functionalityWrapperDiv.setAttribute('id', 'functionalityWrapper');
functionalityWrapperDiv.setAttribute('height', '300px');

functionalityWrapperDiv.setAttribute('background-color', 'rgb(156, 154, 154);');
document.getElementById('programHome').appendChild(functionalityWrapperDiv);

var paintBoardDiv = document.getElementById('paintBoard');

var canvas = document.createElement('table');
canvas.setAttribute('id', 'canvasArea');
canvas.style = "background: blue; height: 600px; width: 600px;";
paintBoardDiv.appendChild(canvas);

for (var i = 0; i < 300; i++){
    var row = document.createElement('tr');
    row.setAttribute('id', 'row' + i);
    canvas.appendChild(row);
    for (var j = 0; j < 300; j++){
        var cell = document.createElement('td');
        cell.setAttribute('id', 'cell' + i + j);
        cell.style = "background: blue; height: 2px; width: 2px;";
        row.appendChild(cell);
    }
    
}

