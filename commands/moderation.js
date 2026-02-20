const fs = require("fs")
const dbFile = "./database.json"

function loadDB() { return JSON.parse(fs.readFileSync(dbFile)) }
function saveDB(db) { fs.writeFileSync(dbFile, JSON.stringify(db, null, 2)) }

const blacklist = ["wa.me/", "chat.whatsapp.com/"]

module.exports = {
  name: "moderation",
  desc: "Auto-moderation system",
  category: "moderation",
  execute: async (sock, msg) => {
    let sender = msg.key.participant || msg.key.remoteJid
    let db = loadDB()
    if (!db.users[sender]) db.users[sender] = { money: 1000, xp: 0, warns: 0, inventory: [], skills: [], quests: [] }

    let text = msg.message.conversation || ""
    for (let pattern of blacklist) {
      if (text.includes(pattern)) {
        db.users[sender].warns = (db.users[sender].warns || 0) + 1

        if (db.users[sender].warns >= 3) {
          await sock.sendMessage(msg.key.remoteJid, { text: `🚫 @user removed (3 warns)`, mentions: [sender] })
          db.users[sender].warns = 0
        } else {
          await sock.sendMessage(msg.key.remoteJid, { text: `⚠️ Warn ${db.users[sender].warns}/3`, mentions: [sender] })
        }

        saveDB(db)
        return
      }
    }

    saveDB(db)
  }
          }
