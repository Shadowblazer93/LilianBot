const Discord = require('discord.js');

module.exports = {
  name: 'modlog',
  description: 'Creates a modlog channel',
  execute(message, args) {
  if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')
        if(!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send('I do not have permissions to speak in that channel!').catch(err => {return;})
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('I do not have permission to kick members!')
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('ERROR : You do not have permission to kick members!')

        const Econfirm = new Discord.MessageEmbed()
        .setDescription('Click the reaction below to create a modlog channel')
        .setColor("BLUE")

        const Ealreadythere = new Discord.MessageEmbed()
        .setDescription('This server already has a Modlog channel.')
        .setColor("RED")

        const Emodsuccess = new Discord.MessageEmbed()
        .setDescription('Successfully created a Modlog channel.\n \n**NOTE**: You can change the channel name\nbut it must include `modlog`')
        .setColor("GREEN")

        const Emodtime = new Discord.MessageEmbed()
        .setDescription('Time ran out')
        .setColor("RED")

        const Emodfail = new Discord.MessageEmbed()
        .setDescription('Operation Cancelled')
        .setColor("RED")

        let modchannel = message.guild.channels.cache.find(r => r.name.includes('modlog'))
        if(modchannel) return message.channel.send(Ealreadythere)

        async function msgstuff() {
        const msg = await message.channel.send(Econfirm)
        msg.react('✅')

        const filter = (reaction, user) => {
      	return ['✅'].includes(reaction.emoji.name) && user.id === message.author.id};

        msg.awaitReactions(filter, { max: 1, time: 10000})
      	.then(collected => {
    		const reaction = collected.first();
        if (reaction.emoji.name === '✅') {
          message.guild.channels.create('modlog')
          message.channel.send(Emodsuccess)
          msg.delete()
        } else {
          msg.delete()
          message.channel.send(Emodfail);
        }}).catch(collected => {
        msg.delete()
        message.channel.send(Emodtime);
        });
        }

        msgstuff()



}}
