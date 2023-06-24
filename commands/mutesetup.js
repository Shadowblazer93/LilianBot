const Discord = require('discord.js');

module.exports = {
    name: 'mutesetup',
    description: 'mutes the user specified',
    execute(message, args){
        if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')

        if(!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send('I do not have permissions to speak in that channel!').catch(err => {return;})
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('I do not have permission to kick members!')
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('ERROR : You do not have permission to kick members!')

        const Emute = new Discord.MessageEmbed()
        .setTitle('Setup Command for ;mute')
        .setDescription('**Usage** : `;mutesetup`\n**Permissions** : `Kick_Members`')
        .setColor("RED")

        const Emutesuccess = new Discord.MessageEmbed()
        .setDescription(`Successfully set up the muted role.`)
        .setColor("GREEN")

        const Emutealreadythere = new Discord.MessageEmbed()
        .setDescription(`**The muted role is already setup in this server.**\nIn case the role has been tampered with, delete the role and try again.`)
        .setColor("RED")

        let fetchedrole = message.guild.roles.cache.find(r=> r.name === 'Muted-EB')
        if(fetchedrole){
          message.channel.send(Emutealreadythere)
          return;
        }

        if(!fetchedrole){
        message.guild.roles.create({
            data: {
            name: 'Muted-EB',
            color: 'BLACK'
                  }
        }).then(() => {
          let mutedrole = message.guild.roles.cache.find(r => r.name === 'Muted-EB')
          message.guild.channels.cache.forEach(channel => {
          channel.updateOverwrite(mutedrole.id , {SEND_MESSAGES:false}) })
          message.channel.send(Emutesuccess)
      })
    }
}}
