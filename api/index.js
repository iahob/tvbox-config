const fs = require("fs");
const path = require("path");

module.exports = async (req, res) => {
  try {
    // 修正文件路径：使用 __dirname 直接指向当前 API 目录
    const filePath = path.join(__dirname, "data.json");

    // 确保文件存在
    if (!fs.existsSync(filePath)) {
      throw new Error("JSON file not found");
    }

    const jsonData = fs.readFileSync(filePath, "utf8");
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(JSON.parse(jsonData));
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};