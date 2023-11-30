const header = document.getElementById("header");
const snoContainer = document.getElementById("sno");
const bodyContainer = document.getElementById("body-container");

const columns = 26; rows = 50;

for(let i =1; i<=columns; i++)
{
    const headCell = document.createElement("div");
    headCell.className = "head-cell";

   
        headCell.innerText = String.fromCharCode(64+i);

    header.appendChild(headCell);
}


for(let i =1; i<=rows; i++)
{
    // <div> class="sno-cell"></div>
    const snoCell = document.createElement("div");
    snoCell.innerText = i;
    snoCell.className = "sno-cell";
    snoContainer.appendChild(snoCell);
}



for(let row = 1; row<=rows; row++){
    // create a row
    const rowElement = document.createElement("div");
    rowElement.className = "row";

    for(let col = 1; col <= columns; col++ ){
        // create a cell | column
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.contentEditable = true;
        rowElement.appendChild(cell);
    }

    bodyContainer.appendChild(rowElement);
}
