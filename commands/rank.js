const fs = require("fs")
const dbFile = "./database.json"

function loadDB() { return JSON.parse(fs.readFileSync(dbFile)) }
function saveDB(db) { fs.writeFileSync(dbFile, JSON.stringify(db, null, 2)) }

module.exports = {
  name: "rank",
  alias: ["xp", "level"],
  desc: "Check your XP / level",
  category: "leveling",
  execute: async (sock, msg) => {
    let sender = msg.key.participant || msg.key.remoteJid
    let db = loadDB()

    if (!db.users[sender]) db.users[sender] = { money: 1000, xp: 0, warns: 0, inventory: [], skills: [] }

    db.users[sender].xp += 10

    await sock.sendMessage(msg.key.remoteJid, {
      text: `⭐ XP: ${db.users[sender].xp}`
    })

    saveDB(db)
  }
      }
