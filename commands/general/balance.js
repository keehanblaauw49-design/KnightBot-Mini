const fs = require("fs")
const dbFile = "./database.json"

function loadDB() { return JSON.parse(fs.readFileSync(dbFile)) }
function saveDB(db) { fs.writeFileSync(dbFile, JSON.stringify(db, null, 2)) }

module.exports = {
  name: "balance",
  alias: ["bal"],
  desc: "Check your money",
  category: "economy",
  execute: async (sock, msg) => {
    let sender = msg.key.participant || msg.key.remoteJid
    let db = loadDB()

    if (!db.users[sender]) db.users[sender] = { money: 1000, xp: 0, warns: 0, inventory: [], skills: [] }

    await sock.sendMessage(msg.key.remoteJid, {
      text: `💰 Balance: $${db.users[sender].money}`
    })

    saveDB(db)
  }
    }
