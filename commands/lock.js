const Discord = require('discord.js');

module.exports = {
    name: 'lock',
    description: 'locks the channel specified',
    execute(message, args){
        if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')

        if(!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send('I do not have permissions to speak in that channel!').catch(err => {return;})
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('I do not have permission to manage channels!')
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I do not have permission to manage roles!')
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('ERROR : You do not have permission to manage channels!')


        const Elock = new Discord.MessageEmbed()
        .setTitle('Lock')
        .setDescription('**Usage** : `;lock [channel]`\n**Permissions** : `MANAGE_CHANNELS`')
        .setColor("RED")

        let lchannel = message.mentions.channels.first()
        if(!lchannel) return message.channel.send(Elock)

        const Elsuccess = new Discord.MessageEmbed()
        .setDescription(`Successfully locked ${lchannel}`)
        .setColor("GREEN")

        const Elfail = new Discord.MessageEmbed()
        .setDescription(`I do not have permissions to manage roles.\nOr I am not able to access that channel.`)
        .setColor("RED")

        lchannel.updateOverwrite(lchannel.guild.roles.everyone, { SEND_MESSAGES: false}).then(() => {
          message.channel.send(Elsuccess).catch(err => {return;})
        }).catch(err => {message.channel.send(Elfail)})
}}
