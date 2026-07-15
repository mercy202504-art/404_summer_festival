document.addEventListener("DOMContentLoaded", () => {
  const observedRaw =
    JSON.parse(localStorage.getItem("observedMemories")) || [];

  const observed = observedRaw.map(value =>
    String(value).padStart(3, "0")
  );

  const cards = Object.values(MEMORY_CARDS).sort(
    (a, b) => Number(a.no) - Number(b.no)
  );

  const grid = document.getElementById("archive-grid");
  const count = document.getElementById("archive-count");
  const percent = document.getElementById("archive-percent");
  const progress = document.getElementById("archive-progress-bar");
  const empty = document.getElementById("archive-empty");

  const modal = document.getElementById("archive-modal");
  const modalImage = document.getElementById("archive-modal-image");
  const modalTitle = document.getElementById("archive-modal-title");
  const modalPoem = document.getElementById("archive-modal-poem");
  const modalNumber = document.getElementById("archive-modal-number");
  const modalRarity = document.getElementById("archive-modal-rarity");
  const closeButton = document.getElementById("archive-modal-close");

  const observedCount = cards.filter(card =>
    observed.includes(String(card.no).padStart(3, "0"))
  ).length;

  const completion =
    cards.length > 0
      ? (observedCount / cards.length) * 100
      : 0;

  count.textContent = `${observedCount} / ${cards.length}`;
  percent.textContent = `${completion.toFixed(1)}%`;
  progress.style.width = `${completion}%`;

  empty.hidden = observedCount !== 0;

  cards.forEach(card => {
    const no = String(card.no).padStart(3, "0");
    const unlocked = observed.includes(no);

    const item = document.createElement(
      unlocked ? "button" : "div"
    );

    item.className = "archive-item";
    item.dataset.no = no;

    if (unlocked) {
      item.type = "button";
      item.classList.add("unlocked");

    if(card.rarity === "RARE"){
    item.classList.add("rare");
}
      item.innerHTML = `
        <div class="archive-image-frame">
          <img
            src="${card.image}"
            alt="${card.title}"
            loading="lazy"
          >
          <span class="archive-item-number">NO.${no}</span>
        </div>

        <div class="archive-card-title">
    ${card.title}
</div>

<div class="archive-card-rarity rarity-${(card.rarity || "COMMON").toLowerCase()}">
    ${(card.rarity || "COMMON") === "404"
        ? "404 MEMORY"
        : (card.rarity || "COMMON")}
</div>
      `;

      const thumbnail = item.querySelector("img");

      thumbnail.addEventListener("error", () => {
        thumbnail.style.display = "none";
        thumbnail.parentElement.classList.add("image-missing");
      });

      item.addEventListener("click", () => {
        modalImage.style.display = "block";
        modalImage.src = card.image;
        modalImage.alt = card.title;

        modalImage.onerror = () => {
          modalImage.style.display = "none";
        };

        modalNumber.textContent = `NO.${no}`;
        modalTitle.textContent = card.title;
        modalPoem.textContent = card.poem;
        const rarity = String(
  card.rarity || card.Rarity || "COMMON"
).toUpperCase();

modalRarity.textContent =
  rarity === "404"
    ? "404 MEMORY"
    : rarity;

modalRarity.className =
  `archive-modal-rarity rarity-${rarity.toLowerCase()}`;

        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
      });
    } else {
      item.classList.add("locked");

      item.innerHTML = `
        <div class="archive-unknown">
          <div class="question">？</div>
          <div class="archive-unknown-number">NO.${no}</div>
          <div>UNKNOWN MEMORY</div>
        </div>
      `;
    }

    grid.appendChild(item);
  });

  function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", event => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
});
