const Discord = require('discord.js');
const mathjs = require('mathjs');
const ms = require('ms')

module.exports = {
    name: 'slowmode',
    description: 'set the slowmode of a channel quickly',
    execute(message, args){
        if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')
        if(!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send('Please give me permissions to send messages.')
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Please give me permission to manage channels!')
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('ERROR : You do not have the Manage_Channels Permission!')

        const Eslowmode = new Discord.MessageEmbed()
        .setTitle('Slowmode')
        .setDescription('**Usage** : ``;slowmode [time]``\n**Permissions** : Manage_Channelss')
        .setColor("RED")

        let slowchannel = message.channel
        let slowtime = args[0]
        if(!slowtime) return message.channel.send(Eslowmode)
        let nonmstime = ms(slowtime)

        if(slowtime === 'off' || slowtime === '0') return slowchannel.setRateLimitPerUser(0).then(() => {
            message.channel.send(`Turned off slowmode for ${slowchannel}`)
        })

        const slowmodeseconds = new Discord.MessageEmbed()
        .setDescription(`Changed ${slowchannel}'s slowmode to \`\`${nonmstime} seconds\`\``)
        .setColor("GREEN")


        if(slowtime.includes('s') || slowtime.includes('m') || slowtime.includes('h') || slowtime.includes('d') || slowtime.includes('y')){
            let mstimefinal = nonmstime/1000
            if(mstimefinal < 0) return message.channel.send(`❌ Please enter a valid number! [${message.author}]`)
            if(mstimefinal > 21600) return message.channel.send(`❌ Please enter a number below 6 hours! [${message.author}]`)
        
            const slowmodesuccess = new Discord.MessageEmbed()
            .setDescription(`Changed ${slowchannel}'s slowmode to \`\`${slowtime}\`\``)
            .setColor("GREEN")


            slowchannel.setRateLimitPerUser(mstimefinal).then(() => {
                message.channel.send(slowmodesuccess)
            })
            return;

        } else {
            if(nonmstime < 0) return message.channel.send(`❌ Please enter a valid number! ${message.author}`)
            if(nonmstime > 21600) return message.channel.send(`❌ Please enter a number below 6 hours! ${message.author}`)

            slowchannel.setRateLimitPerUser(nonmstime).then(() => {
                message.channel.send(slowmodeseconds)
            })
            return;
            }

        }
    }