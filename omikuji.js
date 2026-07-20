const memoryCard = document.getElementById("memory-card");
const omikujiButton = document.getElementById("omikuji-button");
const retryButton = document.getElementById("retry-button");

const memoryTitle = document.getElementById("memory-title");
const memoryText = document.getElementById("memory-text");
const memoryId = document.getElementById("memory-id");

function getRandomMemory() {
  const randomIndex = Math.floor(Math.random() * memoryData.length);
  return memoryData[randomIndex];
}

function showMemoryCard() {
  const memory = getRandomMemory();

  memoryTitle.textContent =
    memory.title ||
    memory.Title ||
    memory.keyword ||
    memory.Keyword ||
    "流れ着いた記憶";

  const text =
    memory.memory ||
    memory.Memory ||
    memory.body ||
    memory.Body ||
    "";

  memoryText.innerHTML = String(text).replace(/\n/g, "<br>");

  const id =
    memory.id ||
    memory.ID ||
    "M000";

  memoryId.textContent = `404-${id}`;

  memoryCard.classList.remove("show");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      memoryCard.classList.add("show");
    });
  });
}

omikujiButton.addEventListener("click", showMemoryCard);
retryButton.addEventListener("click", showMemoryCard);