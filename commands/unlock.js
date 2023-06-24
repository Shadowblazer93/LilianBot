const Discord = require('discord.js');

module.exports = {
    name: 'unlock',
    description: 'unlocks the channel specified',
    execute(message, args){
        if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')

        if(!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send('I do not have permissions to speak in that channel!').catch(err => {return;})
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('I do not have permission to manage channels!')
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I do not have permission to manage roles!')
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('ERROR : You do not have permission to manage channels!')


        const Eunlock = new Discord.MessageEmbed()
        .setTitle('Unlock')
        .setDescription('**Usage** : `;unlock [channel]`\n**Permissions** : `MANAGE_CHANNELS`')
        .setColor("RED")

        let unlchannel = message.mentions.channels.first()
        if(!unlchannel) return message.channel.send(Eunlock)

        const Eunlsuccess = new Discord.MessageEmbed()
        .setDescription(`Successfully unlocked ${unlchannel}`)
        .setColor("GREEN")

        const Eunlfail = new Discord.MessageEmbed()
        .setDescription(`I do not have permissions to manage roles.\nOr I am not able to access that channel.`)
        .setColor("RED")

        unlchannel.updateOverwrite(unlchannel.guild.roles.everyone, { SEND_MESSAGES: true}).then(() => {
          message.channel.send(Eunlsuccess).catch(err => {return;})
        }).catch(err => {message.channel.send(Eunlfail)})
}}
