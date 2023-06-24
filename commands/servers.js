const Discord = require('discord.js');

module.exports = {
  name: 'servers',
  description: 'Shows how many servers Lilian is in',
  execute(message, args, bot) {
      Eservers = new Discord.MessageEmbed()
      .setDescription(`Lilian is in \`${bot.guilds.cache.size}\` servers`)
      .setColor("GREEN")

      message.channel.send(Eservers).catch(err => {return})
  }}