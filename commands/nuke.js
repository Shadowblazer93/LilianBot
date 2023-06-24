const Discord = require('discord.js');

module.exports = {
    name: 'nuke',
    description:'Nuke a channel',
    execute(message, args, bot){
        if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')


        if (!message.guild.me.hasPermission("SEND_MESSAGES")) return  message.author.send('Please give me permissions to send messages.') 
            if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('ERROR : I do not have admin perms!')
                if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('ERROR : Must have \'manage channels\' permission to execute this command!')

            const Enuke = new Discord.MessageEmbed()
            .setTitle('Nuke channel')
            .setDescription('**Usage** : ``;nuke [channel]``\n**Permissions** : Manage_Channels')
            .setColor("BLUE")
        
            let nukedchannel = message.mentions.channels.first()
            if(!nukedchannel) return message.channel.send(Enuke)

            const Econfirmation = new Discord.MessageEmbed()
            .setDescription(`Are you sure you want to nuke ${nukedchannel}?\nType \`\`YES\`\` to confirm.`)
            .setColor('BLUE')

            const NukeFail = new Discord.MessageEmbed()
            .setTitle('Nuke Failed')
            .setDescription('The channel you have selected cannot be nuked as it is required for a discord community feature.')
            .setColor("RED")

            message.channel.send(Econfirmation)

            message.channel.awaitMessages(m => m.author.id == message.author.id,
                {max: 1, time: 10000}).then(collected => {
                        if (collected.first().content.toLowerCase() == 'yes') {
                            nukedchannel.clone().then(() => {
                                nukedchannel.delete().catch(err => {message.channel.send(NukeFail)})
                            }).catch(err => {return;})
                    }
                    else {message.channel.send('**Operation Cancelled** : Confirmation Declined')}      
            }).catch(() => {
                    message.reply('**Operation Cancelled** : Time ran out.');
            });
        }
    }