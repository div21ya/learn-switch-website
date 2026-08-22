const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

// Judge0 C compiler proxy
app.post("/api/compile", async (req, res) => {
  try {
    const { source_code, stdin } = req.body;

    if (!source_code) {
      return res.status(400).json({
        error: "No source code provided",
      });
    }

    const apiKey = process.env.RAPID_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "RapidAPI key is not configured on the server.",
      });
    }

    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        body: JSON.stringify({
          language_id: 50,
          source_code: source_code,
          stdin: stdin || "",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data,
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Judge0 error:", error);

    res.status(500).json({
      error: "Compiler service unavailable.",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
