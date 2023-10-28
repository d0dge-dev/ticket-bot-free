const settings = {
    token: "", // Bot Token
    guildid: "", // Guild ID
    activity: "auf Tickets", // Activity Message
    activitytype: "WATCHING", // WATCHING, LISTENING, PLAYING, STREAMING
    staffId: "944213125807341622", // Staff Role ID
    maxticketsopen: 3, // Max Tickets per User
}

const messages = {
    join: {
        enabled: true,
        channel: "944213125836734579",
        title: "Herzlich Willkommen!",
        message: "Hey {usermention}, Willkommen auf {server}, wir sind jetzt alle zusammen {servermembercount} Mitgleider!",
        color: "#2fb0e2",
        image: {
            enabled: true,
            link: "https://cdn-longterm.mee6.xyz/plugins/welcome/images/944213125786402816/22bdc1ea47322d9e942f3899f8c1254c298dc82ae83569342f62c348992f7ee6.png"
        },
        banner: {
            enabled: false,
            link: "https://images-ext-2.discordapp.net/external/2SShXDq6-tl51ZDt_9Xijk4hEpaa3g1IsVqcXQbDhMY/https/cdn-longterm.mee6.xyz/plugins/welcome/images/944213125786402816/6858a58e16a7f1464b0e78acd6ad923a5411292f7eb4d44bf6b6891650fb4fd8.png"
        },
        author: {
            enabled: true,
            text: "G-Cars",
            img: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
        },
        footer: {
            enabled: true,
            text: "Copyright © 2023 G-Cars",
            img: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
        },
        timestamp: true,
    },
    boost: {
        enabled: false,
        channel: "1078893135100383345",
        title: "Boost",
        message: "{usermention} boosted {server}, we have now {boostcount} Boosts!",
        color: "#2fb0e2",
        image: {
            enabled: true,
            link: "https://cdn-longterm.mee6.xyz/plugins/welcome/images/944213125786402816/22bdc1ea47322d9e942f3899f8c1254c298dc82ae83569342f62c348992f7ee6.png"
        },
        banner: {
            enabled: false,
            link: "https://images-ext-2.discordapp.net/external/2SShXDq6-tl51ZDt_9Xijk4hEpaa3g1IsVqcXQbDhMY/https/cdn-longterm.mee6.xyz/plugins/welcome/images/944213125786402816/6858a58e16a7f1464b0e78acd6ad923a5411292f7eb4d44bf6b6891650fb4fd8.png"
        },
        author: {
            enabled: true,
            text: "G-Cars",
            img: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
        },
        footer: {
            enabled: true,
            text: "Copyright © 2023 G-Cars",
            img: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
        },
        timestamp: true,
    },
    leave: {
        enabled: true,
        channel: "944213125836734580",
        title: "Tschüss",
        message: "Auf Wiedersehen {usermention}, jetzt sind wir nur noch {servermembercount} Mitglieder!",
        color: "#2fb0e2",
        image: {
            enabled: true,
            link: "https://cdn-longterm.mee6.xyz/plugins/welcome/images/944213125786402816/22bdc1ea47322d9e942f3899f8c1254c298dc82ae83569342f62c348992f7ee6.png"
        },
        banner: {
            enabled: false,
            link: "https://images-ext-2.discordapp.net/external/2SShXDq6-tl51ZDt_9Xijk4hEpaa3g1IsVqcXQbDhMY/https/cdn-longterm.mee6.xyz/plugins/welcome/images/944213125786402816/6858a58e16a7f1464b0e78acd6ad923a5411292f7eb4d44bf6b6891650fb4fd8.png"
        },
        author: {
            enabled: true,
            text: "G-Cars",
            img: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
        },
        footer: {
            enabled: true,
            text: "Copyright © 2023 G-Cars",
            img: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
        },
        timestamp: true,
    },
}

const verify = {
    enabled: true,
    role: "944213125786402824",
    title: "Verifizieren",
    description: `Um gesamten Zugriff auf den Discord zu erhalten benötigen wir das akzeptieren des <#944213125836734583> das kannst du akzeptieren in dem du auf den verifizieren Button klickst!`,
    color: "#2fb0e2",
    image: {
        enabled: true,
        link: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754",
    },
    banner: {
        enabled: false,
        link: "https://cdn-longterm.mee6.xyz/plugins/embeds/images/944213125786402816/b0f08636feb1288d808b9982dd40d07ccbb21b1f31441375168120097e70b375.png",
    },
    author: {
        enabled: true,
        text: "G-Cars",
        img: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
    },
    footer: {
        enabled: true,
        text: "Copyright © 2023 G-Cars",
        img: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
    },
    timestamp: false,
    button: {
        name: "Verifizieren",
        style: "PRIMARY",
        emoji: "✅",
        customId: "verify", // Do not change this
    }
}

