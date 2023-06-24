const Discord = require('discord.js');

module.exports = {
    name: 'delete',
    description: 'Delete channels quickly',
    execute(message, args){
        if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')
        if(!message.guild.me.hasPermission("SEND_MESSAGES")) return  message.author.send('Please give me permissions to send messages.')
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return  message.channel.send('❌ I need to have Manage Channels permission to eecute this command.')
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('ERROR : You need to have Manage Channels permission for this command.')

        const Echdelete = new Discord.MessageEmbed()
        .setTitle('Channel Delete')
        .setDescription('**Usage** : ``;delete [#channel]``\n**Permissions** : Manage_Channels')
        .setColor("RED")

        let chtag = message.mentions.channels.first()
        if(!chtag) return message.channel.send(Echdelete)

        const Econfirmation = new Discord.MessageEmbed()
        .setDescription(`Are you sure you want to delete ${chtag}?\nType \`\`YES\`\` to confirm.`)
        .setColor('BLUE')

        message.channel.send(Econfirmation)


        message.channel.awaitMessages(m => m.author.id == message.author.id,
            {max: 1, time: 10000}).then(collected => {if (collected.first().content.toLowerCase() == 'yes'){chtag.delete()
            message.channel.send('✅  Sucessfully deleted the channel.').catch(err => {return;})
            } else {message.channel.send('**Operation Cancelled** : Confirmation Declined')}
            }).catch(() => {message.reply('**Operation Cancelled** : Time ran out.')});
    }
}
