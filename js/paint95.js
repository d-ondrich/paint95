var functionalityWrapper = document.createElement('div');
functionalityWrapper.setAttribute('id', 'functionalityWrapper');
functionalityWrapper.setAttribute('height', '300px');

functionalityWrapper.setAttribute('background-color', 'rgb(156, 154, 154);');
document.getElementById('programHome').appendChild(functionalityWrapper);

var paintBoard = document.getElementById('paintBoard');

paintBoard.innerHTML = "<table>";
for (var i = 0; i < 5; i++){
    paintBoard.innerHTML = "<tr>";
    for (var j = 0; j < 5; j++){
        if ((j + i) % 2 == 0){
            paintBoard.innerHTML = "<td class='dark'></td>";
        }else {
            paintBoard.innerHTML = "<td class='light'></td>";
        }
    }
    paintBoard.innerHTML = "</tr>";
}
paintBoard.innerHTML = "</table>";
