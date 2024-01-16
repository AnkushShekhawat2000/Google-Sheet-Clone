let activeCellId = null;
const activeCellElement =document.getElementById("active-cell");
const form = document.querySelector(".form");
// const mergeButton = document.getElementById('merge');
const state ={};



//chat gpt
// Assuming you have a merge button with id 'mergeButton'
const mergeButton = document.getElementById('merge');

// Placeholder for a variable to store selected cells
let selectedCells = [];

// Placeholder for defaultStyles
const defaultStyles = {
    fontFamily: "poppins-regular",
    fontSize: 16,
    isBold: false,
    isItalic: false,
    isUnderline: false,
    align: "left",
    textColor: "#00000",
    bgColor: "#ffffff",
    text: ""
};




// Event listener for merge button click
mergeButton.addEventListener('click', mergeSelectedCells);

// Event listener for form change
form.addEventListener('change', onChangeFormData);

// Event listener for cell click
document.addEventListener('click', handleCellClick);

// Placeholder for onChangeFormData function
function onChangeFormData(event) {
    // Implement this function to handle form changes
    // You might want to update defaultStyles based on the form values
}

// Handle cell click to track selected cells
function handleCellClick(event) {
    const cell = event.target;

    // Check if the clicked element is a cell
    if (cell.tagName === 'TD') {
        const cellId = cell.id;

        // Toggle selection
        if (selectedCells.includes(cellId)) {
            selectedCells = selectedCells.filter(id => id !== cellId);
            cell.classList.remove('selected');
        } else {
            selectedCells.push(cellId);
            cell.classList.add('selected');
        }
    }
}

// Get selected cells
function getSelectedCells() {
    return selectedCells;
}

// Validate the merge operation
function isValidMerge(selectedCells) {
    return selectedCells.length > 1;
}

// Update state after merging cells
function updateStateForMergedCells(selectedCells) {
    // Implement this function to update any application state related to merged cells
    // Example: console.log('Cells merged:', selectedCells);
}

// Calculate colspan based on selected cells
function calculateColSpan(selectedCells) {
    const colIndices = selectedCells.map(cellId => parseInt(cellId.split('_')[1])); // Assuming cell IDs are like 'cell_1_2'
    return Math.max(...colIndices) - Math.min(...colIndices) + 1;
}

// Calculate rowspan based on selected cells
function calculateRowSpan(selectedCells) {
    const rowIndices = selectedCells.map(cellId => parseInt(cellId.split('_')[2])); // Assuming cell IDs are like 'cell_1_2'
    return Math.max(...rowIndices) - Math.min(...rowIndices) + 1;
}

// Perform the merge operation
function performMerge(selectedCells) {
    const firstCellId = selectedCells[0];
    const firstCell = document.getElementById(firstCellId);
    const colspan = calculateColSpan(selectedCells);
    const rowspan = calculateRowSpan(selectedCells);

    firstCell.setAttribute('colspan', colspan);
    firstCell.setAttribute('rowspan', rowspan);

    // Hide or remove other cells
    selectedCells.slice(1).forEach(cellId => {
        const cell = document.getElementById(cellId);
        cell.style.display = 'none'; // or cell.remove();
    });
}

// Merge selected cells
function mergeSelectedCells() {
    // Validate the selection
    if (!isValidMerge(selectedCells)) {
        alert("Invalid selection for merge");
        return;
    }

    // Merge the cells
    performMerge(selectedCells);

    // Update state
    updateStateForMergedCells(selectedCells);

    // Clear selected cells
    selectedCells.forEach(cellId => {
        const cell = document.getElementById(cellId);
        cell.classList.remove('selected');
    });
    selectedCells = [];
}


// // Add an event listener for your merge button
// mergeButton.addEventListener('click', mergeSelectedCells);

// form.addEventListener("change", onChangeFormData)

// const defaultStyles ={
//     //Todo: change it later
//     fontFamily: "poppins-regular",
//     fontSize: 16,
//     isBold: false,
//     isItalic: false,
//     isUnderline: false,
//     align: "left",
//     textColor: "#00000",
//     bgColor: "#ffffff",
//     text: ""
// }
 
