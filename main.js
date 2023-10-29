const Discord = require('discord.js');
const trans = require("discord-html-transcripts");
const config = require('./config.js');
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ]
});

let stars = 0;
let attachment

function log(type, user, channel, transscript) {
    let embed = new Discord.MessageEmbed()
    .setTitle(config.logs[type].title)
    .setDescription(config.logs[type].description.replace(/{username}/g, user.username).replace(/{userping}/g, `<@${user.id}>`).replace(/{userid}/g, user.id).replace(/{ticketname}/g, `<#${channel.id}>`).replace(/{channelid}/g, channel.id))
    .setColor(config.logs[type].color)

    // console.log(§)

    if (config.logs[type].fields != undefined) {
        config.logs[type].fields.forEach(filed => {
            embed = embed.addFields({
                name: filed.name,
                value: filed.value.replace(/{username}/g, user.username).replace(/{userping}/g, `<@${user.id}>`).replace(/{userid}/g, user.id).replace(/{ticketname}/g, `<#${channel.id}>`).replace(/{channelid}/g, channel.id).replace(/{category}/g, channel.parent).replace(/{feedback}/g, channel),
                inline: filed.inline
            })
        });
    }

    if (config.logs[type].timestamp) {
        embed = embed.setTimestamp()
    }
    
    const ticketopener = channel.topic
    const member = client.users.cache.get(ticketopener)

    if (transscript) {
        client.channels.cache.get(config.logs[type].channel).send({ embeds: [embed], files: [attachment] });
        if (config.logs[type].sendTransscriptDM) {
            member.send({ embeds: [embed], files: [attachment] });
        }
    } else {
        client.channels.cache.get(config.logs[type].channel).send({ embeds: [embed] });
    }

}

function sendfeedbackDM(user) {
    const embed = new Discord.MessageEmbed()
    .setTitle("Feedback")
    .setDescription("Please send your feedback below")
    .setColor("0x2fb0e2")

    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageSelectMenu()
        .setCustomId('feedback')
        .setPlaceholder('Select a star')
        .addOptions([
            {
                label: '1 Star',
                emoji: '⭐',
                value: '1',
            },
            {
                label: '2 Stars',
                emoji: '⭐',
                value: '2',
            },
            {
                label: '3 Stars',
                emoji: '⭐',
                value: '3',
            },
            {
                label: '4 Stars',
                emoji: '⭐',
                value: '4',
            },
            {
                label: '5 Stars',
                emoji: '⭐',
                value: '5',
            },
        ])
    )

    const guild = client.guilds.cache.get(config.settings.guildid)
    // console.log(guild)
    const member = guild.members.cache.get(user)


    member.send({ embeds: [embed], components: [row] })
}


