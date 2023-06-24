const Discord = require('discord.js');
const { or } = require('mathjs');

module.exports = {
    name: 'role',
    description: 'Add roles to users',
    execute(message, args){
        if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')
        if(!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send('I do not have permissions to speak in that channel!').catch(err => {return;})
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) return  message.channel.send('I do not have permissions to manage roles!')
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('ERROR : Must have Manage Roles permission to add roles')

                const Erole = new Discord.MessageEmbed()
                .setTitle('Role')
                .setDescription('**Usage** : ``;role [@user] [@role/role name/role ID]``\n**Permissions** : Manage_Roles')
                .setColor("RED")

                const rolefail = new Discord.MessageEmbed()
                .setTitle('Failed to add role')
                .setDescription(`**I could not add that role because of the following reasons :-\n**1) That role does not exist in this server\n2) My role is below in hierarchy than the role you want to apply\n3) Or the role belongs to a bot/integration`)
                .setFooter(`Command executed by ${message.author.username}`, message.author.displayAvatarURL())
                .setColor("RED")

                let ruser = message.guild.members.cache.get(args[0]) || message.mentions.members.first()
                if(!ruser) return message.channel.send(Erole)

                let rrole = message.guild.roles.cache.get(args[1]) ||message.mentions.roles.first()
                if(!rrole) return message.channel.send(Erole)

                if(message.member.roles.highest.comparePositionTo(rrole) < 0) return message.channel.send('❌ You are lower in role hierarchy than the role!')
                if(message.member.roles.highest.comparePositionTo(ruser.roles.highest) < 0) return message.channel.send('❌ You are lower in role hierarchy than the user!')


                
                const existingrole = new Discord.MessageEmbed()
                .setDescription(`${ruser} already has the role ${rrole}`)
                .setColor("RED")

                const rolesuccess = new Discord.MessageEmbed()
                .setDescription(`Successfully added the ${rrole} role to ${ruser}`)
                .setFooter(`Role added by ${message.author.username}`, message.author.displayAvatarURL())
                .setColor("GREEN")


                if(ruser.roles.cache.has(rrole.id)) {
                return message.channel.send(existingrole)}


                ruser.roles.add(rrole.id).then(() => {
                    message.channel.bulkDelete(1)
                    message.channel.send(rolesuccess)
                }).catch(err => {
                    message.channel.send(rolefail)
                    
                })



                // message.member.roles.add(roleName).then(() => {
                  //   message.channel.send(`Successfully added the role to ${ruser}`)
                 //}).catch(err => {
                   //  ruser.roles.add(rrole.id).catch(err => {
                     //    return message.channel.send(rolefail)
                     //})
                 //})
    }
}