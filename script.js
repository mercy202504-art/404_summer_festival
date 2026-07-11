window.addEventListener("load", () => {
  const loading = document.getElementById("loading-screen");
  const bgm = document.getElementById("bgm");

  if (bgm) {
    bgm.volume = 0.3;
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

    result.innerText = "記録しています…";

    setTimeout(() => {
      if (bell) {
        bell.volume = 0.6;
        bell.play().catch(() => {});
      }

      const cardBox = document.getElementById("memory-card");
      const image = document.getElementById("memory-image");
      const title = document.getElementById("memory-title");
      const poem = document.getElementById("memory-poem");

      if (cardBox) {
        cardBox.style.display = "block";
      }

      if (image) {
        image.src = card.image;
        image.alt = card.title;
      }

      if (title) {
        title.innerText = `Memory No.${card.no}　${card.title}`;
      }

      if (poem) {
        poem.innerText = card.poem;
      }

      result.innerText = "";
    }, 2000);
  });
}