const Discord = require('discord.js');

module.exports = {
    name: 'rate',
    description: 'Rates the user out of 10',
    execute(message, args){
        const Erate = new Discord.MessageEmbed()
            .setTitle('Rate')
            .setDescription('**Usage** : ``;rate [topic]``')
            .setColor("RED")

        if(!message.channel.type == 'dm'){if (!message.guild.me.hasPermission("SEND_MESSAGES")) return  message.author.send('Please give me permissions to send messages.')} 
            
        //if(message.channel.type == 'dm'){let rateduser = message.author}
        //if(!message.channel.type == 'dm'){let rateduser = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member}
            let ratenumber = Math.floor(Math.random() * 11)
            let ratedtopic = args.slice(0).join(" ")
            if(!ratedtopic) {return message.channel.send(`I would rate ${message.author} a \`\`` + ratenumber + `/10\`\``)} else {
            let ratedmsg = (`I would rate ${ratedtopic} a \`\`` + ratenumber + `/10\`\``)
            let finalrate = ratedmsg.replace('my', 'your').replace('me', 'you')
            message.channel.send(finalrate)
            }

        }
    }