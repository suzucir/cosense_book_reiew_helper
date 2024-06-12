// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "getBookInfo") {
      const bookInfo = getBookInfo();
      sendResponse({ bookInfo });
    }
  });
  
  // Get book information from the Amazon page
  function getBookInfo() {
    const title = document.getElementById("productTitle")?.innerText.trim();
    const author = Array.from(document.getElementsByClassName("author notFaded")).map(el => el.innerText.trim()).join(", ");
    const publisher = document.getElementById("rpi-attribute-book_details-publisher")?.innerText.replace(/(?:^|\s)(Publisher|出版社)(?::|\s)\s*/i, '').trim();
    const publishedDate = document.getElementById("rpi-attribute-book_details-publication_date")?.innerText.replace(/(?:^|\s)(Published|発売日)(?::|\s)\s*/i, '').trim();
    const imageUrl = document.getElementById("landingImage")?.src;
    const productUrl = window.location.href.split(/[?#]/)[0]; 

    return { title, author, publisher, publishedDate, imageUrl, productUrl };
  }