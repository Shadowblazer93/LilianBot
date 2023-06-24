const Discord = require('discord.js')
const { mod } = require('mathjs')

module.exports = {
    name: 'links',
    description: 'Links to support the creator of Elite bot',
    execute(message, args){
        if(message.channel.type == 'dm') return message.channel.send('Youtube - https://www.youtube.com/channel/UCCWz7ptdpiIJVl4DumqqTBw?sub_confirmation=1')
        if (!message.guild.me.hasPermission("SEND_MESSAGES")) return  message.author.send('Please give me permissions to send messages.') 
            message.channel.send('Youtube - https://www.youtube.com/channel/UCCWz7ptdpiIJVl4DumqqTBw?sub_confirmation=1')
    }
}