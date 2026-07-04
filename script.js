// ローディングを必ず消す
setTimeout(() => {
  const loading = document.getElementById("loading-screen");
  if (loading) {
    loading.style.display = "none";
  }
}, 3000);

// BGM音量
window.addEventListener("load", () => {
  const bgm = document.getElementById("bgm");

  if (bgm) {
    bgm.volume = 0.3;
    bgm.play().catch(() => {
      console.log("自動再生ブロック");
    });
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