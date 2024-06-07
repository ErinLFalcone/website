// Function to update item counters, called in dragdrop.js
var itemList = ["Milk", "Fur", "Egg", "Carapace", "Feather", "Claw", "Horn", "Fang", "Fleece"];

function itemCountUpdate() {
    for (let i = 0; i < itemList.length; i++) {
        const itemNumToUpdate = document.getElementById(`${itemList[i]}-number`);
        const numOfItem = document.querySelectorAll(`div.selected-animals .${itemList[i]}1`);
        itemNumToUpdate.innerHTML = numOfItem.length;
    };
};