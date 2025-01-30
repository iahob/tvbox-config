const { readFileSync } = require("fs");
const { join } = require("path");

module.exports = (req, res) => {
  if (req.url === "/iptv4.txt") {
    const iptvData = readFileSync(join(__dirname, "iptv4.txt"), "utf-8");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.statusCode = 200;
    res.end(iptvData);
  } else {
    const data = readFileSync(join(__dirname, "data.json"), "utf-8");
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(data);
  }
};