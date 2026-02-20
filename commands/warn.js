const fs = require("fs")
const dbFile = "./database.json"

function loadDB() { return JSON.parse(fs.readFileSync(dbFile)) }
function saveDB(db) { fs.writeFileSync(dbFile, JSON.stringify(db, null, 2)) }

module.exports = {
  name: "warn",
  desc: "Warn a user",
  category: "moderation",
  execute: async (sock, msg) => {
    let user = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
    if (!user) return

    let db = loadDB()
    if (!db.users[user]) db.users[user] = { money: 1000, xp: 0, warns: 0, inventory: [], skills: [] }

    db.users[user].warns = (db.users[user].warns || 0) + 1

    if (db.users[user].warns >= 3) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: `🚫 @user removed (3 warns)`,
        mentions: [user]
      })
      db.users[user].warns = 0
    } else {
      await sock.sendMessage(msg.key.remoteJid, {
        text: `⚠️ Warn ${db.users[user].warns}/3`,
        mentions: [user]
      })
    }

    saveDB(db)
  }
      }
