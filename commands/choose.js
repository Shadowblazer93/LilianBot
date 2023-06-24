const Discord = require('discord.js');
const { random } = require('mathjs');

module.exports = {
    name: 'choose',
    description: 'Chooses between two options for you',
    aliases: ['purge'],
    execute(message, args){

        if(!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send('Please give me permissions to send messages.')

        const Echoose = new Discord.MessageEmbed()
        .setTitle('Choose')
        .setDescription('`;choose [choice1] + [choice2]`')
        .setColor("RED")


        let contentlol = message.content
        if(!contentlol.includes('|')) return message.channel.send(Echoose)
        let choose2 = contentlol.split('|')
        let choose1 = choose2[0].substring(7)

        let choicenumber = Math.floor(Math.random() * 2)

        const Echoice1 = new Discord.MessageEmbed()
        .setDescription(choose1)
        .setFooter(`Choice by ${message.author.username}`, message.author.displayAvatarURL())
        .setColor("GREEN")

        const Echoice2 = new Discord.MessageEmbed()
        .setDescription(choose2[1])
        .setFooter(`Choice by ${message.author.username}`, message.author.displayAvatarURL())
        .setColor("GREEN")

        if(choicenumber === 0) return message.channel.send(Echoice1)
        if(choicenumber === 1) return message.channel.send(Echoice2)

    }}
