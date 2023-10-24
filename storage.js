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

async function removePage(url) {
    await chrome.storage.local.remove(url);
}

export { initStorage, getPages, setPage, removePage };