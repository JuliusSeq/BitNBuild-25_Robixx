document.getElementById("analyze").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: scrapeCommentsHeuristically
  }, async (injectionResults) => {
    const commentCandidates = injectionResults[0].result;

    if (!commentCandidates || commentCandidates.length === 0) {
      document.getElementById("results").textContent = "No comments detected.";
      return;
    }

    try {
      let response = await fetch("http://localhost:5000/sentiment", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({comments: commentCandidates})
      });

      if (!response.ok) throw new Error("Network response was not ok");

      let data = await response.json();

      document.getElementById("results").innerHTML = `
        <p>Positive: ${data.positive}</p>
        <p>Negative: ${data.negative}</p>
        <p>Neutral: ${data.neutral}</p>
      `;
    } catch (error) {
      document.getElementById("results").textContent = `Error: ${error.message}`;
    }
  });
});

function scrapeCommentsHeuristically() {
  const keywords = ["comment", "review", "user", "message", "post"];
  const candidates = [];
  const elements = Array.from(document.querySelectorAll("div, p, li, span"));

  elements.forEach(el => {
    const classIdText = (el.className + " " + el.id).toLowerCase();

    if (keywords.some(kw => classIdText.includes(kw))) {
      const text = el.innerText.trim();
      if (text.length > 20) {
        candidates.push(text);
      }
    }
  });

  return candidates;
}
