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

/* ==========================================
   404夏祭り 共通BGM管理・スマホ対応版
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const festivalBgm =
    document.getElementById("festival-bgm");

  if (!festivalBgm) return;

  const TIME_KEY = "festivalBgmTime";
  const PLAYING_KEY = "festivalBgmPlaying";

  festivalBgm.volume = 0.15;

  // 保存位置を復元
  const restorePosition = () => {
    const savedTime = Number.parseFloat(
      localStorage.getItem(TIME_KEY)
    );

    if (
      Number.isFinite(savedTime) &&
      savedTime >= 0 &&
      festivalBgm.duration &&
      savedTime < festivalBgm.duration
    ) {
      festivalBgm.currentTime = savedTime;
    }
  };

  // 音源情報を読み込んでから位置を戻す
  if (festivalBgm.readyState >= 1) {
    restorePosition();
  } else {
    festivalBgm.addEventListener(
      "loadedmetadata",
      restorePosition,
      { once: true }
    );
  }

  const startBgm = () => {
    festivalBgm.play()
      .then(() => {
        localStorage.setItem(PLAYING_KEY, "true");
      })
      .catch(() => {
        // 自動再生制限時は最初の操作を待つ
      });
  };

  // 前ページで再生中なら続きから再開
  if (localStorage.getItem(PLAYING_KEY) === "true") {
    startBgm();
  }

  // スマホの自動再生制限対策
  const startOnUserAction = () => {
    startBgm();

    document.removeEventListener(
      "click",
      startOnUserAction
    );

    document.removeEventListener(
      "touchstart",
      startOnUserAction
    );
  };

  document.addEventListener(
    "click",
    startOnUserAction
  );

  document.addEventListener(
    "touchstart",
    startOnUserAction,
    { passive: true }
  );

  // 再生位置を保存
  const saveBgmState = () => {
    if (Number.isFinite(festivalBgm.currentTime)) {
      localStorage.setItem(
        TIME_KEY,
        String(festivalBgm.currentTime)
      );
    }

    if (!festivalBgm.paused) {
      localStorage.setItem(PLAYING_KEY, "true");
    }
  };

  festivalBgm.addEventListener(
    "timeupdate",
    saveBgmState
  );

  // ページを離れる直前に必ず保存
  window.addEventListener(
    "pagehide",
    saveBgmState
  );

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.visibilityState === "hidden") {
        saveBgmState();
      }
    }
  );

  // 念のため定期保存
  setInterval(saveBgmState, 500);
});

