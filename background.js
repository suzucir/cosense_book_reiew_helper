// Generate a unique ID for the context menu item
const contextMenuItemId = 'openBookReviewDraft-' + Math.random().toString(36).substr(2, 9);

// Create context menu item
chrome.contextMenus.create({
  id: contextMenuItemId,
  title: "Open Book Review Draft on Cosense",
  contexts: ["page"],
  documentUrlPatterns: ["https://www.amazon.co.jp/*", "https://www.amazon.com/*"]
});

// Listen for context menu click
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === contextMenuItemId) {
    requestBookInfo(tab);
  }
});

// Request book info from content script
function requestBookInfo(tab) {
  chrome.tabs.sendMessage(tab.id, { type: "getBookInfo" }, function(response) {
    if (chrome.runtime.lastError) {
      // Content script is not ready yet, try again later
      setTimeout(function() {
        requestBookInfo(tab);
      }, 100);
    } else if (response && response.bookInfo) {
      openBookReviewDraft(response.bookInfo);
    }
  });
}

// Open book review draft on Cosense
function openBookReviewDraft(bookInfo) {
  chrome.storage.sync.get("cosenseUsername", function(data) {
    const username = data.cosenseUsername || "";
    const title = bookInfo.title.replace(/\s/g, '_');
    const body = `[${bookInfo.imageUrl} ${bookInfo.productUrl}]\n`
      + `Author: ${bookInfo.author}\n`
      + `Publisher: ${bookInfo.publisher}\n`
      + `Published Date: ${bookInfo.publishedDate}`;
    const url = `https://scrapbox.io/${username}/読書メモ『${title}』?body=${encodeURIComponent(body)}`;
    chrome.tabs.create({ url });
  });
}