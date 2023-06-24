const Discord = require('discord.js');
const Youtube = require('youtube-search')

module.exports = {
    name: 'youtube',
    description: 'Search youtube videos inside of discord.',
    aliases: ['yt','utube'],
    async execute(message, args){
        const Eyoutube = new Discord.MessageEmbed()
        .setTitle('Youtube Search')
        .setDescription('**Usage** : ``;youtube [video name]``')
        .setColor("RED")

        const Eerror = new Discord.MessageEmbed()
        .setDescription('❌ **Error** : No results found.')
        .setColor("RED")

        let query = args.slice(0).join(" ")
        if(!query) return message.channel.send(Eyoutube)

        var search = require('youtube-search')

        var opts = {
            maxResults: 1,
            key: 'AIzaSyDI6bAfzBuHpadNi2VU09OYNF_heJVY9nI',
            safeSearch: 'strict'
          };

        search(args.slice(0).join(' '), opts, function(err, results) {
            if(err) return message.channel.send(Eerror)    

          message.channel.send(results[0].link).catch(err => {return;})
          });
    }
}