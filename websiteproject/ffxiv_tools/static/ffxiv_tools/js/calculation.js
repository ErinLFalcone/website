// Function to update item counters, called in dragdrop.js
var itemList = ["Milk", "Fur", "Egg", "Carapace", "Feather", "Claw", "Horn", "Fang", "Fleece"];

function itemNumUpdate(item, slot, mult) {
    const itemToUpdate = document.getElementById(`${item}-count-${slot}`);
    var numOfItem = document.querySelectorAll(`div.selected-animals .${item}-${slot}`);
    numOfItem = (numOfItem.length * mult);
    itemToUpdate.innerHTML = numOfItem;
    return numOfItem;
};


function itemCountUpdate() {
    for (let i = 0; i < itemList.length; i++) {
        const multNum = document.querySelector("tr.feed-choice:not(.none-display) td");
        var itemTotal = itemNumUpdate(itemList[i], "one", 1);
        itemTotal += itemNumUpdate(itemList[i], "two", parseFloat(multNum.innerHTML));
        document.getElementById(`${itemList[i]}-total`).innerHTML = itemTotal;
    };
};