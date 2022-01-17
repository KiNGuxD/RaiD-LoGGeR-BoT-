const fs = require('fs');
const moment = require('moment');
const fsextra = require('fs-extra');
const request = require('request');
const path = require('path');
const Discord = require('discord.js');
const client = new Discord.Client();
const { keep_alive } = require("./keep_alive");

const prefix = '+';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setStatus('idle');
});



client.on(`message`, async (message) => {
  logged = `929002028741558372`;
  const logger = client.channels.cache.get(logged)
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command == "raidjoin"){
    const talkedRecently = new Set();
    let msg = args[0];
    let link = args[1];
    let server = `https://discord.gg/${link}`;
    let cmsg = msg.toUpperCase()
    if (message.member.roles.cache.has('928960280967393302')){
      const raidjoin = new Discord.MessageEmbed()
      .setColor(`#00ffff`)
      .setDescription(`**<@&928960280967393302> NOTE THAT ** [**${cmsg}**](${server})  **ARE JOINING THE RAID .. INCOMING xD** \n **IF ANY OTHERS CLANS WANT TO JOIN USE \`+raidjoin <GUILD-NAME> <SERVER-CODE>\`**`)
      .setFooter(` EXAMPLE - +raidjoin C4 c4op`)
      .setThumbnail(`${message.author.avatarURL({ dynamic: true })}`)
      message.channel.send(`**YOU HAVE JOINED THE RAID**`).then(logger.send(` **I N C O M M I N G . . .**`)).then(logger.send(raidjoin))
    }
    else{
      message.channel.send(`**<:minox_wrong:907268197919633426>  YOU ARE NOT A CLAN OWNER**`)};
    }
  if(command == "help"){
    if (message.channel.type=="dm"){
      message.author.send('**TBH TU CHUTIYA HE VAI .. DM ME HELP NHI DETA ME CHANNEL ME JAKE BOL KID**')
    }
    else{
    message.channel.send('HeHe')
    }
    }
  });
    

