const dragItems = document.querySelectorAll(".drag-animal");
var currentDragEl = null;
var isDragging = false;

// Regex check used in addDragStart so only a single item
// defined below can be dropped 
function regexTextCheck(text) {
    regexPattern = RegExp(/(?!.*draggable.*draggable).*draggable.*/g);
    return regexPattern.test(text);
}

// Function to add dragstart listener to draggable items
function addDragstart(item) {
    item.addEventListener("dragstart", (e) => {
        currentDragEl = e.currentTarget;
        const dataToDrag = e.target;
        e.dataTransfer.setData("text/html", dataToDrag.outerHTML);
        e.dataTransfer.effectAllowed = "copyMove";
        isDragging = regexTextCheck(`${e.dataTransfer.getData("text/html")}`);
    });
};

// Function to add click listener to add items to drop list
function addClickEvent(item) {
    item.addEventListener("click", (e) => {
        const firstEmptySlot = document.querySelector("div.animal-slot:not(.has-drop):not(.none-display)");
        if (firstEmptySlot) {
            firstEmptySlot.innerHTML = e.currentTarget.outerHTML;
            firstEmptySlot.classList.add("has-drop");
            dragClassRemover();
            addDragstart(firstEmptySlot);
        };
        itemCountUpdate();
    });
}

// Loop to add drag and click listeners to initial draggable items
dragItems.forEach((item) => {
    addDragstart(item);
    addClickEvent(item);
});

// Beginning of drop logic

// used to remove class after drop, so dropdown filter doesn't target items
function dragClassRemover() {
    const classyAnimal = document.querySelector("div.selected-animals .drag-animal");
    if (classyAnimal) {
        classyAnimal.classList.remove("drag-animal");
    };
};

// Checks if drop area already contains an item:
// If no item exists, inserts dragged item and
// adds dragstart listener
// --If item was being dragged from another slot,
// --removes old item
// 
// Else, if an item exists in the target slot,
// swaps position of the two items
// Removes drag-animal class and sets isDragging flag to false
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
            currentDragEl.innerHTML = null;
        };

    } else {
        if (currentDragEl.classList.contains("has-drop")) {
            currentDragEl.innerHTML = e.currentTarget.innerHTML;
        };
        e.currentTarget.innerHTML = dropHTML;
    };
    // console.log(typeof e.currentTarget.innerHTML);
    dragClassRemover();
    isDragging = false;
};

// Adds initial drop listeners
const dropAreas = document.querySelectorAll(".animal-slot");

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

// Clears filled slots, excludes slots with class passed as attribute
function clearSlots(clearClass) {
    const noneDisplaySlots = document.querySelectorAll("div.animal-slot.has-drop");
    noneDisplaySlots.forEach((item) => {
        if (!item.classList.contains(`${clearClass}`)) {
            item.classList.remove("has-drop");
            item.innerHTML = null;
        };
    });
    itemCountUpdate();
};