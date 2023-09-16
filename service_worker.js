import { getPages } from "./storage.js";

setInterval(async function() {
    let data = await getPages();
    console.log(data);    
}, 5000);

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
        chrome.scripting.executeScript({
            target : {tabId : tabId},
            files : [ "block_page.js" ],
        }).then(() => console.log("script injected"));

        console.log("pageComplete", tabId, changeInfo, tab)

    }
});