client.on('voiceStateUpdate', (oldState, newState) => {
    logged = `929002028741558372`;
    const logger = client.channels.cache.get(logged)

    var oldChannel = oldState.channel;
    var newChannel = newState.channel;
    const User = newState.member
    const Dism = User.user.discriminator, Bot = User.user.bot ? "YES" : "NO";
    Avatar = User.user.avatarURL({ dynamic: true });Joined = User.joinedTimestamp;
    Status = User.presence.status.charAt(0).toUpperCase() + User.presence.status.slice(1);
    const Place = User.user.presence.clientStatus ? Object.keys(User.user.presence.clientStatus).map(E => E.charAt(0).toUpperCase() + E.slice(1)) : [], Activity = User.presence.activities ;

    async function Activities(Arr) {
      const Types = {
        PLAYING: "Playing",
        STREAMING: "Streaming",
        LISTENING: "Listening",
        WATCHING: "Watching",
        CUSTOM_STATUS: "\`STATUS\`",
        COMPETING: "Competing"
      };

      Arr = Arr.map(E => Types[E.type] + `: ${E.type == "CUSTOM_STATUS" ? `${E.emoji ? E.emoji.name + " " : ""}${E.state}` : E.name}`);
      return Arr;
    };

    var defaulttext = `<@${newState.member.id}> \`(${newState.member.id})\``;
    var defaulttext2 = `<@${newState.member.id}> \`${oldState.member.id})\``;

    if (oldChannel && newChannel) {
        var logtext = new Discord.MessageEmbed()
        .setColor(`#fff100`)
        .setThumbnail(`${Avatar}`)
        .setDescription(`${defaulttext} **:** [**VOICE MOVE**](https://discord.gg/H3ctRAcS) \n<#${oldChannel.id}> <:D_black_arrow:924239911568154624> <#${newChannel.id}> **\n `)
        .setFooter(`-\`,`,`https://images-ext-1.discordapp.net/external/bnIWYFs0JcWSEE_QCbHYTVK9avBDPPvsy4RYJh_QMMg/%3Fsize%3D1024/https/cdn.discordapp.com/icons/849902581630631967/a_9e11b8a25a8fa7c997ed63ea6064591c.gif`)
        .setTimestamp();

    } else if (!oldChannel) {

        var logtext = new Discord.MessageEmbed()
        .setColor(`#fff100`)
        .setThumbnail(`${Avatar}`)
        .setDescription(`${defaulttext} : [**VOICE JOIN**](https://discord.gg/H3ctRAcS) \n<#${newChannel.id}> \n\n **A B O U T : **\n<:space_op1:919594085008949279> \`USER\` : **${User.user.username}${Dism}${User.nickname ? `(${User.nickname})` : ""}**\n<:space_op1:919594085008949279> \`I D\` : **${User.id}**\n<:space_op1:919594085008949279> \`BOT\` : **${Bot}**\n<:space_op1:919594085008949279> \`USING ON\` : **${Place ? Place.join("\n")== "" ? "RIPCORD OR OTHER CLIENTS" : Place.join("\n") : "NONE"}**`)
        .setFooter(`DISCORD.GG/RAIDINGCM`,`https://images-ext-1.discordapp.net/external/bnIWYFs0JcWSEE_QCbHYTVK9avBDPPvsy4RYJh_QMMg/%3Fsize%3D1024/https/cdn.discordapp.com/icons/849902581630631967/a_9e11b8a25a8fa7c997ed63ea6064591c.gif`)
        .setTimestamp();

    } else if (!newChannel) {
        var logtext = new Discord.MessageEmbed()
        .setColor(`#fff100`)
        .setThumbnail(`${Avatar}`)
        .setDescription(`${defaulttext2} **:** [**VOICE LEAVE**](https://discord.gg/H3ctRAcS) \n<#${oldChannel.id}> \n\n **A B O U T : **\n<:space_op1:919594085008949279> \`USER\` : **${User.user.username}${Dism}${User.nickname ? `(${User.nickname})` : ""}**\n<:space_op1:919594085008949279> \`I D\` : **${User.id}**\n<:space_op1:919594085008949279> \`BOT\` : **${Bot}**\n<:space_op1:919594085008949279> \`USING ON\` : **${Place ? Place.join("\n") == "" ? "RIPCORD OR OTHER CLIENTS" : Place.join("\n") : "NONE"}**`)
        .setFooter(`DISCORD.GG/RAIDINGCM`,`https://images-ext-1.discordapp.net/external/bnIWYFs0JcWSEE_QCbHYTVK9avBDPPvsy4RYJh_QMMg/%3Fsize%3D1024/https/cdn.discordapp.com/icons/849902581630631967/a_9e11b8a25a8fa7c997ed63ea6064591c.gif`)
        .setTimestamp();

    }

    if (oldState.selfMute && !newState.selfMute) {
        var logtext = new Discord.MessageEmbed()
        .setColor(`#e90505`)
        .setDescription(`<:mute1:930291093961048124> ${defaulttext2} :** SELF-MUTE OFF**`);
    } else if (!oldState.selfMute && newState.selfMute) {
        var logtext = new Discord.MessageEmbed()
        .setColor(`#e90505`)
        .setDescription( `<:mute1:930291093961048124> ${defaulttext2} : **SELF MUTE ON**`);
    } else if (oldState.selfDeaf && !newState.selfDeaf) {
      var logtext = new Discord.MessageEmbed()
        .setColor(`#e90505`)
        .setDescription(`<:deafened1:930291290648744028> ${defaulttext2} : **SELF DEAF OFF**`);
    } else if (!oldState.selfDeaf && newState.selfDeaf) {
        var logtext = new Discord.MessageEmbed()
        .setColor(`#e90505`)
        .setDescription(`<:deafened1:930291290648744028> ${defaulttext2} : **SELF DEAF ON**`);
    } else if (oldState.serverDeaf && !newState.serverDeaf) {
        var logtext = new Discord.MessageEmbed()
        .setColor(`#e90505`)
        .setDescription(`<:serverdeafen1:930291197770084382> ${defaulttext2} : **SERVER DEAF OFF**`);
    } else if (!oldState.serverDeaf && newState.serverDeaf) {
        var logtext = new Discord.MessageEmbed()
        .setColor(`#e90505`)
        .setDescription(`<:serverdeafen1:930291197770084382> ${defaulttext2} : **SERVER DEAF ON**`);
    } else if (oldState.serverMute && !newState.serverMute) {
        var logtext = new Discord.MessageEmbed()
        .setColor(`#e90505`)
        .setDescription(`<:ServerMuted1:930291195320619018> ${defaulttext2} : **SERVER MUTE OFF**`);
    } else if (!oldState.serverMute && newState.serverMute) {
        var logtext = new Discord.MessageEmbed()
        .setColor(`#e90505`)
        .setDescription(`<:ServerMuted1:930291195320619018> ${defaulttext2} : **SERVERMUTE ON**`);
    }
    return logger.send(logtext);
});



client.login(process.env.TOKEN);