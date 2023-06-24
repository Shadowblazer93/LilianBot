const Discord = require('discord.js');

module.exports = {
    name: 'coinflip',
    description:'Flips a coin',
    execute(message, args, bot){

        const tails = new Discord.MessageEmbed()
        .setTitle('Tails')
        .setColor("GREEN")
        .setThumbnail('https://www.nicepng.com/png/full/146-1464848_quarter-tail-png-tails-on-a-coin.png')

        const heads = new Discord.MessageEmbed()
        .setTitle('Heads')
        .setColor("YELLOW")
        .setThumbnail('https://www.pngkey.com/png/full/146-1464786_400px-circle-quarter-heads-side-of-coin.png')
        
        let flipnumber = Math.floor(Math.random() * 2)
        let finalno = flipnumber + 1

        if(finalno == 1) return message.channel.send(tails).catch(err => {return;})
        if(finalno == 2) return message.channel.send(heads).catch(err => {return;})


    }
}