const commands = [
    // To add a new command, copy the following code and paste it below the last command
    {
        name: "Paypal",
        description: "Sende dem User die PayPal Informationen",
        options: [
            {
                name: "ammount",
                description: "The ammount the user hast to pay",
                type: "INTEGER",
                required: true,
            }
        ],
        response: {
            title: "Paypal-Betrag",
            description: "Betrag: {ammount}€\nEmail: paypal@g-dev.de\n\nBitte nach der Zahlung die Zahlungsbestätigung in das Ticket senden.",
            color: "#2fb0e2",
            image: {
                enabled: true,
                link: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754",
            },
            banner: {
                enabled: false,
                link: "",
            },
            author: {
                enabled: false,
                text: "G-Cars",
                img: false            
            },
            footer: {
                enabled: true,
                text: "Copyright © 2023 G-Cars",
                img: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
            },
            timestamp: false,
        }
    },
    {
        name: "Paysafe",
        description: "Show Payment Information",
        options: [
            {
                name: "ammount",
                description: "The ammount the user hast to pay",
                type: "INTEGER",
                required: true,
            }
        ],
        response: {
            title: "Paysafe",
            description: "Betrag: {ammount}€\n\nBitte den Code via DM an <@986258038010834985> senden.",
            color: "#2fb0e2",
            image: {
                enabled: true,
                link: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754",
            },
            banner: {
                enabled: false,
                link: "",
            },
            author: {
                enabled: false,
                text: "G-Cars",
                img: false            
            },
            footer: {
                enabled: true,
                text: "Copyright © 2023 G-Cars",
                img: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
            },
            timestamp: false,
        }
    }
]

const ticketmenu = {
    title: "Erstelle ein Ticket",
    description: "Wähle die passende Kategorie aus, um ein Ticket zu erstellen.",
    placeholder: "Kategorie auswählen",
    color: "#2fb0e2",
    image: {
        enabled: true,
        link: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
    },
    banner: {
        enabled: false,
        link: "https://media.discordapp.net/attachments/1034521860878127164/1068210097983074424/ticketsystem.png"
    },
    author: {
        enabled: true,
        text: "G-Cars",
        img: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
    },
    footer: {
        enabled: true,
        text: "G-Cars",
        img: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
    },
    timestamp: true,
}

const categorys = [
    // To add more categorys, just copy the code below and paste it above the last category.
    {
        name: "Support",
        description: "Brauchst du hilfe? Erstelle ein Ticket!",
        emoji: "❔",
        categoryid: "1049734913840123964",
        ticket: {
            name: "sup-{username}",
            topic: "{userid}",
            pinguser: true,
            pingstaff: false, // false to disable
            perms: "944213125807341622",
            emebd: {
                title: "Support Ticket",
                description: "Hallo {userping},\nwir werden uns so schnell wie möglich um dein Anliegen kümmern.\n\nBitte warte auf eine Antwort von einem unserer Supporter.\n\nMit freundlichen Grüßen,\ndas Support Team",
                color: "#2fb0e2",
                image: {
                    enabled: true,
                    link: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754",
                },
                banner: {
                    enabled: false,
                    link: "",
                },
                fields: [
                    {
                        name: "Category",
                        value: "{category}",
                        inline: true
                    },
                    {
                        name: "User",
                        value: "{userping}",
                        inline: true
                    }
                ],
                author: {
                    enabled: true,
                    text: "G-Cars",
                    img: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
                },
                footer: {
                    enabled: true,
                    text: "Copyright © 2023 G-Cars",
                    img: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
                },
                timestamp: true
            }
        }
    },
    {
        name: "Kaufen",
        description: "Willst du etwas kaufen? Erstelle ein Ticket!",
        emoji: "💵",
        categoryid: "1079113130296230038",
        ticket: {
            name: "kaufen-{username}",
            topic: "{userid}",
            pinguser: true,
            pingstaff: false, // false to disable
            perms: "989240878814085150",
            emebd: {
                title: "Kaufen Ticket",
                description: "Hallo {userping},\n wir werden uns so schnell wie möglich um dein Anliegen kümmern.\n\nBitte warte auf eine Antwort von einem unserer Supporter.\n\nMit freundlichen Grüßen,\ndas Support Team",
                color: "#2fb0e2",
                image: {
                    enabled: true,
                    link: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754",
                },
                banner: {
                    enabled: false,
                    link: "",
                },
                fields: [
                    {
                        name: "Category",
                        value: "{category}",
                        inline: true
                    },
                    {
                        name: "User",
                        value: "{userping}",
                        inline: true
                    }
                ],
                author: {
                    enabled: false,
                    text: "G-Cars",
                    img: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
                },
                footer: {
                    enabled: false,
                    text: "Copyright © 2023 G-Cars",
                    img: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
                },
                timestamp: true
            }
        }
    },
    {
        name: "Partnerschaft",
        description: "Interesse an einer Partnerschaft? Erstelle ein Ticket!",
        emoji: "👥",
        categoryid: "1079113205894357159",
        ticket: {
            name: "partner-{username}",
            topic: "{userid}",
            pinguser: true,
            pingstaff: false, // false to disable
            perms: "944213125807341622",
            emebd: {
                title: "Parternschaft Ticket",
                description: "Hallo {userping},\n wir werden uns so schnell wie möglich um dein Anliegen kümmern.\n\nBitte warte auf eine Antwort von einem unserer Supporter.\n\nMit freundlichen Grüßen,\ndas Support Team",
                color: "#2fb0e2",
                image: {
                    enabled: true,
                    link: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754",
                },
                banner: {
                    enabled: false,
                    link: "",
                },
                fields: [
                    {
                        name: "Category",
                        value: "{category}",
                        inline: true
                    },
                    {
                        name: "User",
                        value: "{userping}",
                        inline: true
                    }
                ],
                author: {
                    enabled: false,
                    text: "G-Cars",
                    img: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
                },
                footer: {
                    enabled: false,
                    text: "Copyright © 2023 G-Cars",
                    img: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
                },
                timestamp: true
            }
        }
    }
]

