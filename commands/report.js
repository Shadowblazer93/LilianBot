const Discord = require('discord.js');

module.exports = {
    name: 'report',
    description: 'reports the member specified',
    execute(message, args){
      if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')
      if(!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send('I do not have permissions to speak in that channel!').catch(err => {return;})

      const Ereport = new Discord.MessageEmbed()
      .setTitle('Report')
      .setDescription('**Usage** : `;report [user] (reason)`')
      .setColor("RED")

      const Emodlog = new Discord.MessageEmbed()
      .setDescription('This server doesn\'t have a report channel.\nYou can create one using `;reportsetup`')
      .setColor("RED")

      const Ereason = new Discord.MessageEmbed()
      .setDescription('You are required to specify a reason to report a member.')
      .setColor("RED")

      const Eselfreport = new Discord.MessageEmbed()
      .setDescription('Very honest. Unfortunately you cannot report yourself.')
      .setColor("RED")

      let modchannel = message.guild.channels.cache.find(r => r.name.includes('reports'))
      if(!modchannel) return message.channel.send(Emodlog)

      let ruser = message.guild.members.cache.get(args[0]) || message.mentions.members.first()
      if(!ruser) return message.channel.send(Ereport)
      if(ruser.id === message.author.id) return message.channel.send(Eselfreport)

      let rreason = args.slice(1).join(" ")
      if(!rreason) return message.channel.send(Ereason)

      const Ereporter = new Discord.MessageEmbed()
      .setAuthor(`${ruser.user.username}#${ruser.user.discriminator} has been reported`, ruser.user.displayAvatarURL({dynamic:true}))
      .addField('User',`${ruser}`, true)
      .addField('Reporter',`${message.author}`, true)
      .addField('Reason', rreason)
      .setColor("RED")
      .setTimestamp()

      const Ereported = new Discord.MessageEmbed()
      .setDescription(`${ruser} has been reported`)
      .setColor("GREEN")

      if(modchannel) modchannel.send(Ereporter).then(() => {
        message.channel.send(Ereported)
      })
}}
