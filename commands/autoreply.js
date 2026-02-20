const fs = require("fs")
const dbFile = "./database.json"

function loadDB() { return JSON.parse(fs.readFileSync(dbFile)) }
function saveDB(db) { fs.writeFileSync(dbFile, JSON.stringify(db, null, 2)) }

module.exports = {
  name: "autoreply",
  desc: "Make bot feel alive",
  category: "fun",
  execute: async (sock, msg) => {
    let text = (msg.message.conversation || "").toLowerCase()
    let sender = msg.key.participant || msg.key.remoteJid
    let db = loadDB()
    if (!db.users[sender]) db.users[sender] = { money: 1000, xp: 0, warns: 0, inventory: [], skills: [], quests: [] }

    if (text.includes("hi") || text.includes("hello")) {
      await sock.sendMessage(msg.key.remoteJid, { text: "👋 Welcome... Rimuru is watching 😈" })
    } else if (text.includes("bye") || text.includes("see ya")) {
      await sock.sendMessage(msg.key.remoteJid, { text: "👋 See you later! Rimuru awaits 😏" })
    } else if (text.includes("how are you")) {
      await sock.sendMessage(msg.key.remoteJid, { text: "😎 Rimuru is always chill. You?" })
    } else if (text.includes("money") || text.includes("balance")) {
      await sock.sendMessage(msg.key.remoteJid, { text: `💰 You have $${db.users[sender].money}` })
    }

    saveDB(db)
  }
                                                 }
