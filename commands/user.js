const Discord = require('discord.js');
const moment = require('moment')

module.exports = {
    name: 'user',
    aliases: ['u'],
    description: 'Tells information about the user',
    execute(message, args){
        if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')

        if(!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send('I do not have permissions to speak in that channel!').catch(err => {return;})

        let iuser = member = message.mentions.members.first() || message.member
        if(typeof iuser == undefined) return message.channel.send("I'm unable to get the user's info")

        let joineddiscord = moment(iuser.user.createdTimestamp).format('MMMM Do, YYYY')
        let joinedguild = moment(iuser.joinedTimestamp).format('MMMM Do, YYYY')

        let Einfo = new Discord.MessageEmbed()
        .setAuthor(`${iuser.user.username}#${iuser.user.discriminator}`, iuser.user.displayAvatarURL({dynamic:true}))
        .setThumbnail(iuser.user.displayAvatarURL({format:'png'}))
        .addField('ID',iuser.user.id)
        .addField('Joined Discord',joineddiscord, true)
        .addField('Joined Server',joinedguild, true)
        .setColor('BLUE')

        message.channel.send(Einfo)
    }
}