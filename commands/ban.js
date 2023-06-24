const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'ban users from the guild',
    execute(message, args, bot){
        if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')


        if(!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send('I do not have permission to send messages in that channel!').catch(err => {return;})
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I do not have permission to ban members!')
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('ERROR : You do not have permissions to ban members!')

        const Eban = new Discord.MessageEmbed()
        .setTitle('Ban')
        .setDescription('**Usage** : ``;ban [user] (reason)``\n**Permissions** : Ban_Members')
        .setColor("RED")

        let buser = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || args[0]
        if(!buser) return message.channel.send(Eban)

        if(message.member.roles.highest.comparePositionTo(buser.roles.highest) < 0) return message.channel.send('❌ You are lower in role hierarchy than the user!')

        let breason = args.slice(1).join(" ")
        if(!breason) breason = 'Undefined'

        let modchannel = message.guild.channels.cache.find(r => r.name.includes('modlog'))

        const Ebanned = new Discord.MessageEmbed()
        .setAuthor(`${buser.user.username}#${buser.user.discriminator} has been banned`, buser.user.displayAvatarURL({dynamic:true}))
        .addField('User',`${buser}`, true)
        .addField('Moderator',`${message.author}`, true)
        .addField('Reason', breason)
        .setColor("BLUE")

        if(buser.id === message.author.id) return message.channel.send('Bruh why ban yourself u dum or something?')

        buser.ban({reason: breason}).then(() => {
          message.channel.send(Ebanned)
          if(!message.author.bot) {
              buser.send(Ebanned).catch(err => {return;})
              message.channel.send(`Sent a message stating their ban and reason in their dm ${bot.emojis.cache.get("771258865877909517")}`)
          }
          if(modchannel) modchannel.send(Ebanned)
        }).catch(err => {
            message.channel.send(`I can't ban someone with a role higher than me!`)
        })
    }
}