function sendfeedback(user, message, stars) {
    let steren = ""

    for (let i = 0; i < stars; i++) {
        steren = steren + "⭐"
    }
    // on each linebreak add a > to the start
    message = message.replace(/\n/g, "\n> ")

    // if last char is > remove it
    if (message.slice(-1) == ">") {
        message = message.slice(0, -1)
    }

   // on each linebreak add a > to the start but only if there is text after it
    // message = message.replace(/\n>/g, "\n> ")
    
    let embed = new Discord.MessageEmbed()
        .setTitle(config.feedback.embed.title.replace(/{user}/g, user.username))
        .setDescription("> " + message)
        .setColor(config.feedback.embed.color)

        config.feedback.embed.fields.forEach(filed => {
            embed = embed.addFields({
                name: filed.name, 
                value: filed.value.replace(/{user}/g, user.username).replace(/{userping}/g, `<@${user.id}>`).replace(/{userid}/g, user.id).replace(/{message}/g, message).replace(/{stars}/g, steren),
                inline: filed.inline
            })
        });

    if (config.feedback.embed.timestamp) {
        embed = embed.setTimestamp()
    }

    if (config.feedback.embed.image.enabled) {
        embed = embed.setThumbnail(config.feedback.embed.image.link.replace(/{profilepicture}/g, user.avatarURL()))
    }

    if (config.feedback.embed.footer.enabled) {
        embed = embed.setFooter({text: config.feedback.embed.footer.text.replace(/{user}/g, user.username).replace(/{userping}/g, `<@${user.id}>`).replace(/{username}/g, user.username).replace(/{userid}/g, user.id), iconURL: config.feedback.embed.footer.img.replace(/{profilepicture}/g, user.avatarURL())})
    }

    if (config.feedback.embed.author.enabled) {
        embed = embed.setAuthor({name: config.feedback.embed.author.text.replace(/{user}/g, user.username).replace(/{userping}/g, `<@${user.id}>`).replace(/{userid}/g, user.id), iconURL: config.feedback.embed.author.img.replace(/{profilepicture}/g, user.avatarURL())})
    }

    client.channels.cache.get(config.feedback.channel).send({ embeds: [embed] });
    log("feedback", user, message, false)
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    let i = 1;
    client.guilds.cache.forEach((guild) => {
        console.log("Server " + i + ": " + guild.name + " | " + guild.id);
        i++;
    });

    client.user.setActivity(config.settings.activity, { type: config.settings.activitytype });

    let commands = client.application?.commands;

    commands?.create({
        name: 'ticket',
        description: 'Send Ticket Ebmed',
    });

    commands?.create({
        name: 'verify',
        description: 'Send Verify Ebmed',
    });

    commands?.create({
        name: 'feedback',
        description: 'Gib dein Feedback zum Service ab'
    })

    commands?.create({
        name: 'add',
        description: 'Add a user to a ticket',
        options: [
            {
                name: 'user',
                description: 'The user to add',
                type: 'USER',
                required: true,
            }
        ]
    });

    commands?.create({
        name: 'remove',
        description: 'Remove a user from a ticket',
        options: [
            {
                name: 'user',
                description: 'The user to remove',
                type: 'USER',
                required: true,
            }
        ]
    });

    for (let i = 0; i < config.commands.length; i++) {
        commands?.create({
            name: config.commands[i].name.toLowerCase().replace(/ /g, "-"),
            description: config.commands[i].description,
            options: config.commands[i].options
        });
    }
});

if (config.messages.join.enabled) {
    client.on('guildMemberAdd', member => {
        const channel = member.guild.channels.cache.find(ch => ch.id === config.messages.join.channel);

        if (!channel) return;

        let embed = new Discord.MessageEmbed()
            .setTitle(config.messages.join.title.replace(/{user}/g, member.user.username).replace(/{usermention}/g, `<@${member.user.id}>`).replace(/{userid}/g, member.user.id))
            .setDescription(config.messages.join.message.replace(/{user}/g, member.user.username).replace(/{usermention}/g, `<@${member.user.id}>`).replace(/{userid}/g, member.user.id).replace(/{server}/g, member.guild.name).replace(/{servermembercount}/g, member.guild.memberCount).replace(/{boostcount}/g, member.guild.premiumSubscriptionCount))
            .setColor(config.messages.join.color)
            
        if (config.messages.join.timestamp) {
            embed = embed.setTimestamp()
        }

        if (config.messages.join.image.enabled) {
            embed = embed.setThumbnail(config.messages.join.image.link.replace(/{profilepicture}/g, member.user.avatarURL()))
        }

        if (config.messages.join.banner.enabled) {
            embed = embed.setImage(config.messages.join.banner.link.replace(/{profilepicture}/g, member.user.avatarURL()))
        }

        if (config.messages.join.footer.enabled) {
            embed = embed.setFooter({text: config.messages.join.footer.text.replace(/{user}/g, member.user.username).replace(/{userping}/g, `<@${member.user.id}>`).replace(/{username}/g, member.user.username).replace(/{userid}/g, member.user.id), iconURL: config.messages.join.footer.img.replace(/{profilepicture}/g, member.user.avatarURL())})
        }

        if (config.messages.join.author.enabled) {
            embed = embed.setAuthor({name: config.messages.join.author.text.replace(/{user}/g, member.user.username).replace(/{userping}/g, `<@${member.user.id}>`).replace(/{userid}/g, member.user.id), iconURL: config.messages.join.author.img.replace(/{profilepicture}/g, member.user.avatarURL())})
        }

        channel.send({ embeds: [embed] });
    });
}

