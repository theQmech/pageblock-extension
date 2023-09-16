function getTabId() {
    let tabs = chrome.tabs.query({currentWindow: true, active : true});
    return tabs[0].tabId;
}

const currentUrl = tab.url;
const data = await getPages();

for (const [urlPattern, blocked] of Object.entries(data)) {    
    if (blocked && currentUrl.includes(urlPattern)) {
        console.log("Blocking [" + currentUrl + "]. Matched [" + urlPattern + "]");
        document.write("BLOCKED");
    }
}