const Discord = require('discord.js');

module.exports = {
    name: 'topic',
    description: 'Sets the topic of the channel.',
    execute(message, args){
        if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')
        if (!message.guild.me.hasPermission("SEND_MESSAGES")) return  message.author.send('Please give me permissions to send messages.')
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return  message.channel.send('❌ I need to have Manage Channels permission to eecute this command.')
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('ERROR : You need to have Manage Channels permission for this command.')

        const Etopic = new Discord.MessageEmbed()
        .setTitle('Channel Topic')
        .setDescription('**Usage** : ``;topic [#channel] [topic]``\n**Permissions** : Manage_Channels') 
        .setColor("BLUE")

        const Echtopicerr = new Discord.MessageEmbed()
            .setTitle('❌ ERROR')
            .setDescription('There may have been 2 reasons for this error :-\n\nI cannot access the channel specified.\nThe text entered cannot be translated into a topic.')
            .setColor("RED")

        let chtag = message.mentions.channels.first()
        if(!chtag) return message.channel.send(Etopic)

        let qtopic = args.slice(1).join(" ")
        if(!qtopic) return message.channel.send('Please enter a topic!')

        chtag.setTopic(qtopic).then(() => {
            message.channel.send(`✅  Changed the topic of ${chtag}`)
        })
    }
}