const memoryCard = document.getElementById("memory-card");
const omikujiButton = document.getElementById("omikuji-button");
const retryButton = document.getElementById("retry-button");

const memoryTitle = document.getElementById("memory-title");
const memoryText = document.getElementById("memory-text");
const memoryId = document.getElementById("memory-id");

function getRandomMemory() {

    const keys = Object.keys(MEMORY_CARDS);

    const randomKey =
        keys[Math.floor(Math.random() * keys.length)];

    return MEMORY_CARDS[randomKey];
}

function showMemoryCard() {

    const memory = getRandomMemory();

    memoryTitle.textContent = memory.title;

    memoryText.innerHTML =
        memory.poem.replace(/\n/g, "<br>");

    memoryId.textContent =
        "404-" + memory.memoryId;

    memoryCard.classList.remove("show");

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            memoryCard.classList.add("show");
        });
    });

}