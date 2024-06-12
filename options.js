// Get username from storage and display it
chrome.storage.sync.get("cosenseUsername", function(data) {
  document.getElementById("username").value = data.cosenseUsername || "";
});

// Save username to storage
document.getElementById("saveUsername").addEventListener("click", function() {
  const username = document.getElementById("username").value.trim();
  chrome.storage.sync.set({ cosenseUsername: username }, function() {
    alert("Username saved!");
  });
});

// Open book review draft on Cosense
document.getElementById("openBookReviewDraft").addEventListener("click", function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: "getBookInfo" }, function(response) {
      if (chrome.runtime.lastError) {
        alert("Not on an Amazon book page.");
      } else if (response && response.bookInfo) {
        openBookReviewDraft(response.bookInfo);
      } else {
        alert("Failed to get book information.");
      } 
    });
  });
});

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