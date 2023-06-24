const Discord = require('discord.js')

module.exports = {
    name: 'vote',
    description: 'Create a new vote',
    execute(message, args){
        if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')

        if (!message.guild.me.hasPermission("SEND_MESSAGES")) return  message.author.send('Please give me permissions to send messages.')
        if (!message.guild.me.hasPermission("ADD_REACTIONS")) return message.channel.send('Please give me permissions to react to messages in this channel.');
        if (!message.member.hasPermission("MANAGE_MESSAGES"))return message.channel.send('ERROR : You need to have Manage Messages permission to create new polls!')
            const Evote = new Discord.MessageEmbed()
            .setTitle('Vote')
            .setDescription('**Usage** : ``;vote [choice1]+[choice2]``\n**Permissions** : Manage_Messages')
            .addField('IMPORTANT','Do not forget to seperate your choices using ``+``')
            .setColor(0xff3c00)

            let votechoice = message.content
            if(!votechoice) return ('Please specify your second choice. Don\'t forget to seperate the choices using |')

            let votesplit = votechoice.split('+')
            if(!votesplit[1]) return message.channel.send(Evote);

            let votechoice1 = votesplit[0].substring(5)

            const Evote2 = new Discord.MessageEmbed()
            .setTitle('VOTE')
            .setDescription(':one: - ' + votechoice1 + '\n:two: - ' + votesplit[1])
            .setFooter(`Vote initiated by ${message.author.username}`, message.author.displayAvatarURL())
            .setColor("RANDOM")

            message.channel.bulkDelete(1)
            message.channel.send(Evote2).then(messageReaction => {
                messageReaction.react('1️⃣')
                messageReaction.react('2️⃣')
            })
    }
}