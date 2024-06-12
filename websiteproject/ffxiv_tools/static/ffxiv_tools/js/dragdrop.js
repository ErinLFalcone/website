const dragItems = document.querySelectorAll(".animal");
var currentDragEl = null;
var isDragging = false;

// Regex check used in addDragStart so only a single item
// defined below can be dropped 
function regexTextCheck(text) {
    regexPattern = RegExp(/(?!.*draggable.*draggable).*draggable.*/g);
    return regexPattern.test(text);
}

// Function and loop below to add dragstart listener to initial
// draggable items
function addDragstart(item) {
    item.addEventListener("dragstart", (e) => {
        currentDragEl = e.currentTarget;
        const dataToDrag = e.target;
        dataToDrag.classList.remove("drag-animal");
        e.dataTransfer.setData("text/html", dataToDrag.outerHTML);
        e.dataTransfer.effectAllowed = "copyMove";
        isDragging = regexTextCheck(`${e.dataTransfer.getData("text/html")}`);
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
        if (currentDragEl.classList.contains("has-drop")) {
            currentDragEl.innerHTML = e.currentTarget.innerHTML;
        };
        e.currentTarget.innerHTML = dropHTML;
    };
    isDragging = false;
};

// Adds initial drop listeners
function dropCheck(e) {
    if (isDragging) {
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
        itemCountUpdate();
    });
});

// Click to add items to drop list
const animalList = document.querySelector("div.animal-list");
animalList.addEventListener("click", (e) => {
    const firstEmptySlot = document.querySelector("div.animal-slot:not(.has-drop):not(.none-display)");
    if (firstEmptySlot) {
        firstEmptySlot.innerHTML = e.target.outerHTML;
        firstEmptySlot.classList.add("has-drop");
        addDragstart(firstEmptySlot);
    };
    itemCountUpdate();
});

// Clears filled slots, excludes slots with class passed as attribute
function clearSlots(clearClass) {
    const noneDisplaySlots = document.querySelectorAll("div.animal-slot.has-drop");
    noneDisplaySlots.forEach((item) => {
        if (!item.classList.contains(`${clearClass}`)) {
            item.classList.remove("has-drop");
            item.innerHTML = "cleared";
        };
    });
    itemCountUpdate();
};