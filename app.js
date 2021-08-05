const Discord = require("discord.js");
const client = new Discord.Client();
require('dotenv').config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("YOU 👀", { type: "WATCHING" });
});

client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});

client.on("voiceStateUpdate", async (oldMember, newMember) => {
  let newUserChannel = newMember.channelID;
  let oldUserChannel = oldMember.channelID;

  if (newUserChannel !== null && oldUserChannel !== null) {
    if (newUserChannel !== oldUserChannel) {
      sendLog(
        newMember.id,
        `Changed VC from ${oldMember.channel.name} => ${newMember.channel.name}`,
        newMember
      );
    } else {
      //user muted or unmuted himself/herself
      //sendLog(newMember.id, ` muted or deafen on ${newMember.channel.name}`);
    }
  } else if (newUserChannel !== null) {
    //joined
    sendLog(newMember.id, `Joined VC ${newMember.channel.name}`, newMember);
  } else if (newUserChannel === null) {
    // User leaves a voice channel
    sendLog(oldMember.id, `left VC ${oldMember.channel.name}`, oldMember);
  }
});

let sendLog = async (id, log, serverObj) => {
  const user = await client.users.fetch(id);
  let logString = String(user.username + " " + log);
  serverObj.channel.guild.channels.cache.map((channel) => {
    if (channel.name === "stalker-log") {
      client.channels.cache
        .get(channel.id)
        .send(log ? `${user}` + " " + log : "something happend");
    } else {
    }
  });
};

client.login(process.env.DISCORD_API_SECRET);
