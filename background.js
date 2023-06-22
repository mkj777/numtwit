chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});
const twitter = "https://twitter.com";

chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === "ON" ? "OFF" : "ON";

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  if (tab.url.startsWith(twitter) && nextState === "ON") {
    await chrome.scripting.executeSCript({
      files: ["script.js"],
      target: { tabId: tab.id },
    });
  }
});
