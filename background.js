chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getCurrentTabUrl") {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      sendResponse({url: tabs[0].url});
    });
    return true; // Keep the message channel open for async sendResponse
  }
});
