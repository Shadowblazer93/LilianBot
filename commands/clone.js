const Discord = require('discord.js');

module.exports = {
    name: 'clone',
    description:'Clone a channel',
    execute(message, args, bot){
        if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')


        if (!message.guild.me.hasPermission("SEND_MESSAGES")) return  message.author.send('Please give me permissions to send messages.') 
            if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('ERROR : I do not permissions to manage channels!')
                if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('ERROR : Must have \'manage channels\' permission to execute this command!')

            const Eclone = new Discord.MessageEmbed()
            .setTitle('Clone channel')
            .setDescription('**Usage** : ``;clone [channel]``\n**Permissions** : Manage_Channels')
            .setColor("BLUE")

            let clonechannel = message.mentions.channels.first()
            if(!clonechannel) return message.channel.send(Eclone)

            const clonemessage = new Discord.MessageEmbed()
            .setDescription(`Sucessfully cloned ${clonechannel}`)
            .setColor("GREEN")

            const clonefail = new Discord.MessageEmbed()
            .setDescription(`Failed to clone ${clonechannel}`)
            .setColor("RED")

            clonechannel.clone().then(() => {
                message.channel.send(clonemessage)
            }).catch(err => {
                message.channel.send(clonefail)
            })
        
        }
    }