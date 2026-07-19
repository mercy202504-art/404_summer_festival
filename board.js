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
    code.textContent =
        `MEMORY ID: ${String(record.id).slice(-8).toUpperCase()}`;

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
        .slice()
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


function submitRecord() {
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

    records.push({
        id: `${Date.now()}-${Math.random()
            .toString(16)
            .slice(2)}`,

        name,
        memory,
        createdAt: new Date().toISOString()
    });

    saveRecords(records);

    memoryInput.value = "";
    nameInput.value = "";

    updateCharacterCount();
    renderRecords();

    showStatus(
        "記録を受信しました。",
        "success"
    );

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