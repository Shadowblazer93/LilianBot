const Discord = require('discord.js');

module.exports = {
    name: 'create',
    description: 'Create channels quickly',
    execute(message, args){
        if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')
        if(!message.guild.me.hasPermission("SEND_MESSAGES")) return  message.author.send('Please give me permissions to send messages.')
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return  message.channel.send('❌ I need to have Manage Channels permission to eecute this command.')
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('ERROR : You need to have Manage Channels permission for this command.')

        const Echcreate = new Discord.MessageEmbed()
        .setTitle('Channel Create')
        .setDescription('**Usage** : ``;create [channel name]``\n**Permissions** : Manage_Channels')
        .setColor("BLUE")

        let chtag = args.slice(0).join(" ")
        if(!chtag) return message.channel.send(Echcreate)

        message.guild.channels.create(chtag).catch(err => {
            if(message.guild.me.hasPermission("ADD_REACTIONS")) message.react('❌');
            message.channel.send('❔ Something went wrong. Please try again later.')
        }).then(() => {
            message.channel.send(`✅  Successfully created the channel.`)
        })
    }
}