const feedback = {
    enabled: true,
    channel: "954056853493530694",
    embed: {
        title: "Feedback von {user}",
        description: "{feedback}",
        color: "#2fb0e2",
        fields: [
            {
                name: "Feedback in Sternen",
                value: "{stars}",
                inline: true
            },
            {
                name: "User",
                value: "{userping}",
                inline: true
            }
        ],
        image: {
            enabled: true,
            link: "{profilepicture}"
        },
        author: {
            enabled: true,
            text: "G-Cars",
            img: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754"
        },
        footer: {
            enabled: true,
            text: "Feedback von {username}",
            img: "{profilepicture}"
        },
        timestamp: true
    },
    feedbackdone: {
        title: "Feedback",
        description: "Thank you for your feedback!",
        color: "#2fb0e2",
        banner: {
            enabled: true,
            link: "https://media.discordapp.net/attachments/1056706748444061839/1056707066145808444/GDEV2.png?width=754&height=754",
        },
        timestamp: true
    }
}

const logs = {
    ticketopen: {
        enabled: true,
        channel: "1077321245160378409",
            title: "Ticket wurde geöffnet",
            description: "Ticket wurde von {username} geöffnet",
            color: "#2fb0e2",
            fields: [
                {
                    name: "Ticket",
                    value: "{ticketname}",
                    inline: true
                },
                {
                    name: "User",
                    value: "{userping}",
                    inline: true
                },
                {
                    name: "Category",
                    value: "{category}",
                    inline: true
                }
            ],
            timestamp: true

    },
    ticketclose: {
        enabled: true,
        transscripts: true,
        sendTransscriptDM: true,
        channel: "1077321245160378409",
            title: "Ticket wurde geschlossen",
            description: "Ticket wurde von {username} geschlossen",
            color: "#2fb0e2",
            fields: [
                {
                    name: "Ticket",
                    value: "{ticketname}",
                    inline: true
                },
                {
                    name: "User",
                    value: "{userping}",
                    inline: true
                },
                {
                    name: "Category",
                    value: "{category}",
                    inline: true
                }
            ],
            timestamp: true
    },
    verify: {
        enabled: true,
        channel: "1077321245160378409",
            title: "User wurde verifiziert",
            description: "User {username} hat sich verifiziert",
            color: "#2fb0e2",
            timestamp: true
    },
    feedback: {
        enabled: true,
        channel: "1077321245160378409",
            title: "Feedback",
            description: "User {username} hat ein Feedback geschrieben",
            color: "#2fb0e2",
            fields: [
                {
                    name: "Feedback",
                    value: "{feedback}",
                    inline: true
                },
                {
                    name: "User",
                    value: "{userping}",
                    inline: true
                }
            ],
            timestamp: true
    }
}

module.exports = { settings, categorys, messages, commands, ticketmenu, feedback, logs, verify };