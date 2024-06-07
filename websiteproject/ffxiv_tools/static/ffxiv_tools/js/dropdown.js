const dropDownClasses = ['size-drop', 'item-all-drop', 'item1-drop', 'item2-drop', 'feed-drop'];
var dropQueryAll = document.querySelectorAll('.drop-container');

// Toggles dropdown menu when button is clicked on
function dropMenuToggle(dropdownId) {
    document.getElementById(`${dropdownId}`).classList.toggle("block-display")
};

// Hides all dropdown containers except the one identified by ID with attribute
function dropMenuClose(dropdownToKeep) {
    var dropdownHideList = document.querySelectorAll(`.drop-container:not(#${dropdownToKeep})`);
    dropdownHideList.forEach((item) => item.classList.remove("block-display"));
};

// Listens for clicks, opens dropdowns when button clicked, hides when clicked outside
document.addEventListener('click', function(e) {
    // Opens and closes item dropdown menus
    if (dropDownClasses.includes(e.target.id.slice(0,-7))) {
        dropMenuToggle(`${e.target.id.slice(0,-7)}`);
        dropMenuClose(`${e.target.id.slice(0,-7)}`);
    // Hides dropdown menus when clicked outside
    } else if (!e.target.classList.contains("drop-choice")) {
        dropMenuClose("dummy-class");
    };
}, false);

// Hides all options of drop menu by class, then unhides dropdown selection
function dropSelectFunction(dropMenuClass, dropSelectionClass) {
    var selectHideList = document.querySelectorAll(`.${dropMenuClass}`);
    selectHideList.forEach((item) => {
        if (item.classList.contains("block-display")) {
            item.classList.remove("block-display");
        };
        item.classList.add("none-display");
    });

    var selectList = document.querySelectorAll(`${dropSelectionClass}`);
    selectList.forEach((item) => {
        if (item.classList.contains("none-display")) {
            item.classList.remove("none-display");
        };
        item.classList.add("block-display");
    });
};