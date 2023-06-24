const Discord = require('discord.js')

module.exports = {
    name: 'info',
    description: 'Gives information about the bot',
    execute(message, args){

        const Einfo = new Discord.MessageEmbed()
            .setThumbnail('https://cdn.discordapp.com/avatars/728176491514298478/8471d6241e5ef2dd2796d87149cf6d98.png')
            .addField('Help Website', '[Top.gg](https://top.gg/bot/728176491514298478)')
            .addField('Support server','[Join Now](https://discord.gg/smBNsAX)')
            .addField(`Changelog`,`[Click to Read](https://discord.com/channels/769091418118946827/769091418589233182)`)
            .addField('Version', 'Update 2.1.0')
            .addField('Message from Dev', 'Hello! Thanks for using my bot :-)', true)
            .setColor("YELLOW")

        if(message.channel.type == 'dm') return message.channel.send(Einfo);

        if (!message.guild.me.hasPermission("SEND_MESSAGES")) return  message.author.send('Please give me permissions to send messages.') 
            message.channel.send(Einfo)
    }
}