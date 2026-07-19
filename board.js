"use strict";

const STORAGE_KEY = "404MemoryBoardRecords";

const nameInput = document.getElementById("user-name");
const memoryInput = document.getElementById("memory-text");
const postButton = document.getElementById("post-button");
const board = document.getElementById("board");
const boardStatus = document.getElementById("board-status");
const memoryCount = document.getElementById("memory-count");
const boardCount = document.getElementById("board-count");


function loadRecords() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return [];
        }

        const records = JSON.parse(saved);

        return Array.isArray(records) ? records : [];

    } catch (error) {
        console.error("記録の読み込みに失敗しました。", error);
        return [];
    }
}


function saveRecords(records) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(records)
    );
}


function formatDate(timestamp) {
    const date = new Date(timestamp);

    return new Intl.DateTimeFormat("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    }).format(date);
}


function createRecordCard(record) {
    const article = document.createElement("article");
    article.className = "memory-record-card";

    const header = document.createElement("div");
    header.className = "memory-record-header";

    const observer = document.createElement("p");
    observer.className = "memory-record-observer";
    observer.textContent = record.name;

    const date = document.createElement("time");
    date.className = "memory-record-date";
    date.dateTime = record.createdAt;
    date.textContent = formatDate(record.createdAt);

    const text = document.createElement("p");
    text.className = "memory-record-text";
    text.textContent = record.memory;

    const code = document.createElement("p");
    code.className = "memory-record-code";

   const serialNumber =
    Number(record.serial) ||
    Math.max(1, loadRecords().indexOf(record) + 1);

code.textContent =
    `MEMORY RECORD: 404-${String(serialNumber).padStart(4, "0")}`;

    header.appendChild(observer);
    header.appendChild(date);

    article.appendChild(header);
    article.appendChild(text);
    article.appendChild(code);

    return article;
}


function renderRecords() {
    const records = loadRecords();

    board.replaceChildren();

    boardCount.textContent =
        `${records.length} RECORD${records.length === 1 ? "" : "S"}`;

    if (records.length === 0) {
        const empty = document.createElement("p");

        empty.className = "secret-board-empty";
        empty.textContent =
            "まだ記録は流れ着いていません。";

        board.appendChild(empty);
        return;
    }

    records
    .map((record, index) => ({
        ...record,
        serial: Number(record.serial) || index + 1
    }))
    .reverse()
    .forEach(record => {
        board.appendChild(
            createRecordCard(record)
        );
    });
}


function updateCharacterCount() {
    memoryCount.textContent =
        `${memoryInput.value.length} / 300`;
}


function showStatus(message, type = "") {
    boardStatus.textContent = message;
    boardStatus.className =
        `board-status ${type}`.trim();
}

function getNextSerial(records) {

    const highestSerial = records.reduce((highest, record) => {
        const serial = Number(record.serial) || 0;
        return Math.max(highest, serial);
    }, 0);

    return highestSerial + 1;
}

function playLanternAnimation() {

    return new Promise(resolve => {

        const scene = document.createElement("div");
        scene.className = "lantern-flow-scene";

        const lantern = document.createElement("img");

lantern.className = "memory-lantern-image";
lantern.src = "images/lantern-flow.png";
lantern.alt = "";

        const message = document.createElement("p");
        message.className = "lantern-flow-message";
        message.textContent = "記録を灯籠へ移しています…";

        scene.appendChild(lantern);
        scene.appendChild(message);

        document.body.appendChild(scene);

        requestAnimationFrame(() => {
            scene.classList.add("active");
        });

        setTimeout(() => {
    scene.classList.add("fade-out");
}, 4700);

setTimeout(() => {
    scene.remove();
    resolve();
}, 5200);

    });

}

async function submitRecord() {
    const memory = memoryInput.value.trim();

    if (!memory) {
        showStatus(
            "記録する思い出を入力してください。",
            "error"
        );

        memoryInput.focus();
        return;
    }

    const name =
        nameInput.value.trim() ||
        "匿名の観測者";

    const records = loadRecords();
    const serial = getNextSerial(records);

    const newRecord = {
        id: `${Date.now()}-${Math.random()
            .toString(16)
            .slice(2)}`,

        serial,
        name,
        memory,
        createdAt: new Date().toISOString()
    };

    postButton.disabled = true;
    postButton.textContent = "記録中…";

    showStatus(
        "灯籠へ記録を移しています。",
        ""
    );

    await playLanternAnimation();

    records.push(newRecord);
    saveRecords(records);

    memoryInput.value = "";
    nameInput.value = "";

    updateCharacterCount();
    renderRecords();

    showStatus(
        `記録 404-${String(serial).padStart(4, "0")} を受信しました。`,
        "success"
    );

    postButton.disabled = false;
    postButton.textContent = "記録を送信する";

    const newestCard =
        board.querySelector(".memory-record-card");

    if (newestCard) {
        newestCard.classList.add("new");

        newestCard.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}

memoryInput.addEventListener(
    "input",
    updateCharacterCount
);

postButton.addEventListener(
    "click",
    submitRecord
);

memoryInput.addEventListener(
    "keydown",
    event => {
        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {
            submitRecord();
        }
    }
);


updateCharacterCount();
renderRecords();
