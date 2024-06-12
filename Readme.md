# Cosense Book Review Helper

Cosense Book Review Helper is a Google Chrome extension that allows you to create a book review draft on Cosense (formerly known as Scrapbox) directly from Amazon book pages. It extracts relevant information from the Amazon page and generates a URL with the book details to open a new draft on Cosense.

![demo](https://github.com/suzucir/cosense_book_reiew_helper/assets/261151/a1a8dbdd-cafe-4621-bbb4-6111e6ac629d)


## Features

- Extract book information (title, author, publisher, publication date, book cover image, and Amazon product URL) from Amazon book pages.
- Save your Cosense username in the extension's options.
- Open a new tab with the Cosense book review draft URL, pre-populated with the extracted book information.
- Access the extension functionality through a toolbar icon, context menu, or keyboard shortcut.
- The format of the Cosense book review draft is defined in the `openBookReviewDraft` function in `options.js`.

## Installation

1. Clone or download this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" by toggling the switch in the top-right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Visit an Amazon book page (e.g., `https://www.amazon.com/dp/1234567890`).
2. Click the extension's toolbar icon, right-click and select "Open Book Review Draft on Cosense" from the context menu, or use the keyboard shortcut (if configured).
3. In the extension's popup window, enter your Cosense username and click "Save".
4. Click the "Open Book Review Draft" button to open a new tab with the Cosense book review draft URL, pre-populated with the book information.

## Files

- `manifest.json`: The extension's manifest file, defining metadata, permissions, and content scripts.
- `background.js`: The background script, handling context menu creation and opening the book review draft URL.
- `content_script.js`: The content script, extracting book information from the Amazon page.
- `options.html`: The HTML file for the extension's popup window and options page.
- `options.js`: The JavaScript file for handling user interactions in the popup window and options page. The format of the Cosense book review draft is defined in the `openBookReviewDraft` function.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
