const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;
const dbPath = path.join(__dirname, "db.json");

app.use(cors());
app.use(bodyParser.json());

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({ entries: [] }, null, 2));
}

app.get("/entries", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading file" });
    res.json(JSON.parse(data).entries);
  });
});

app.post("/entries", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading file" });

    let jsonData = JSON.parse(data);
    jsonData.entries.push({ id: Date.now().toString(), ...req.body });

    fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error writing file" });
      res.status(201).json({ message: "Entry saved successfully" });
    });
  });
});

app.delete("/entries/:id", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading file" });

    let jsonData = JSON.parse(data);
    jsonData.entries = jsonData.entries.filter((entry) => entry.id !== req.params.id);

    fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error writing file" });
      res.json({ message: "Entry deleted successfully" });
    });
  });
});

app.get("/entries/:id", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading file" });

    let jsonData = JSON.parse(data);
    const entry = jsonData.entries.find((entry) => entry.id === req.params.id);

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.json(entry);
  });
});

app.put("/entries/:id", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading file" });

    let jsonData = JSON.parse(data);
    let entryIndex = jsonData.entries.findIndex((entry) => entry.id === req.params.id);

    if (entryIndex === -1) {
      return res.status(404).json({ message: "Entry not found" });
    }

    jsonData.entries[entryIndex] = { ...jsonData.entries[entryIndex], ...req.body };

    fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error writing file" });
      res.json({ message: "Entry updated successfully" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
