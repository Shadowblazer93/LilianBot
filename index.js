const Discord = require('discord.js');
const fs = require('fs');
const mathjs = require('mathjs');
const config = require('./config.json')
const { Pool, Client } = require('pg')
const PREFIX = config.prefix
const bot = new Discord.Client();

const Ewelcome = new Discord.MessageEmbed()
.setTitle('Thank you for inviting Lilian 💗')
.setDescription(`Hello! My name is Lilian. My prefix is \`;\`\n**To get to know more about me type \`;help\`**`)
.setColor(0xff66ff)

const talked = new Set();
const Ecooldown = new Discord.MessageEmbed()
.setTitle("Whoa, slow down!")
.setDescription("Please don't spam.\nThe cooldown time is only `2 seconds`")
.setColor("BLACK")

bot.commands = new Discord.Collection();
const commandfiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandfiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command)}

bot.on('ready', () =>{
    console.log('💗 Lilian is online!');
    setInterval(() => {
    bot.user.setActivity(';help | ' + bot.guilds.cache.size + ' servers', { type: 'PLAYING'})
}, 2000)})

bot.on("guildCreate", guild => {
  const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
  channel.send(Ewelcome)
    })

bot.on('message',async message =>{
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;
    const args = message.content.slice(PREFIX.length).split(/ +/)
    const cmd = args.shift().toLocaleLowerCase();
    const command = bot.commands.get(cmd) || bot.commands.find(a => a.aliases && a.aliases.includes(cmd))
    if(!command) return


    try {
        if(talked.has(message.author.id)) return message.channel.send(Ecooldown) 
        if(!talked.has(message.author.id)){
        command.execute(message,args,bot)
        talked.add(message.author.id)
        setTimeout(() => {
        talked.delete(message.author.id);
        }, 2000)}

        } catch (error) {
        console.log(error)
        message.channel.send('❓ An error has occured.')
        }})

bot.login(process.env.TOKEN);