const Discord = require('discord.js');

module.exports = {
    name: 'mute',
    description: 'mutes the user specified',
    execute(message, args, bot){
        if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')

        if(!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send('I do not have permissions to speak in that channel!').catch(err => {return;})
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('I do not have permission to manage channels!')
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I do not have permission to manage roles!')
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('ERROR : You do not have permission to manage channels!')

        const Emute = new Discord.MessageEmbed()
        .setTitle('Mute')
        .setDescription('**Usage** : `;mute [user]`\n**Permissions** : `MANAGE_CHANNELS`\nTo setup the muted role type `;mutesetup`')
        .setColor("RED")

        let muser = message.guild.members.cache.get(args[0]) || message.mentions.members.first()
        if(!muser) return message.channel.send(Emute)

        if(message.member.roles.highest.comparePositionTo(muser.roles.highest) < 0) return message.channel.send('❌ You are lower in role hierarchy than the user!')


        const Emutesetup = new Discord.MessageEmbed()
        .setTitle('Set up the muted role.')
        .setDescription(`The muted role is not set up in this server.\nType \`;mutesetup\` to gain access to the ;mute command.`)
        .setColor("RED")

        const Emutealreadyhas = new Discord.MessageEmbed()
        .setDescription(`${muser} is already muted!`)
        .setColor("RED")

        let Mreason = args.slice(1).join(" ")
        if(!Mreason) Mreason = 'Undefined'

        const Emutesuccess = new Discord.MessageEmbed()
        .setAuthor(`${muser.user.username}#${muser.user.discriminator} has been muted`, muser.user.displayAvatarURL({dynamic:true}))
        .addField('User',`${muser}`, true)
        .addField('Moderator',`${message.author}`, true)
        .addField('Reason', Mreason)
        .setColor(0xFFFF00)
        .setTimestamp()

        let modchannel = message.guild.channels.cache.find(r => r.name.includes('modlog'))


        let fetchedrole = message.guild.roles.cache.find(r=> r.name === 'Muted-EB')
        if(fetchedrole){

          if(muser.roles.cache.has(fetchedrole.id)) return message.channel.send(Emutealreadyhas)
          //if(muser.id === message.author.id) return message.channel.send('I agree, you should be muted. Considering how dumb you are')
          if(muser.id === "728176491514298478") return message.channel.send('Why mute me? Stop messing around!')

          if(muser){muser.roles.add(fetchedrole.id).then(() => {
            message.channel.send(Emutesuccess)
            if(!message.author.bot) {
              muser.send(Emutesuccess).catch(err => {return;})
              message.channel.send(`Sent a message stating their mute and reason in their dm ${bot.emojis.cache.get("771258865877909517")}`)
            }

            if(modchannel) modchannel.send(Emutesuccess)
          }).catch(err => {return message.channel.send('The Muted Role is higher in hierarchy than my role!\nPut my role higher in the hierarchy from roles menu')})
          return;
        }}


        if(!fetchedrole){
        message.channel.send(Emutesetup)
      }


}}
