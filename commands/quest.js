const fs = require("fs")
const dbFile = "./database.json"

function loadDB() { return JSON.parse(fs.readFileSync(dbFile)) }
function saveDB(db) { fs.writeFileSync(dbFile, JSON.stringify(db, null, 2)) }

const quests = [
  { name: "Slay 5 monsters", rewardMoney: 500, rewardXP: 50 },
  { name: "Collect 3 potions", rewardMoney: 300, rewardXP: 30 }
]

module.exports = {
  name: "quest",
  desc: "Check or complete quests",
  category: "rpg",
  execute: async (sock, msg) => {
    let sender = msg.key.participant || msg.key.remoteJid
    let db = loadDB()
    if (!db.users[sender]) db.users[sender] = { money: 1000, xp: 0, inventory: [], skills: [], quests: [] }

    let userQuests = db.users[sender].quests

    if (userQuests.length === 0) {
      let quest = quests[Math.floor(Math.random() * quests.length)]
      db.users[sender].quests.push({ ...quest, completed: false })
      saveDB(db)
      return sock.sendMessage(msg.key.remoteJid, { text: `🗡 New Quest Assigned: ${quest.name}` })
    }

    let questText = userQuests.map(q => `${q.name} - Completed: ${q.completed}`).join("\n")
    sock.sendMessage(msg.key.remoteJid, { text: `📜 Your Quests:\n${questText}` })
    saveDB(db)
  }
  }
