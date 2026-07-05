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

    result.innerText = "記録しています…";

    setTimeout(() => {
      if (bell) {
        bell.volume = 0.6;
        bell.play();
      }

      result.innerText = `「${memory1} ${memory2}」を奉納しました`;
    }, 2000);
  });
}
