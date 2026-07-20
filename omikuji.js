const memoryCard = document.getElementById("memory-card");
const omikujiButton = document.getElementById("omikuji-button");
const retryButton = document.getElementById("retry-button");

function showMemoryCard() {
    memoryCard.classList.remove("show");

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            memoryCard.classList.add("show");
        });
    });
}

omikujiButton.addEventListener("click", showMemoryCard);
retryButton.addEventListener("click", showMemoryCard);