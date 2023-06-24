const Discord = require('discord.js');

module.exports = {
  name: 'reportsetup',
  description: 'Creates a report channel.',
  execute(message, args) {
    if(!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send('I do not have permissions to speak in that channel!').catch(err => {return;})
    if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('I do not have permission to manage channels!')
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('ERROR : You do not have permission to manage channels!')

    const Ereportsetup = new Discord.MessageEmbed()
    .setDescription('Click the reaction below to create a channel for reports.')
    .setColor("BLUE")

    const Ealready = new Discord.MessageEmbed()
    .setDescription('This server already has a report channel')
    .setColor("RED")

    const Ereportsuccess = new Discord.MessageEmbed()
    .setDescription('Successfully created a report channel.\n \n**NOTE**: You can change the channel name\nbut it must include `reports`')
    .setColor("GREEN")

    const Ereporttime = new Discord.MessageEmbed()
    .setDescription('Time ran out')
    .setColor("RED")

    const Ereportfail = new Discord.MessageEmbed()
    .setDescription('Operation Cancelled')
    .setColor("RED")

    let reportchannel = message.guild.channels.cache.find(r => r.name.includes('reports'))
    if(reportchannel) return message.channel.send(Ealready)

    async function reportfunc(){
      const reportmsg = await message.channel.send(Ereportsetup)
      reportmsg.react('✅')

      const filter = (reaction, user) => {
      return ['✅'].includes(reaction.emoji.name) && user.id === message.author.id};

      reportmsg.awaitReactions(filter, { max: 1, time: 10000})
      .then(collected => {
      const reaction = collected.first();
      if (reaction.emoji.name === '✅') {
        message.guild.channels.create('reports')
        message.channel.send(Ereportsuccess)
        reportmsg.delete()
      } else {
        reportmsg.delete()
        message.channel.send(Ereportfail);
      }}).catch(collected => {
      reportmsg.delete()
      message.channel.send(Ereporttime);
      });
      }

      reportfunc()

}}
