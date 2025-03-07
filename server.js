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
  fs.writeFileSync(dbPath, JSON.stringify({ users: [] }, null, 2));
}

app.get("/display", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading file" });
    res.json(JSON.parse(data).users);
  });
});

app.post("/create", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading file" });

    let jsonData = JSON.parse(data);
    jsonData.users.push({ id: Date.now().toString(), ...req.body });

    fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error writing file" });
      res.status(201).json({ message: "Entry saved successfully" });
    });
  });
});

app.delete("/delete/:id", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading file" });

    let jsonData = JSON.parse(data);
    jsonData.users = jsonData.users.filter((entry) => entry.id !== req.params.id);

    fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error writing file" });
      res.json({ message: "Entry deleted successfully" });
    });
  });
});

app.get("/display/:id", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading file" });

    let jsonData = JSON.parse(data);
    const entry = jsonData.users.find((entry) => entry.id === req.params.id);

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.json(entry);
  });
});

app.put("/edit/:id", (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading file" });

    let jsonData = JSON.parse(data);
    let entryIndex = jsonData.users.findIndex((entry) => entry.id === req.params.id);

    if (entryIndex === -1) {
      return res.status(404).json({ message: "Entry not found" });
    }

    jsonData.users[entryIndex] = { ...jsonData.users[entryIndex], ...req.body };

    fs.writeFile(dbPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error writing file" });
      res.json({ message: "Entry updated successfully" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
