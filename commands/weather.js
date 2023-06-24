const Discord = require('discord.js');
const weather = require('weather-js');

module.exports = {
    name: 'weather',
    description: 'Get the weather of any location',
    execute(message, args){
            var weather = require('weather-js')

            const Eweather = new Discord.MessageEmbed()
            .setTitle('Weather')
            .setDescription('**Usage** : ``;weather [location name/zip code]``')
            .setColor("RED")
            
            let arguement = args.slice(0).join(" ");
            if(!arguement) return message.channel.send(Eweather)

            weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){

                if(error) return message.channel.send(error);
                if(!args[0]) return message.channel.send('Please specify a location')
        
                if(typeof result === undefined || result.length === 0) return message.channel.send('Invalid location');
        
                var current = result[0].current;
                var location = result[0].location;
        
                const weatherinfo = new Discord.MessageEmbed()
                .setAuthor(`Weather forecast for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(0x111111)
                .addField('Timezone', `UTC${location.timezone}`, true)
                .addField('Degree Type', 'Celsius', true)
                .addField('Temperature', `${current.temperature}°`, true)
                .addField('Wind', `${current.winddisplay}`, true)
                .addField('Feels like', `${current.skytext}°`, true)
                .addField('Humidity', `${current.humidity}`, true)
                .setColor("0x990632")
        
                message.channel.send(weatherinfo).catch(err => {
                    message.channel.send('Im having a headache. Please try again later.')
                })
            })
    }
}