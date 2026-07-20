const SUPABASE_URL = "https://mzmhbeqvdlaokzjalmxa.supabase.co";

const SUPABASE_KEY = "sb_publishable_aRH1j7nIKa8dnL5tKR1dHQ_0qqH2a6f";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
console.log("Supabase connected!", supabase);

async function updateConnectionRecord() {
  const countElement = document.getElementById("connection-count");

  if (!countElement) {
    console.error("connection-count が見つかりません");
    return;
  }

  try {
    const { data, error } = await supabase.rpc(
      "increment_connection_counter"
    );

    if (error) {
      throw error;
    }

    const formattedCount = String(data).padStart(6, "0");
    countElement.textContent = formattedCount;

    console.log("Connection record:", formattedCount);
  } catch (error) {
    console.error("接続記録の更新に失敗しました:", error);
    countElement.textContent = "------";
  }
}

document.addEventListener("DOMContentLoaded", updateConnectionRecord);