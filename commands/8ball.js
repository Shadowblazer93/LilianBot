const Discord = require('discord.js');
const { re } = require('mathjs');
const Mathjs = require('mathjs');

module.exports = {
    name: '8ball',
    description: 'Gives a random output for question asked.',
    execute(message, args){

        const E8ball = new Discord.MessageEmbed()
        .setTitle('8Ball')
        .setDescription('**Usage** : ``;8ball [question]``')
        .setColor("RED") 

            if(!args[0]) return message.channel.send(E8ball)

            let ballnumber = Math.floor(Math.random() * 20)
            if (ballnumber === 0 ) return message.channel.send('Yes, Definitely')
            if (ballnumber === 1 ) return message.channel.send('Of course not')
            if (ballnumber === 2 ) return message.channel.send('Yes')
            if (ballnumber === 3 ) return message.channel.send('No')
            if (ballnumber === 4 ) return message.channel.send('pls no')
            if (ballnumber === 5 ) return message.channel.send('I don\'t know')
            if (ballnumber === 6 ) return message.channel.send('Definitely not')
            if (ballnumber === 7 ) return message.channel.send('I don\'t know! One thing i do is that I only love my creator : Sb93 :heartpulse:')
            if (ballnumber === 8 ) return message.channel.send('Do I look like I want to answer that?')
            if (ballnumber === 9 ) return message.channel.send('I\'m not allowed to give my opinion on that')
            if (ballnumber === 10) return message.channel.send('Damn... I kinda don\'t care')
            if (ballnumber === 11) return message.channel.send('I agree')
            if (ballnumber === 12) return message.channel.send('I agree to disagree')
            if (ballnumber === 13) return message.channel.send('Absolutely not')
            if (ballnumber === 14) return message.channel.send('This does not deserve my attention')
            if (ballnumber === 15) return message.channel.send('Wow! That was the exact same thing I was thinking!')
            if (ballnumber === 16) return message.channel.send('That\'s a great question! I think I agree')
            if (ballnumber === 17) return message.channel.send('You need help')
            if (ballnumber === 18) return message.channel.send('That\'s absolutely disgusting!')
            if (ballnumber === 19) return message.channel.send('Yeah, I guess I agree')
    }
}