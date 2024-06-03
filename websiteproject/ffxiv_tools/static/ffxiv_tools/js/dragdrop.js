const dragItems = document.querySelectorAll(".animal");

var currentDragEl = null;

// Function and loop below to add dragstart listener to initial
// draggable items
function addDragstart(item) {
    item.addEventListener("dragstart", (e) => {
        currentDragEl = e.currentTarget;
        e.dataTransfer.setData("text/html", e.target.outerHTML);
        e.dataTransfer.effectAllowed = "move";
    });
};

dragItems.forEach((item) => {
    addDragstart(item);
});


// Beginning of drop logic
const dropAreas = document.querySelectorAll(".animal-slot");

// Checks if drop area already contains an item:
// If no item exists, inserts dragged item and
// adds dragstart listener
// --If item was being dragged from another slot,
// --removes old item
// 
// Else, if an item exists in the target slot,
// swaps position of the two items
function dropEvent(e) {
    const dropHTML = e.dataTransfer.getData("text/html");
    
    if (!e.currentTarget.classList.contains("has-drop")) {
        e.currentTarget.innerHTML = dropHTML;
        e.currentTarget.classList.add("has-drop");
        addDragstart(e.currentTarget);
        
        if (currentDragEl.classList.contains("has-drop")) {
            while (currentDragEl.firstChild) {
                currentDragEl.removeChild(currentDragEl.firstChild);
            };
            currentDragEl.classList.remove("has-drop");
            currentDragEl.innerHTML += "New Text";
        };

    } else {
        currentDragEl.innerHTML = e.currentTarget.innerHTML;
        e.currentTarget.innerHTML = dropHTML;
    };
};

// Adds initial drop listeners
function dropCheck(e) {
    if (e.dataTransfer.types.includes("text/html")) {
        e.preventDefault();
    };
};

dropAreas.forEach((item) => {
    item.addEventListener("dragenter", (e) => {
        dropCheck(e);
    });
    item.addEventListener("dragover", (e) => {
        dropCheck(e);
    });
    item.addEventListener("drop", (e) => {
        dropEvent(e);
    });
});


