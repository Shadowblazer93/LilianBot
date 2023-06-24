const Discord = require('discord.js')
const Minesweeper = require('discord.js-minesweeper')

module.exports = {
    name: 'minesweeper',
    description: 'Play minesweeper in discord.',
    execute(message, args){
        const minesweeper = new Minesweeper();
            const newgame = minesweeper.start()

        if (!message.guild.me.hasPermission("SEND_MESSAGES")) return  message.author.send('Please give me permissions to send messages.')
            message.channel.send(newgame).catch(err => {
                message.channel.send('❌ Something went wrong while generating a new game')
            })
    }
}