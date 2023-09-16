import { initStorage, getPages , setPage} from "./storage.js";

function addCellActions(cell, url) {
    const newDiv = document.createElement("div");
    const blockText = document.createTextNode("block");
    newDiv.appendChild(blockText);
    newDiv.onclick=async() => {
        await setPage(url, true);
        loadTable();
    }
    cell.appendChild(newDiv);

    // Code for unblock text button.`
    // -----------------
    const unBlockDiv = document.createElement("div");
    const unBlockText = document.createTextNode("unblock");
    unBlockDiv.appendChild(unBlockText);
    unBlockDiv.onclick=async() => {
        await setPage(url, false);
        loadTable();
    }

    cell.appendChild(unBlockDiv);
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

async function addEntry() {
    let newUrl = document.getElementById("newUrlPattern").value;

    await setPage(newUrl);
    console.log(await getPages());
 
    await loadTable();
}

function clearTableBody(table) {
    let len = table.tBodies.length;
    for (var i=0; i<len; i++) {
        table.deleteRow(-1);
    }
}

async function loadTable() {
    let table = document.getElementById("summary_table");

    clearTableBody(table);

    const data = await getPages();
    for (const [key, value] of Object.entries(data)) {
        console.log("Drawing", key, value);

        addTableRow(table, key, value);
    }
}

await initStorage();
await loadTable();
console.log("hello");
document.getElementById("add_button").onclick=async() => {
    await addEntry();
};