// function performMerge(selectedCells) {
//     // Assume selectedCells is an array of cell IDs
//     const firstCell = document.getElementById(selectedCells[0]);
//     const colspan = calculateColSpan(selectedCells); // Implement this function
//     const rowspan = calculateRowSpan(selectedCells); // Implement this function
 
//     firstCell.setAttribute('colspan', colspan);
//     firstCell.setAttribute('rowspan', rowspan);
 
//     // Hide or remove other cells
//     selectedCells.slice(1).forEach(cellId => {
//         const cell = document.getElementById(cellId);
//         cell.style.display = 'none'; // or cell.remove();
//     });
// }
 
// function mergeSelectedCells() {
//     // Get the selected cells
//     const selectedCells = getSelectedCells(); // Implement this function
 
//     // Validate the selection
//     if (!isValidMerge(selectedCells)) {
//         alert("Invalid selection for merge");
//         return;
//     }
 
//     // Merge the cells
//     performMerge(selectedCells);
 
//     // Update state
//     updateStateForMergedCells(selectedCells);
// }

function onChangeCellText(event){
    let changedText = event.target.innerText;
    if(state[activeCellId]){
        // the current cell is already added to state object
        state[activeCellId].text = changedText;
    }
    else{
        state[activeCellId] = {...defaultStyles, text: changedText};
    }
}

function onChangeFormData(){
    const options = {
        fontFamily: form["fontFamily"].value,
        fontSize: form["fontSize"].value,
        isBold: form["isBold"].checked,
        isItalic: form["isItalic"].checked,
        // isUnderLine: form["isUnderline"].checked,
        isUnderline: form.isUnderline.checked,
        align: form.align.value,  // "left" | "center" | "right"
        textColor: form["textColor"].value,
        bgColor: form["bgColor"].value,


    };
    applyStyles(options);
}

function applyStyles(styles){
    // it will apply the styles to th active cell
    if(!activeCellId){

        form.reset();
        alert("Please select cell to apply");
        return;
    }
  

    // if some cell is selected than apply styles to that cell
    const activeCell = document.getElementById(activeCellId);
    activeCell.style.color = styles.textColor;
    activeCell.style.backgroundColor = styles.bgColor;
    activeCell.style.textAlign = styles.align;
    activeCell.style.fontWeight = styles.isBold ? "600" : "400";
    activeCell.style.fontFamily = styles.fontFamily;
    activeCell.style.fontSize = styles.fontSize + "px";
    activeCell.style.textDecoration = styles.isUnderline ? "underline" : "none";
    activeCell.style.fontStyle = styles.isItalic ? "italic" : "normal";

    // whenever there's an update in a cell style, update these style with the state object.
    state[activeCellId] = {...styles, text:activeCell.innerText};
}

function onFocusCell(event){
    if(activeCellId == event.target.id) return;
    activeCellId = event.target.id;
    activeCellElement.innerText = activeCellId;


    // reset the form with it actual style
    if(state[activeCellId]){
        // already touched cell
        resetForm(state[activeCellId]);
    }
    else{
        resetForm(defaultStyles);
    }

} 

function resetForm(styles){
/** 
    styles  = {
        fontFamily: form["fontFamily"].value,
        fontSize: form["fontSize"].value + "px",
        isBold: form["isBold"].checked,
        isItalic: form["isItalic"].checked,
        // isUnderLine: form["isUnderline"].checked,
        isUnderline: form.isUnderline.checked,
        align: form.align.value,  // "left" | "center" | "right"
        textColor: form["textColor"].value,
        bgColor: form["bgColor"].value
    };
    */

    console.log(styles);

    form.fontSize.value = styles.fontSize;
    form.fontFamily.value = styles.fontFamily;
    form.isBold.checked = styles.isBold;
    form.isItalic.checked = styles.isItalic;
    form.isUnderline.checked = styles.isUnderline;
    form.align.value = styles.align;
    form.textColor.value = styles.textColor;
    form.bgColor.value = styles.bgColor;
}


function exportData(){
    // Todo: export the file data and download it
    //{a:10, b:20} => '{"a": 10, "b":20}'  //stringfy method reference
   const jsonData = JSON.stringify(state);
   console.log(jsonData);
   const blob = new Blob([jsonData], {type: "text/plain"});

   const url = URL.createObjectURL(blob);
   const link = document.createElement("a");
   link.download = "data.json";
   link.href = url;
   link.click();
}