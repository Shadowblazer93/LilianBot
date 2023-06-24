const Discord = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'Format your text in a neat and readable way.',
    execute(message, args){
        if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')
        if(!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send('Please give me permissions to send messages.')

            const embedsyn = new Discord.MessageEmbed()
            .setTitle('Embed')
            .setDescription('**Usage** : ``;embed [title]+[body]+(colour)``\n**Permissions** : Manage_Messages\n**IMPORTANT** : Seperate parts of the embed using +')
            .setColor("RED")

            if(!message.member.hasPermission(("MANAGE_MESSAGES"))) return ('ERROR : Must have Manage Messages permission to create a new embed.')

            let embedparts = message.content
            if(!embedparts) return message.channel.send(embedsyn)

            let embedsub = embedparts.substring(6)
            let embedfinal = embedsub.split('+')
            let emtitle = embedfinal[0]
            if(!embedfinal[0]) return message.channel.send(embedsyn)
            let embody = embedfinal[1]
            if(!embedfinal[1]) return message.channel.send('Please specify the body of your embed')
            let emcolour = embedfinal[2]
            if(emcolour) emcolour = embedfinal[2].toUpperCase().substring(" ")
            if(!embedfinal[2]) emcolour = 'RANDOM'

            const Eembed = new Discord.MessageEmbed()
            .setTitle(emtitle)
            .setDescription(embody)
            .setColor(emcolour)
            .setFooter(`Embed by ${message.author.username}`, message.author.displayAvatarURL())

            message.channel.bulkDelete(1)
            message.channel.send(Eembed).catch(err => {
                message.channel.send('Please follow the syntax and try again.')
            })
    }
}