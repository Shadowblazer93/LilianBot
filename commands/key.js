const Discord = require('discord.js');

module.exports = {
    name: 'key',
    description: 'Give a steam key to a user',
    execute(message, args){
            if(message.author.id == !'411548232133640203') return message.channel.send("This is a dev only command!")
            if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')

            if(!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send('Please give me permissions to send messages.')
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('ERROR : Only admins can use this command!')

            const Ekey = new Discord.MessageEmbed()
            .setTitle('Key')
            .setDescription('**Usage** : ``;key [user] [key] [game]``\n**Permissions** : Administrator')
            .setColor("RED")

            let senderpfp = message.author
            let sendername = message.author.username

            let steamuser = message.guild.members.cache.get(args[0]) || message.mentions.members.first()
            if(!steamuser) return message.channel.send(Ekey)

            let steamkey = args[1]
            if(!steamkey) return message.channel.send('Please enter a valid steam key!')
            if(!steamkey.includes('-')) return message.channel.send('Please enter a valid steam key!')

            let steamgame = args.slice(2).join(" ")
            if(!steamgame) return message.channel.send('Please enter the game\'s name!')

            const Esteaminfo = new Discord.MessageEmbed()
            .setTitle('You have won a steam key! :tada:')
            .addField('Game','```' + steamgame + '```')
            .addField('Steam key','```' + steamkey + '```\n[Click here to redeem your key](https://store.steampowered.com/account.registerkey)')
            .setFooter(`Given by ${sendername}`,senderpfp.displayAvatarURL())
            .setColor("GREEN")

            message.channel.bulkDelete(1)
            steamuser.send(Esteaminfo).then(() => {
                message.channel.send(`✅  Successfully sent the key to \`\`${steamuser.displayName}\`\``).then(r => r.delete({ timeout: 3000 })).catch(err => {
                    message.channel.send('I\'m having a headache. Please try again later.')
                })
            }).catch(err => {
                return message.channel.send(`❌\`\`${steamuser.displayName}\`\` has their DMs turned off!`).then(r => r.delete({ timeout : 3000}))
            });
    }
}
