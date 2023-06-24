const Discord = require('discord.js');
//const paginationEmbed = require("@xoalone/discordjs-pagination");
const paginationEmbed = require('discord.js-pagination');

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Lilian\'s help page',
    execute(message, args, bot){

        const Ecmds = new Discord.MessageEmbed()
        .setTitle('Commands for Lilian')
        .setDescription('Lilian uses ``;`` prefix before all her commands.\n**Command Arguments**\n``[]`` - required argument\n``()`` - optional argument\n*Adding these symbols is not required when executing commands.*')
        .addField('View A Command\'s Syntax','To see how to view a command,\nType the prefix and the command\'s name\nFor example: ``;mute , ;nick``')
        .addField('Lilian Support Server','Need help? [Click to Join the Support Server](https://discord.gg/smBNsAX)')
        .addField(':green_book:  General Commands','```\nhelp\nuser\nping\ninfo\ninvite\nreport\n ```', true)
        .addField(':busts_in_silhouette:  Social commands','```\nembed\npoll\nvote\nchoose\n \n \n ```', true)
        .addField(':gift:  Fun commands','```\nchat\nrate\n8ball\nweather\nyoutube\ncoinflip\nminesweeper```', true)
        .addField(':woman_detective:  Moderator Commands', '```\nmodlog\nwarn\nkick\nban\nnick\nmute\nclear\nunmute```', true)
        .addField(':scroll:  Channel commands', '```\nnuke\nclone\ntopic\ncreate\ndelete\nlock\nunlock\nslowmode```', true)
        .setColor(0xff66ff)

        const Edm = new Discord.MessageEmbed()
        .setDescription(`<:pinkcheck:771258865877909517> Sent the help page to you ${message.author}`)
        .setColor("GREEN")

        const Hgeneral = new Discord.MessageEmbed()
        .setTitle(':green_book: General Commands')
        .setDescription("**;help** - Gives you a documentation on the bot\n**;dm** - Sends the help command in DMs\n**;user** - Get hidden info on users\n**;info** - Bot's about me page\n**;ping** - To check connection with the bot\n**;invite** - For getting Lilian's invite link\n \n**Syntax of Commands :wrench:**\n`;user [@user]`\n  \n**Permissions Required :dvd:**\nnone\n \n**NOTE** - *Adding these brackets is not required when executing commands*")
        .setColor(0xff66ff)

        const Hsocial = new Discord.MessageEmbed()
        .setTitle(':busts_in_silhouette: Social Commands')
        .setDescription("**;embed** - Embed creation tool\n**;poll** - For getting opinions on a question\n**;vote** - To decide from two options\n**;choose** - randomly choose from one option\n \n**Syntax of Commands :wrench:**\n`;embed [title] + [body] + (colour)`\n`;poll [topic]`\n`;vote [choice1] + [choice2]`\n`;choose [choice1] + [choice2]`\n \n**Permissions Required :dvd:**\nmanage messages\n \n**NOTE** - *Adding these brackets is not required when executing commands*")
        .setColor(0xff66ff)

        const Hfun = new Discord.MessageEmbed()
        .setTitle(':gift: Fun Commands')
        .setDescription('**;chat** - **NEW! Chat with Lilian!**\n**;rate** - get Lilian\'s rating on topics\n**;8ball** - Ask Lilian what she thinks about something\n**;weather** - Get the weather for **Any Place**\n**;youtube** - Search for youtube videos\n**;coinflip** - Flip a coin\n**;minesweeper** - Play minesweeper in discord!\n \n**Syntax of Commands :wrench:**\n`;chat [text]`\n`;rate [text]`\n`;8ball [text]`\n`;weather [location]`\n`;youtube [text]`\n \n**Permissions Required :dvd:**\nnone\n \n**NOTE** - *Adding these brackets is not required when executing commands*')
        .setColor(0xff66ff)

        const Hmod = new Discord.MessageEmbed()
        .setTitle(':woman_detective: Moderator Commands')
        .setDescription('**;modlog** - Setup the logger integration\n**;warn** - warns a user\n**;kick** - kicks a user\n**;ban** - bans a user\n**;nick** - Change a user\'s nickname\n**;mute** - mutes a user\n**;clear** - Mass delete channel history\n**;unmute** - unmutes a user\n**;report** - report a user\n \n**Syntax of Commands**\n`;command [@user]`\n`;clear [num]`\n \n**Permissions required :dvd:**\nmoderator\n \nNOTE - Adding these brackets is not required when executing commands')
        .setColor(0xff66ff)

        const Hchannel = new Discord.MessageEmbed()
        .setTitle(':scroll: Channel commands')
        .setDescription('**;nuke** - Delete all messages from a channel\n**;clone** - Make an exact copy of a channel\n**;topic** - Quick way to change channel topics\n**;create** - Create a channel\n**;delete** - Delete a channel\n**;lock** - Prevent members from sending messages in a channel\n**;unlock** - Allow members to send messages in a locked channel again\n**;slowmode** - Set slowmode for channels\n \n**Syntax of Commands :wrench:**\n`;cmd [#channel]`\n`;topic [text]`\n \n**Permissions required :dvd:**\nmanage channels\n \nNOTE - Adding these brackets is not required when executing commands')
        .setColor(0xff66ff)

        const Hinfo = new Discord.MessageEmbed()
        .setThumbnail('https://cdn.discordapp.com/avatars/728176491514298478/8471d6241e5ef2dd2796d87149cf6d98.png')
        .addField('Help Website', '[Top.gg](https://top.gg/bot/728176491514298478)')
        .addField('Support server','[Join Now](https://discord.gg/smBNsAX)')
        .addField(`Changelog`,`[Click to Read](https://discord.com/channels/769091418118946827/769091418589233182)`)
        .addField('Version', 'Update 2.1.0')
        .addField('Message from Dev', 'Hello! Thanks for using my bot :-)', true)
        .setColor(0xff66ff)

        if(message.channel.type == 'dm'){
            message.channel.send(Ecmds)
            message.channel.send('**NOTE** : `Detailed explanation for each command is available only when using the help command in a channel.`')
            return;
        }

        const helppages = [Ecmds,Hgeneral,Hsocial,Hfun, Hmod, Hchannel, Hinfo]
        const emojilist = ['◀️', '▶️']
        
        if(!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send('Please give me permissions to send messages.').catch(err => {return;})
        paginationEmbed(message, helppages, emojilist, 60000).catch(err => {return;})
    }}