const dragItems = document.querySelectorAll(".animal");

var currentDragEl = null;

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

const dropAreas = document.querySelectorAll(".animal-slot");

function dropCheck(e) {
    if (e.dataTransfer.types.includes("text/html")) {
        e.preventDefault();
    };
};

function dropEvent(e) {
    const dropHTML = e.dataTransfer.getData("text/html");
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
};

function endEvent(e) {
    if (e.target.classList.contains("has-drop")) {
        console.log("Yes, has-drop");
    };
};

ondragend = (e) => {
    endEvent(e);
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
    // item.addEventListener("dragend", (e) => {
    //     endEvent(e);
    // });
});


