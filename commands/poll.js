const Discord = require('discord.js')
const { i } = require('mathjs')

module.exports = {
    name: 'poll',
    description: 'Create a new poll',
    execute(message, args){
        if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')

        if (!message.member.hasPermission("MANAGE_MESSAGES"))return message.channel.send('ERROR : You need to have Manage Messages permission to create new polls!')
        if (!message.guild.me.hasPermission("SEND_MESSAGES")) return  message.author.send('Please give me permissions to send messages.') 
        const Epoll = new Discord.MessageEmbed()
        .setTitle('Poll')
        .setDescription('**Usage** : ``;poll [topic]``\n**Permissions** - Manage_Messages ')
        .setColor(0xff3c00)

        let msgArgs = args.slice(0).join(" ");
        if(!msgArgs) return message.channel.send(Epoll)
        if (msgArgs.length > 256) return message.channel.send('Word limit should be lower than 256!')

        const Epolltwo = new Discord.MessageEmbed()
        .setTitle(msgArgs)
        .setFooter(`Poll initiated by ${message.author.username}`, message.author.displayAvatarURL())
        .setColor("RANDOM")

        message.channel.bulkDelete(1)
        message.channel.send(Epolltwo).then(messageReaction => {
            messageReaction.react("👍🏻");
            messageReaction.react("👎🏻")

        });

    }
}

           