if (config.messages.leave.enabled) {
    client.on('guildMemberRemove', member => {
        const channel = member.guild.channels.cache.find(ch => ch.id === config.messages.leave.channel);

        if (!channel) return;

        let embed = new Discord.MessageEmbed()
            .setTitle(config.messages.leave.title.replace(/{user}/g, member.user.username).replace(/{usermention}/g, `<@${member.user.id}>`).replace(/{userid}/g, member.user.id))
            .setDescription(config.messages.leave.message.replace(/{user}/g, member.user.username).replace(/{usermention}/g, `<@${member.user.id}>`).replace(/{userid}/g, member.user.id).replace(/{server}/g, member.guild.name).replace(/{servermembercount}/g, member.guild.memberCount))
            .setColor(config.messages.leave.color)

        if (config.messages.leave.timestamp) {
            embed = embed.setTimestamp()
        }

        if (config.messages.leave.image.enabled) {
            embed = embed.setThumbnail(config.messages.leave.image.link.replace(/{profilepicture}/g, member.user.avatarURL()))
        }

        if (config.messages.leave.banner.enabled) {
            embed = embed.setImage(config.messages.leave.banner.link.replace(/{profilepicture}/g, member.user.avatarURL()))
        }

        if (config.messages.leave.footer.enabled) {
            embed = embed.setFooter({text: config.messages.leave.footer.text.replace(/{user}/g, member.user.username).replace(/{userping}/g, `<@${member.user.id}>`).replace(/{username}/g, member.user.username).replace(/{userid}/g, member.user.id), iconURL: config.messages.leave.footer.img.replace(/{profilepicture}/g, member.user.avatarURL())})
        }

        if (config.messages.leave.author.enabled) {
            embed = embed.setAuthor({name: config.messages.leave.author.text.replace(/{user}/g, member.user.username).replace(/{userping}/g, `<@${member.user.id}>`).replace(/{userid}/g, member.user.id), iconURL: config.messages.leave.author.img.replace(/{profilepicture}/g, member.user.avatarURL())})
        }

        channel.send({ embeds: [embed] });
    });
}

if (config.messages.boost.enabled) {
    client.on('guildMemberUpdate', (oldMember, newMember) => {
        if (oldMember.premiumSinceTimestamp === newMember.premiumSinceTimestamp) return;

        const channel = newMember.guild.channels.cache.find(ch => ch.id === config.messages.boost.channel);

        if (!channel) return;

        let embed = new Discord.MessageEmbed()
            .setTitle(config.messages.boost.title.replace(/{user}/g, newMember.user.username).replace(/{usermention}/g, `<@${newMember.user.id}>`).replace(/{userid}/g, newMember.user.id))
            .setDescription(config.messages.boost.message.replace(/{user}/g, newMember.user.username).replace(/{usermention}/g, `<@${newMember.user.id}>`).replace(/{userid}/g, newMember.user.id).replace(/{server}/g, newMember.guild.name).replace(/{servermembercount}/g, newMember.guild.memberCount).replace(/{boostcount}/g, newMember.guild.premiumSubscriptionCount).replace(/{boostlevel}/g, newMember.guild.premiumTier))
            .setColor(config.messages.boost.color)

        if (config.messages.boost.timestamp) {
            embed = embed.setTimestamp()
        }

        if (config.messages.boost.image.enabled) {
            embed = embed.setThumbnail(config.messages.boost.image.link.replace(/{profilepicture}/g, newMember.user.avatarURL()))
        }

        if (config.messages.boost.banner.enabled) {
            embed = embed.setImage(config.messages.boost.banner.link.replace(/{profilepicture}/g, newMember.user.avatarURL()))
        }

        if (config.messages.boost.footer.enabled) {
            embed = embed.setFooter({text: config.messages.boost.footer.text.replace(/{user}/g, newMember.user.username).replace(/{userping}/g, `<@${newMember.user.id}>`).replace(/{username}/g, newMember.user.username).replace(/{userid}/g, newMember.user.id), iconURL: config.messages.boost.footer.img.replace(/{profilepicture}/g, newMember.user.avatarURL())})
        }

        if (config.messages.boost.author.enabled) {
            embed = embed.setAuthor({name: config.messages.boost.author.text.replace(/{user}/g, newMember.user.username).replace(/{userping}/g, `<@${newMember.user.id}>`).replace(/{userid}/g, newMember.user.id), iconURL: config.messages.boost.author.img.replace(/{profilepicture}/g, newMember.user.avatarURL())})
        }

        channel.send({ embeds: [embed] });

    });
}

