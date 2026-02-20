const fs = require("fs")
const dbFile = "./database.json"

function loadDB() { return JSON.parse(fs.readFileSync(dbFile)) }
function saveDB(db) { fs.writeFileSync(dbFile, JSON.stringify(db, null, 2)) }

module.exports = {
  name: "gamble",
  desc: "Gamble money",
  category: "economy",
  execute: async (sock, msg) => {
    let sender = msg.key.participant || msg.key.remoteJid
    let db = loadDB()
    if (!db.users[sender]) db.users[sender] = { money: 1000, xp: 0, inventory: [], skills: [], quests: [] }

    let args = msg.message.conversation.split(" ")
    let bet = parseInt(args[1])
    if (!bet || bet <= 0) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Enter a valid bet!" })
    if (db.users[sender].money < bet) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Not enough money!" })

    let roll = Math.floor(Math.random() * 6) + 1
    if (roll >= 4) {
      db.users[sender].money += bet
      await sock.sendMessage(msg.key.remoteJid, { text: `🎲 You rolled ${roll} and won $${bet}!` })
    } else {
      db.users[sender].money -= bet
      await sock.sendMessage(msg.key.remoteJid, { text: `🎲 You rolled ${roll} and lost $${bet}!` })
    }

    saveDB(db)
  }
      }
