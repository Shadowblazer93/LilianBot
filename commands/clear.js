const Discord = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'Clears the amount of messages specified',
    aliases: ['purge'],
    execute(message, args){
        if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')
        if (!message.guild.me.hasPermission("SEND_MESSAGES")) return  message.author.send('Please give me permissions to send messages.') 
            if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('ERROR : I do not permissions to delete messages in this channel!')
                if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('ERROR : Must have \'manage messages\' permission to execute this command!')

                const Eclear = new Discord.MessageEmbed()
                .setTitle('Clear')
                .setDescription('**Usage** : ``;clear [num]``\n**Permissions** : Manage_Messages')
                .setColor('RED')

                let clearnum = args[0]
                if(!clearnum) return message.reply(Eclear)
                if(clearnum === '0') return message.reply('But why... why would you do that')
                if(clearnum > 99) return message.reply("Please choose a number below 100")
                if(clearnum < 0) return message.reply('Please choose a number greater than 0 :pensive: ')
                if (isNaN(clearnum)) return message.reply('Please specify a number')
        else
            message.channel.bulkDelete(parseInt(args[0]) + 1)
            message.channel.send(':hourglass: I have deleted ``' + clearnum + ' messages``').then(r => r.delete({ timeout: 3000 }))
    }
}