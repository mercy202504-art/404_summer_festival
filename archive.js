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

const COMPLETION_KEY = "archiveCompletionShown";

if (
    observedCount >= 144 &&
    localStorage.getItem(COMPLETION_KEY) !== "true"
) {
    localStorage.setItem(COMPLETION_KEY, "true");

    setTimeout(() => {
        startArchiveCompletionSequence();
    }, 800);
}

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

/* ==========================================
   144枚コンプリート後の異常演出
========================================== */

function startArchiveCompletionSequence() {
  const overlay =
    document.getElementById("completion-overlay");

  const counter =
    document.getElementById("completion-counter");

  const title =
    document.getElementById("completion-title");

  const message =
    document.getElementById("completion-message");

  const secretButton =
    document.getElementById("secret-memory-button");

  const finalMessage =
    document.getElementById("completion-final-message");

  const homeButton =
    document.getElementById("completion-home-button");

  if (
    !overlay ||
    !counter ||
    !title ||
    !message ||
    !secretButton ||
    !finalMessage ||
    !homeButton
  ) {
    return;
  }

  overlay.classList.add("show");
  overlay.setAttribute("aria-hidden", "false");

  counter.textContent = "144 / 144";
  title.textContent = "観測が完了しました";
  message.textContent = "すべての記録が揃っています。";
  secretButton.hidden = true;

  setTimeout(() => {
    overlay.classList.add("noise");
    title.textContent = "ARCHIVE ERROR";
    message.textContent = "記録数に不整合が発生しました。";
  }, 2000);

  setTimeout(() => {
    counter.textContent = "145 / 144";
    title.textContent = "UNKNOWN MEMORY DETECTED";
    message.textContent =
      "登録されていない記録が観測されています。";
  }, 3200);

  setTimeout(() => {
    overlay.classList.remove("noise");
    secretButton.hidden = false;
  }, 4300);

secretButton.onclick = () => {
    secretButton.hidden = true;
secretButton.style.display = "none";

    counter.hidden = true;
    message.hidden = true;

title.textContent = "";

overlay.classList.add("noise");

/*--------------------------
LOADING
--------------------------*/

setTimeout(() => {

    overlay.classList.remove("noise");

    title.textContent = "LOADING FINAL RECORD...";

},1000);

setTimeout(() => {

    title.textContent = "VERIFYING OBSERVER...";

},2500);

setTimeout(() => {

    title.textContent = "OBSERVER VERIFIED";

},4000);

setTimeout(() => {

    title.textContent = "CREATING RECORD...";

},5200);

setTimeout(() => {
    title.textContent = "NO.YOU";

    const image =
        document.createElement("img");

setTimeout(() => {

    const noYou = document.createElement("div");

    noYou.className = "handwritten";
    noYou.textContent = "No.You";

    panel.appendChild(noYou);

    requestAnimationFrame(() => {
        noYou.classList.add("show");
    });

}, 300);

    image.src = "images/memory145.png";
    image.className = "completion-image";
    image.alt = "Last Observer";


const panel =
    overlay.querySelector(".completion-panel");

panel.appendChild(image);

image.style.opacity = "0";
image.style.transform = "scale(.96)";

requestAnimationFrame(() => {

    image.style.transition =
        "opacity 2s ease, transform 2s ease";

    image.style.opacity = "1";

    image.style.transform = "scale(1)";

});
}, 7000);

setTimeout(() => {

    finalMessage.hidden = false;

    requestAnimationFrame(() => {
        finalMessage.classList.add("show");
    });

},1200);

setTimeout(() => {

    homeButton.hidden = false;

    requestAnimationFrame(() => {
        homeButton.classList.add("show");
    });

},2500);

};

homeButton.onclick = () => {
    goHome();
};

}