client.on('interactionCreate', async interaction => {
    const { commandName, values, customId } = interaction;

    if (interaction.isCommand()) {
        if (commandName === 'add') {
            const channel = interaction.channel
            const user = interaction.options.getUser('user')

            if (!user) {
                return interaction.reply({ content: 'Please provide a user!', ephemeral: true })
            }

            if (user.bot) {
                return interaction.reply({ content: 'You can\'t add a bot!', ephemeral: true })
            }

            if (user.id === interaction.user.id) {
                return interaction.reply({ content: 'You can\'t add yourself!', ephemeral: true })
            }

            if (!interaction.member.roles.cache.has(config.settings.staffId)) {
                return interaction.reply({ content: 'You are no Part of the Team!', ephemeral: true })
            }

            // Check if Channel is in one of the Categories
            let isCategory = false;
            config.categorys.forEach(category => {
                console.log(channel.parentId)
                if (category.categoryid == channel.parentId) {
                    isCategory = true;
                }
            });
            if (!isCategory) return interaction.reply({ content: 'This Channel is not in a Ticket Category!', ephemeral: true })

            channel.permissionOverwrites.edit(user.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                READ_MESSAGE_HISTORY: true,
            })

            interaction.reply({ content: `Added ${user} to the Ticket!`, ephemeral: true })
        }

        if (commandName === 'remove') {
            const channel = interaction.channel
            const user = interaction.options.getUser('user')

            if (!user) {
                return interaction.reply({ content: 'Please provide a user!', ephemeral: true })
            }

            if (user.bot) {
                return interaction.reply({ content: 'You can\'t add a bot!', ephemeral: true })
            }

            if (user.id === interaction.user.id) {
                return interaction.reply({ content: 'You can\'t add yourself!', ephemeral: true })
            }

            if (!interaction.member.roles.cache.has(config.settings.staffId)) {
                return interaction.reply({ content: 'You are no Part of the Team!', ephemeral: true })
            }

            // Check if Channel is in one of the Categories
            let isCategory = false;
            config.categorys.forEach(category => {
                console.log(channel.parentId)
                if (category.categoryid == channel.parentId) {
                    isCategory = true;
                }
            });
            if (!isCategory) return interaction.reply({ content: 'This Channel is not in a Ticket Category!', ephemeral: true })

            channel.permissionOverwrites.edit(user.id, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                ATTACH_FILES: false,
                READ_MESSAGE_HISTORY: false,
            })

            interaction.reply({ content: `Removed ${user} from the Ticket!`, ephemeral: true })
        }

        if (commandName === 'verify') {
            let embed = new Discord.MessageEmbed()
            .setTitle(config.verify.title)
            .setDescription(config.verify.description)
            .setColor(config.verify.color)
            
            if (config.verify.timestamp) {
                embed = embed.setTimestamp()
            }

            if (config.verify.image.enabled) {
                embed = embed.setThumbnail(config.verify.image.link)
            }

            if (config.verify.banner.enabled) {
                embed = embed.setImage(config.verify.banner.link)
            }

            if (config.verify.footer.enabled) {
                embed = embed.setFooter({text: config.verify.footer.text, iconURL: config.verify.footer.icon})
            }

            if (config.verify.author.enabled) {
                embed = embed.setAuthor({name: config.verify.author.text, iconURL: config.verify.author.icon})
            }

            let button =  new Discord.MessageButton()
                .setCustomId(config.verify.button.customId)
                .setLabel(config.verify.button.name)
                .setStyle(config.verify.button.style)
                .setEmoji(config.verify.button.emoji)

            let row = new Discord.MessageActionRow()
                .addComponents(button)

            interaction.reply({ embeds: [embed], components: [row] })

        }

        if (commandName === 'feedback') {
            sendfeedbackDM(interaction.user.id)
            interaction.reply({content: 'Bitte überprüfe deine DMs um dort das Feedback abzugeben!', ephemeral: true})
        }

        if (commandName === 'ticket') {
            let embed = new Discord.MessageEmbed()
                .setTitle(config.ticketmenu.title)
                .setDescription(config.ticketmenu.description)
                .setColor(config.ticketmenu.color)
                
            if (config.ticketmenu.timestamp) {
                embed = embed.setTimestamp()
            }
    
            if (config.ticketmenu.image.enabled) {
                embed = embed.setThumbnail(config.ticketmenu.image.link)
            }
    
            if (config.ticketmenu.banner.enabled) {
                embed = embed.setImage(config.ticketmenu.banner.link)
            }
    
            if (config.ticketmenu.footer.enabled) {
                embed = embed.setFooter({text: config.ticketmenu.footer.text, iconURL: config.ticketmenu.footer.icon})
            }
    
            if (config.ticketmenu.author.enabled) {
                embed = embed.setAuthor({name: config.ticketmenu.author.text, iconURL: config.ticketmenu.author.icon})
            }
    
            let selectmenu =  new Discord.MessageSelectMenu()
                .setCustomId('ticketmenu')
                .setPlaceholder(config.ticketmenu.placeholder)
                
            for (let i = 0; i < config.categorys.length; i++) {
                selectmenu.addOptions({
                    label: config.categorys[i].name,
                    description: config.categorys[i].description,
                    emoji: config.categorys[i].emoji,
                    value: config.categorys[i].name.toLowerCase().replace(/ /g, "-")
                })
            }
    
            let row = new Discord.MessageActionRow()
                .addComponents(selectmenu)
    
            await interaction.reply({ embeds: [embed], components: [row] });
    
        }
    
        // Custom Commands
        for (let i = 0; i < config.commands.length; i++) {
            if (commandName === config.commands[i].name.replace(/ /g, "-").toLowerCase()) {

                let description = config.commands[i].response.description
                .replace(/{userping}/g, `<@${interaction.user.id}>`)
                .replace(/{userid}/g, interaction.user.id)
                .replace(/{username}/g, interaction.user.username)
                .replace(/{config.commands[i].name}/g, config.commands[i].name);
    
                config.commands[i].options.forEach(option => {
                    description = description.replace(`{${option.name}}`, interaction.options.get(option.name).value);
                });
    
                let embed = new Discord.MessageEmbed()
                    .setTitle(config.commands[i].response.title)
                    .setDescription(description)
                    .setColor(config.commands[i].response.color)
    
                if (config.commands[i].response.timestamp) {
                    embed = embed.setTimestamp()
                }
    
                if (config.commands[i].response.image.enabled) {
                    embed = embed.setThumbnail(config.commands[i].response.image.link)
                }
    
                if (config.commands[i].response.banner.enabled) {
                    embed = embed.setImage(config.commands[i].response.banner.link)
                }
    
                if (config.commands[i].response.footer.enabled) {
                    if (!config.commands[i].response.footer.img) {
                        embed = embed.setFooter({text: config.commands[i].response.footer.text.replace(/{time}/g, new Date().toLocaleString())})
                    } else {
                        embed = embed.setFooter({text: config.commands[i].response.footer.text.replace(/{time}/g, new Date().toLocaleString()), iconURL: config.commands[i].response.footer.img})
                    }
                }
    
                if (config.commands[i].response.author.enabled) {
                    embed = embed.setAuthor({name: config.commands[i].response.author.text, iconURL: config.commands[i].response.author.img})
                }
    
                await interaction.reply({ embeds: [embed] });
            }
        }
    } else {
        if (customId == "verify") {
            if (config.verify.enabled) {
                if (interaction.member.roles.cache.has(config.verify.role)) {
                    return interaction.reply({ content: 'You are already verified!', ephemeral: true })
                } else {
                    await interaction.deferReply({ephemeral: true});
                    const guild = interaction.guild;
                    const member = guild.members.cache.get(interaction.user.id);
                    member.roles.add(config.verify.role);
                    interaction.editReply({ content: 'You are now verified!' })
                    log("verify", interaction.user, interaction.channel, false)
                }
            } else {
                return interaction.reply({ content: 'Verification is disabled!', ephemeral: true })
            }
        }

        if (customId == 'ticketmenu') {
             // Ticket Interactions
            for (let i = 0; i < config.categorys.length; i++) {
                if (values[0] === config.categorys[i].name.toLowerCase().replace(/ /g, "-")) {
                    // get all channels where tpic is user id
                    const channels = interaction.guild.channels.cache.filter(c => c.topic === interaction.user.id);
                    // check if user has a ticket
                    if (channels.size < config.settings.maxticketsopen) {
                        await interaction.deferReply({ephemeral: true});
                        const guild = interaction.guild;
                        const category = guild.channels.cache.get(config.categorys[i].categoryid);
                        const member = guild.members.cache.get(interaction.user.id);
                        const channel = await guild.channels.create(config.categorys[i].ticket.name.replace(/{username}/g, interaction.user.username), {
                            type: 'GUILD_TEXT',
                            topic: `${interaction.user.id}`,
                            parent: category,
                            permissionOverwrites: [
                                {
                                    id: guild.id,
                                    deny: ['VIEW_CHANNEL'],
                                },
                                {
                                    id: member.id,
                                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'ATTACH_FILES'],
                                },
                                {
                                    id: config.categorys[i].ticket.perms,
                                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'ATTACH_FILES'],
                                },
                            ],
                        });
                        // reset selection of menu
                        let selectmenu = new Discord.MessageSelectMenu()
                            .setCustomId('ticketmenu')
                            .setPlaceholder('Select a category')
                            
                        for (let i = 0; i < config.categorys.length; i++) {
                            selectmenu.addOptions({
                                label: config.categorys[i].name,
                                value: config.categorys[i].name.toLowerCase().replace(/ /g, "-"),
                                emoji: config.categorys[i].emoji
                            })
                        }

                        let row1 = new Discord.MessageActionRow()
                            .addComponents(selectmenu)

                        interaction.message.edit({ embed: interaction.message.embeds[0], components: [row1] })

                        let embed = new Discord.MessageEmbed()
                            .setTitle(config.categorys[i].ticket.emebd.title)
                            .setDescription(config.categorys[i].ticket.emebd.description.replace(/{userping}/g, `<@${interaction.user.id}>`).replace(/{category}/g, config.categorys[i].name).replace(/{userid}/g, interaction.user.id).replace(/{username}/g, interaction.user.username))
                            .setColor(config.categorys[i].ticket.emebd.color)

                            if (config.categorys[i].ticket.emebd.timestamp) {
                                embed.setTimestamp()
                            }

                            if (config.categorys[i].ticket.emebd.image.enabled) {
                                embed.setThumbnail(config.categorys[i].ticket.emebd.image.link)
                            }

                            if (config.categorys[i].ticket.emebd.banner.enabled) {
                                embed.setImage(config.categorys[i].ticket.emebd.banner.link)
                            }

                            if (config.categorys[i].ticket.emebd.footer.enabled) {
                                if (!config.categorys[i].ticket.emebd.footer.img) {
                                    embed.setFooter({text: config.categorys[i].ticket.emebd.footer.text.replace(/{time}/g, new Date().toLocaleString())})
                                } else {
                                    embed.setFooter({text: config.categorys[i].ticket.emebd.footer.text.replace(/{time}/g, new Date().toLocaleString()), iconURL: config.categorys[i].ticket.emebd.footer.img})
                                }
                            }
                            
                            if (config.categorys[i].ticket.emebd.author.enabled) {
                                if (!config.categorys[i].ticket.emebd.author.img) {
                                    embed.setAuthor({name: config.categorys[i].ticket.emebd.author.text})
                                } else {
                                    embed.setAuthor({name: config.categorys[i].ticket.emebd.author.text, iconURL: config.categorys[i].ticket.emebd.author.img})
                                }
                            }

                        for (let j = 0; j < config.categorys[i].ticket.emebd.fields.length; j++) {
                            embed.addFields({
                                name: config.categorys[i].ticket.emebd.fields[j].name
                                .replace(/{userping}/g, `<@${interaction.user.id}>`)
                                .replace(/{category}/g, config.categorys[i].name)
                                .replace(/{userid}/g, interaction.user.id)
                                .replace(/{username}/g, interaction.user.username),
                                
                                value: config.categorys[i].ticket.emebd.fields[j].value
                                .replace(/{userping}/g, `<@${interaction.user.id}>`)
                                .replace(/{category}/g, config.categorys[i].name)
                                .replace(/{userid}/g, interaction.user.id)
                                .replace(/{username}/g, interaction.user.username),

                                inline: config.categorys[i].ticket.emebd.fields[j].inline
                            });
                        }

                        const row = new Discord.MessageActionRow()
                            .addComponents(
                                new Discord.MessageButton()
                                    .setCustomId('close')
                                    .setLabel('Schließen')
                                    .setStyle('DANGER')
                            );

                        let contet = ""
                        if (config.categorys[i].ticket.pinguser) {
                            contet = `<@${interaction.user.id}>`
                        }
                        if (config.categorys[i].ticket.pingstaff) {
                            contet = contet + "<@&" + config.categorys[i].ticket.pingstaff + ">"
                        }

                        if (contet == "") {
                            await channel.send({embeds: [embed], components: [row]});
                        } else {
                            await channel.send({content: contet, embeds: [embed], components: [row]});
                        }

                        if (config.logs.ticketopen.enabled) log("ticketopen", interaction.user, channel, false)
                        await interaction.editReply({content: "Ticket erfolgreich erstellt", ephemeral: true});
                    } else {
                        await interaction.deferReply({ephemeral: true});
                        await interaction.editReply({content: "Du hast die Maximale Anzahl an Tickets offen", ephemeral: true});
                    }
                }
            }
        } else if (customId == 'close') {
            await interaction.deferReply({ephemeral: true});
            const channel = interaction.channel;
            await interaction.editReply({content: "Ticket wird geschlossen", ephemeral: true});
            await new Promise(r => setTimeout(r, 3000));
            attachment = await trans.createTranscript(channel, {
                minify: false,
                fileName: "transkript.html",
              });
            const transscripts = config.logs.ticketclose.transscripts
            if (config.logs.ticketclose.enabled) log("ticketclose", interaction.user, channel, transscripts)
            if (config.feedback.enabled) sendfeedbackDM(interaction.user.id)
            await channel.delete();
        } else if (customId == 'feedback') {
            stars = values[0]

            const modal = new Discord.Modal()
                .setTitle('Feedback - ' + stars + ' Sterne')
                .setCustomId('feedbackmodal')

            let TextInputComponent = new Discord.TextInputComponent()
                .setCustomId('feedbacktext')
                .setLabel('Feedback')
                .setPlaceholder('Dein Feedback')
                .setMinLength(1)
                .setMaxLength(1000)
                .setStyle('PARAGRAPH')

            const row = new Discord.MessageActionRow()
                .addComponents(TextInputComponent)

            modal.addComponents(row)

            await interaction.showModal(modal);

        } else if (customId == 'feedbackmodal') {
            sendfeedback(interaction.user, interaction.fields.components[0].components[0].value, stars)

            const embed = new Discord.MessageEmbed()
                .setTitle(config.feedback.feedbackdone.title)
                .setDescription(config.feedback.feedbackdone.description)
                .setColor(config.feedback.feedbackdone.color)
            
                if (config.feedback.feedbackdone.banner.enabled) {
                    embed.setImage(config.feedback.feedbackdone.banner.link)
                }

                if (config.feedback.feedbackdone.timestamp) {
                    embed.setTimestamp()
                }

            await interaction.update({embeds: [embed], components: []});
        }
    };
});

client.login(config.settings.token)