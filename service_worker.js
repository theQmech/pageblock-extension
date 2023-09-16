import { getPages } from "./storage.js";

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    const currentUrl = tab.url;
    const data = await getPages();

    for (const [urlPattern, blocked] of Object.entries(data)) {   
        if (blocked && currentUrl.includes(urlPattern)) {
            console.log("Blocking [" + currentUrl + "]. Matched [" + urlPattern + "]");
            chrome.tabs.update(tabId, {url:"https://onetinyhand.com/"});
        }
    }
  });