const Discord = require("discord.js");
const client = new Discord.Client();
console.log(); 
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  
  if (msg.content === "ping") {
    console.log(msg.guild.channels);
    msg.reply("pong");
  }
});

client.login("ODcyNTMyMjc4NTA3NjAxOTIw.YQrPAg.4qEmLfYlWmUXedxAtCJmd7VzInk");
