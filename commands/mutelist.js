const Discord = require('discord.js');

module.exports = {
    name: 'mutelist',
    description: 'mutes the user specified',
    execute(message, args){
        if(message.author.id == !'411548232133640203') return message.channel.send("This is a dev only command!")
        if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')

        if(!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send('I do not have permissions to speak in that channel!').catch(err => {return;})
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('I do not have permission to manage channels!')
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I do not have permission to manage roles!')
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('ERROR : You do not have permission to manage channels!')

        let mutedrole = message.guild.roles.cache.find(r=> r.name === 'Muted-EB')
        let mutedmembers = mutedrole.members.map(m => m.user.tag).join('\n')
        if(!mutedrole) return message.channel.send('There is no muted role in the server. Type ;mutesetup to create the role.')

        const Emutelist = new Discord.MessageEmbed()
        .setTitle('Muted Members')
        .setDescription(mutedmembers)   
        .setColor("RED")

        message.channel.send(Emutelist)

}}
