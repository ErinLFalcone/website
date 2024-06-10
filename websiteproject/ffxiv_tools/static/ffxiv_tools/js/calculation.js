// Function to update item counters, called in dragdrop.js
var itemList = ["Milk", "Fur", "Egg", "Carapace", "Feather", "Claw", "Horn", "Fang", "Fleece"];

function itemNumUpdate(item, slot, mult) {
    const itemToUpdate = document.getElementById(`${item}-count-${slot}`);
    const numOfItem = document.querySelectorAll(`div.selected-animals .${item}-${slot}`);
    itemToUpdate.innerHTML = (numOfItem.length * mult);
}

function itemCountUpdate() {
    for (let i = 0; i < itemList.length; i++) {
        const multNum = document.querySelector("tr.feed-choice:not(.none-display) td");
        itemNumUpdate(itemList[i], "one", 1);
        itemNumUpdate(itemList[i], "two", parseFloat(multNum.innerHTML));
    };
};