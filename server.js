const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

app.use(cors());

const port = 3000;

const routes = JSON.parse(fs.readFileSync("routes.json", "utf8"));

app.get("/api/routes", (req, res) => {
  res.json(routes);
});

app.get("/api/find", (req, res) => {
  const from = req.query.from;
  const to = req.query.to;

  const result = routes.filter((route) => {
    const indexFrom = route.stops.indexOf(from);
    const indexTo = route.stops.indexOf(to);
    return indexFrom !== -1 && indexTo !== -1 && indexFrom < indexTo;
  });

  res.json(result);
});

app.listen(port, () => {
  console.log(`Backend en écoute sur http://localhost:${port}`);
});
