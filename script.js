import { getPages, setPage, removePage } from "./storage.js";

function createButtonDiv(text, onClickCallback) {
    const divNode = document.createElement("button");
    const textNode = document.createTextNode(text);
    divNode.appendChild(textNode);
    divNode.onclick = onClickCallback;

    return divNode;
}

function createBlockToggleButton(url, blockedStatus) {
    const buttonText = blockedStatus ? "Unblock" : "Block";
    const onclick = blockedStatus ? 
        (async () => {
            alert("Are you sure?");
            alert("Are you absolutely sure?");
            alert("Are you conscious about indulging this distraction?")
            await setPage(url, false);
            await loadTable();
        }) :
        (async () => {
            await setPage(url, true);
            await loadTable();
        });
    
    const buttonDiv = createButtonDiv(buttonText, onclick);
    return buttonDiv;
}

function addCellActions(cell, url, blockedStatus) {
    const blockToggleButton = createBlockToggleButton(url, blockedStatus);
    const removeButton = createButtonDiv("Remove", async () => {
        await removePage(url);
        await loadTable();
    });

    cell.appendChild(blockToggleButton);
    cell.appendChild(removeButton);
}

function addTableRow(table, url, blockedStatus) {
    var row = table.insertRow(-1);

    var urlCell = row.insertCell(0);
    var statusCell = row.insertCell(1);

    urlCell.innerHTML = url;
    statusCell.innerHTML = (blockedStatus ? "Yes" : "No");

    var actionCell = row.insertCell(2);
    addCellActions(actionCell, url, blockedStatus);
}

// Improvement: add entry only if does not exists
async function addEntry() {
    let newUrl = document.getElementById("newUrlPattern").value;

    await setPage(newUrl);

    await loadTable();
}

function clearTableBody(table) {
    let len = table.rows.length;
    for (var i = 0; i < len; i++) {
        table.deleteRow(-1);
    }
}

async function loadTable() {
    let table = document.getElementById("summary_table").getElementsByTagName('tbody')[0];

    clearTableBody(table);

    const data = await getPages();
    for (const [key, value] of Object.entries(data)) {
        addTableRow(table, key, value);
    }
}

await loadTable();
document.getElementById("add_button").onclick = async () => {
    await addEntry();
};

