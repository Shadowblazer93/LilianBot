const Discord = require('discord.js')

module.exports = {
    name: 'nick',
    description: 'change yours or other\'s nickname',
    execute(message, args){
        if(message.channel.type == 'dm') return message.channel.send('❌ I can\'t execute that command in DMs!')

        if(!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send('Please give me permissions to send messages.')
            if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send('ERROR : You must have the Manage Nicknames permission to change nicknames!')

            const Enick = new Discord.MessageEmbed()
            .setTitle('Nickname')
            .setDescription('**Usage** : ``;nick [@user] [nickname]``\n**Permissions** : Manage_Nicknames')
            .setColor("RED")

            const nickerror = new Discord.MessageEmbed()
            .setTitle('❌ ERROR')
            .setDescription('The user has a higher role than me.\n I can only change the nicknames of those lower in roles.\n\n This error can also be caused if\nthe person is the owner or an admin.')
            .setColor("RED")

            let nickuser = message.mentions.members.first()
            if(!nickuser) return message.channel.send(Enick)

            let nick = args.slice(1).join(" ")
            if(!nick) return message.channel.send('❌You did not specify the nickname I should give to ``' + nickuser.displayName + '``')

            //if(nick) return message.channel.send(`${message.member.roles.highest} and ${nickuser.roles.highest}`)
            if(message.member.roles.highest.comparePositionTo(nickuser.roles.highest) < 0) return message.channel.send('❌ You are lower in role hierarchy than the user!')

            nickuser.setNickname(nick).catch(err => {
                return message.channel.send(nickerror);
            })
            
            async function nickset() {
            let nickmsg = await message.channel.send(`Changing ${nickuser}'s nickname to ${nick}...`).then(() => {
            nickmsg.edit(`✅ Changed ${nickuser}'s nickname to ${nick}`)})}

            nickset().catch(err => {return})
            
    }
}