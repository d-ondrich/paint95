var functionalityWrapperDiv = document.createElement('div');
functionalityWrapperDiv.setAttribute('id', 'functionalityWrapper');
functionalityWrapperDiv.setAttribute('height', '300px');

functionalityWrapperDiv.setAttribute('background-color', 'rgb(156, 154, 154);');

document.getElementById('programHome').appendChild(functionalityWrapperDiv);

var paintBoardDiv = document.getElementById('paintBoard');
paintBoardDiv.style = "width: 100%;";


var canvas = document.createElement('div');
canvas.setAttribute('id', 'canvasArea');
canvas.style = "background: white; height: 500px; width: 500px; border: solid 2px black;";
paintBoardDiv.appendChild(canvas);


// for (var i = 0; i < 250; i++){
//     var row = document.createElement('div');
//     row.setAttribute('id', 'row' + i);
//     row.class = "rowStyle";
//     canvas.appendChild(row);
//     for (var j = 0; j < 250; j++){
//         var cell = document.createElement('div');
//         cell.setAttribute('id', 'cell' + i + j);
//         cell.class = "cellStyle";
//         row.appendChild(cell);
//     }
    
// }

