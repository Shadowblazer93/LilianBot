const Discord = require('discord.js');
const Chat = require("easy-discord-chatbot");
const chat = new Chat({ name: "Lilian" });

module.exports = {
    name: 'chat',
    aliases: ['c','chatbot'],
    description:'Chat with Lilian!',
    execute(message, args, bot){
        if(message.channel.type ===!'dm') if (!message.guild.me.hasPermission("SEND_MESSAGES")) return  message.author.send('Please give me permissions to send messages.');
        const Echat = new Discord.MessageEmbed()
        .setTitle("Chat with Elitebot")
        .setDescription("NOTE: Also works in DMs\n**Usage** :  ``;chat [text]``\n**Aliases** : ``;c , ;chat , ;chatbot``")
        .setColor(0xff66ff)

        async function chatoutput() {
        let chatinput = args.slice(0).join(" ")
        if(!chatinput) return message.channel.send(Echat)

        message.channel.startTyping();
        
        let creply = await chat.chat(chatinput);
        let finalcreply = creply.replace('Lebyy_Dev','Sb93')
        message.channel.send(finalcreply).then(() => {message.channel.stopTyping()}).catch(err => {message.channel.send("Sorry, I have a severe headache right now! (sussy)")})
        }
        chatoutput().then(() => {return})
    }}