module.exports = {
  name: "balance",
  alias: ["bal"],
  desc: "Check your money",
  category: "economy",
  react: "💰",
  start: async (conn, m) => {
    let user = m.sender

    global.db.data.users[user] = global.db.data.users[user] || { money: 1000 }

    let money = global.db.data.users[user].money

    await conn.sendMessage(m.chat, {
      text: `💰 Your Balance: $${money}`
    }, { quoted: m })
  }
      }
