window.addEventListener("load", () => {

  const loading = document.getElementById("loading-screen");

  const bgm = document.getElementById("bgm");

  // 音量
  if (bgm) {
    bgm.volume = 0.3;
  }

  // 接続演出終了
  setTimeout(() => {

    if (loading) {
      loading.style.display = "none";
    }

    // 音再生
    if (bgm) {
      bgm.play().catch(() => {
        console.log("自動再生ブロック");
      });
    }

  }, 2500);

});

// 奉納ページ

const offerButton = document.getElementById("offer-button");

if (offerButton) {

  offerButton.addEventListener("click", () => {

    const memory1 =
      document.getElementById("memory1").value;

    const memory2 =
      document.getElementById("memory2").value;

    const result =
      document.getElementById("result-message");

    const bell =
      document.getElementById("bell-sound");

    // 奉納開始
    result.innerText = "記録しています…";

    // 2秒後
    setTimeout(() => {

      // 奉納SE
      if (bell) {
        bell.volume = 0.6;
        bell.play();
      }

      result.innerText =
        `「${memory1} ${memory2}」を奉納しました`;

    }, 2000);

  });

}

// 念のため、必ずローディングを消す
setTimeout(() => {
  const loading = document.getElementById("loading-screen");
  if (loading) {
    loading.style.display = "none";
  }
}, 3000);

});
