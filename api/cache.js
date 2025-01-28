const fetch = require("node-fetch");

let cache = {
  data: null,
  lastUpdated: 0,
};

const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 缓存时长：1小时

module.exports = async (req, res) => {
  const now = Date.now();

  // 检查缓存是否有效
  if (cache.data && now - cache.lastUpdated < CACHE_DURATION) {
    console.log("Serving from cache");
    return res.status(200).json(cache.data);
  }

  try {
    console.log("Fetching new data");
    // 请求原始数据
    const response = await fetch("https://raw.liucn.cc/box/m.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();

    // 更新缓存
    cache = {
      data,
      lastUpdated: now,
    };

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};