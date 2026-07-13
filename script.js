window.addEventListener("load", () => {
  const loading = document.getElementById("loading-screen");
  const bgm = document.getElementById("bgm");

  if (bgm) {
    bgm.volume = 0.15;
  }

  if (loading) {
    setTimeout(() => {
      loading.style.display = "none";

      if (bgm) {
        bgm.play().catch(() => {});
      }
    }, 2500);
  }
});
// 奉納ページ
const offerButton = document.getElementById("offer-button");

if (offerButton) {
  offerButton.addEventListener("click", () => {
    const memory1 = document.getElementById("memory1").value;
    const memory2 = document.getElementById("memory2").value;

    const result = document.getElementById("result-message");
    const bell = document.getElementById("bell-sound");

    const key = `${memory1}_${memory2}`;
    const card = MEMORY_CARDS[key];

    if (!card) {
      result.innerText = "対応する記憶が見つかりませんでした。";
      return;
    }

    const scanOverlay = document.getElementById("scan-overlay");
const scanMessage = document.getElementById("scan-message");

if (scanOverlay) {
  scanOverlay.classList.add("scan-overlay-show");
  scanOverlay.setAttribute("aria-hidden", "false");
}

if (scanMessage) {
  scanMessage.innerText = "記憶を照合しています…";
}

setTimeout(() => {
  if (bell) {
    bell.volume = 0.6;
    bell.play().catch(() => {});
  }
if (scanMessage) {
  scanMessage.innerText = "観測記録を受理しました";
}

  const cardBox = document.getElementById("memory-card");
  const image = document.getElementById("memory-image");
  const title = document.getElementById("memory-title");
  const poem = document.getElementById("memory-poem");
  const number = document.getElementById("memory-number");
  const date = document.getElementById("memory-date");
  const progress = document.getElementById("memory-progress");

  // 取得済み記録を読み込む
  const saved =
    JSON.parse(localStorage.getItem("observedMemories")) || [];

  // 初取得のときだけ追加
  if (!saved.includes(card.no)) {
    saved.push(card.no);
    localStorage.setItem(
      "observedMemories",
      JSON.stringify(saved)
    );
  }

  const observedDate = new Date().toLocaleDateString("ja-JP");

  if (cardBox) {
    cardBox.style.display = "block";
    cardBox.classList.remove("memory-card-show");

    requestAnimationFrame(() => {
      cardBox.classList.add("memory-card-show");
    });
  }
setTimeout(() => {
  if (scanOverlay) {
    scanOverlay.classList.remove("scan-overlay-show");
    scanOverlay.setAttribute("aria-hidden", "true");
  }

  if (cardBox) {
    cardBox.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}, 700);

  if (image) {
    image.src = card.image;
    image.alt = card.title;

    image.onerror = () => {
      image.style.display = "none";
      image.parentElement.classList.add("image-missing");
    };
  }

  if (number) {
    number.innerText = `NO.${card.no}`;
  }

  if (title) {
    title.innerText = card.title;
  }

  if (poem) {
    poem.innerText = card.poem;
  }

  if (date) {
    date.innerText = observedDate;
  }

  if (progress) {
    progress.innerText = `${saved.length} / 144`;
  }

  result.innerText = "";
}, 2000);
  });
}

