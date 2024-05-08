function dropMenuFunction(dropdownId) {
    document.getElementById(`${dropdownId}`).classList.toggle("drop-click")
}

function dropSelectFunction(dropMenuClass, dropSelectionClass) {
    var hideList = document.querySelectorAll(`.${dropMenuClass}`);
    hideList.forEach((item) => item.style.display="none");
    
    var selectList = document.querySelectorAll(`${dropSelectionClass}`);
    selectList.forEach((item) => item.style.display="block");
}