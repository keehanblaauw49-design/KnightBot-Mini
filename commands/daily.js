const fs = require("fs")
const dbFile = "./database.json"

function loadDB() { return JSON.parse(fs.readFileSync(dbFile)) }
function saveDB(db) { fs.writeFileSync(dbFile, JSON.stringify(db, null, 2)) }

module.exports = {
  name: "daily",
  desc: "Claim your daily reward",
  category: "economy",
  execute: async (sock, msg) => {
    let sender = msg.key.participant || msg.key.remoteJid
    let db = loadDB()

    if (!db.users[sender]) db.users[sender] = { money: 1000, xp: 0, warns: 0, inventory: [], skills: [] }

    let reward = Math.floor(Math.random() * 500) + 100
    db.users[sender].money += reward

    await sock.sendMessage(msg.key.remoteJid, {
      text: `🎁 You earned $${reward} today!\n💰 Total Balance: $${db.users[sender].money}`
    })

    saveDB(db)
  }
                                               }
