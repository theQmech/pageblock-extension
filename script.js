import { initStorage, getPages, setPage } from "./storage.js";

function createTextDiv(text) {
    const divNode = document.createElement("div");
    const textNode = document.createTextNode(text);
    divNode.appendChild(textNode);

    return divNode;
}

// Improvement: Show only the allowed action - one of Blocked or Unblocked.
// Improvement: Add a delete action
function addCellActions(cell, url) {
    const blockDiv = createTextDiv("Block");
    blockDiv.onclick = async () => {
        await setPage(url, true);
        loadTable();
    }
    cell.appendChild(blockDiv);

    const unblockDiv = createTextDiv("Unblock");
    unblockDiv.onclick = async () => {
        await setPage(url, false);
        loadTable();
    }
    cell.appendChild(unblockDiv);
}

function addTableRow(table, url, blockedStatus) {
    var row = table.insertRow(-1);

    var urlCell = row.insertCell(0);
    var statusCell = row.insertCell(1);

    urlCell.innerHTML = url;
    statusCell.innerHTML = (blockedStatus ? "Yes" : "No");

    var actionCell = row.insertCell(2);
    addCellActions(actionCell, url);
}

// Improvement: add entry only if exists
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

