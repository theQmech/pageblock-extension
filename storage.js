async function initStorage() {
    await chrome.storage.local.clear();
}

async function getPages() {
    return await chrome.storage.local.get();
}

async function setPage(url, blocked = false) {
    var data = {};
    data[url] = blocked;
    await chrome.storage.local.set(data);
}

export { initStorage, getPages, setPage };