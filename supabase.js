const SUPABASE_URL = "https://mzmhbeqvdlaokzjalmxa.supabase.co";

const SUPABASE_KEY = "sb_publishable_aRH1j7nIKa8dnL5tKR1dHQ_0qqH2a6f";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

console.log("Supabase connected!", supabaseClient);

async function updateConnectionRecord() {
  if (!supabaseClient) return;
  const countElement = document.getElementById("connection-count");

  if (!countElement) {
    console.error("connection-count が見つかりません");
    return;
  }

  try {
    const { data, error } = await supabaseClient.rpc(
  "increment_connection_counter"
);

    if (error) {
      throw error;
    }

supabaseClient
  .from("connection_logs")
  .insert([{}])
  .then(({ error }) => {
    if (error) {
      console.error("Connection log error:", error);
    }
  });

    const formattedCount = String(data).padStart(6, "0");
    countElement.textContent = formattedCount;

    console.log("Connection record:", formattedCount);
  } catch (error) {
    console.error(
  "接続記録の更新に失敗しました:",
  JSON.stringify(error, null, 2)
);
    countElement.textContent = "------";
  }
}

document.addEventListener("DOMContentLoaded", updateConnectionRecord);
try {
  document.addEventListener(
    "DOMContentLoaded",
    updateConnectionRecord
  );
} catch (e) {
  console.error(e);
}
