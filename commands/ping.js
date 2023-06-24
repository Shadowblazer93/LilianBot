const Discord = require('discord.js');
const Mathjs = require('mathjs');

module.exports = {
    name: 'ping',
    description: 'Gets the latency between you and the bot.',
    execute(message, args, bot){

        const Eping = new Discord.MessageEmbed()
            .setTitle(':ping_pong: Pong!')
            .setDescription("```Current ping : " + Math.round(bot.ws.ping) + ' ms```')
            .setColor("GREEN")

        if(!message.channel.type == 'dm'){if (!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send('Please give me permissions to send messages.');}
            message.channel.send(Eping).catch(err => {return;})
    }
}
