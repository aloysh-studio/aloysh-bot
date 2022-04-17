const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require('quick.db')
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
    ]
});


//préfixe du bot
const prefix = "ah.";


/*SLASH COMMANDES*/
let slash_cmd


//slash commande ping
const s1 = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("renvoie pong")
    .addUserOption(option => option
        .setName("utilisateur")
        .setDescription("utilisateur que vous souhaitez mentionner")
        .setRequired(false));

        
//Slash commande clear
const s2 = new SlashCommandBuilder()
    .setName("clear")
    .setDescription("permet de supprimer des messages rapidement")

    .addIntegerOption(option =>
        option.setName("number")
            .setDescription("Nombre de messages que vous voulez supprimer")
            .setRequired(true)
    );

slash_cmd = [s1, s2]

/*FIN SLASH COMMANDES*/
// démarrage du bot
Client.on("ready", async () => {
    
    
    //création des commandes slash
    slash_cmd.forEach(command => {
        Client.guilds.cache.get("665602826373693540").commands.create(command)//<-- commandes pour son propre Serveur, prends peu de temps
        Client.application.commands.create(command); //<-- commandes slash pour tous les serveurs, mais prend du temps (environ 1h)
    })


    //permet de vérifier le cache des commandes slash
    console.log(Client.application.commands.cache);
    await Client.application.commands.fetch();
    console.log(Client.application.commands.cache);
    //message de démarrage du bot
    console.log("bot opérationnel !");


    //custom status
    function randomStatus() {
        let status = ["ah.help"] //<-- message de status
        let rstatus = Math.floor(Math.random() * status.length);

        Client.user.setActivity(status[rstatus], { type: "STREAMING", url: "https://www.twitch.tv/aloysh_studio" }); //<-- type de status
    }; setInterval(randomStatus, 2000)
});


//message d'arrivée d'une personne sur le Serveur + bannière d'arrivée
Client.on("guildMemberAdd", async member => {
    console.log("un membre a rejoint le Serveur.");
    member.guild.channels.cache.find(channel => channel.id === "962776742412550194").send("<@" + member.id + "> a rejoint le Serveur !\nNous sommes désormais **" + member.guild.memberCount + "personnes** sur le Serveur !");
    member.roles.add("840601431367090221").then(member => {
        console.log("Rôle attribué avec succès pour " + member.displayName);
    }).catch(() => {
        console.log("Le rôle n'a pas pu être attribué !");
    });

    var canvas = canvas.createCanvas(1280, 720);

    ctx = canvas.getContext("2d");

    var background = await canvas.loadImage("./background.png");
    ctx.drawImage(background, 0, 0, 1280, 720);

    ctx.font = "42px Impact";
    ctx.fillStyle = "#5ACFF5";
    ctx.textAlign = "center";
    ctx.fillText(member.user.tag.toUpperCase(), 1280, 720);

    ctx.beginPath();
    ctx.arc(512, 166, 119, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    var avatar = await Canvas.loadImage(member.user.displayAvatarURL({
        format: "png",
        size: 1024,
    }));

    ctx.drawImage(avatar, 393, 47, 23, 238);

    var attachement = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");

    Client.channels.cache.get("962776742412550194").send({ files: [attachement] });
});


//messages de départ d'une personne sur le Serveur
Client.on("guildMemberRemove", member => {
    console.log("un membre a quitté le Serveur.");
    member.guild.channels.cache.find(channel => channel.id === "962776742412550194").send("<@" + member.id + "> a quitté le Serveur !\nNous sommes désormais **" + member.guild.memberCount + "personnes** sur le Serveur !");
});


//chaque interaction passe par ici
Client.on("interactionCreate", interaction => {
    //les menus à sélection:
    if (interaction.isSelectMenu()) {
        if (interaction.customId === "select") {
            console.log(interaction.values);

            if (interaction.values == "option 1") {
                interaction.reply({ content: "Tu as choisi **Minecraft**.", ephemeral: true });
            }
            else if (interaction.values == "option 2") {
                interaction.reply({ content: "Tu as choisi **Fortnite**.", ephemeral: true });
            }
            else if (interaction.values == "option 3") {
                interaction.reply({ content: "Tu as choisi **Apex Legends**.", ephemeral: true });
            }
            else if (interaction.values == "option 4") {
                interaction.reply({ content: "Tu as choisi **League of Legends**.", ephemeral: true });
            }
            else if (interaction.values == "option 5") {
                interaction.reply({ content: "Tu as choisi **Among Us**.", ephemeral: true });
            }
            else if (interaction.values == "option 6") {
                interaction.reply({ content: "Tu as choisi **Autre**.", ephemeral: true });
            }
        }
    }


    //les bouttons:
    if (interaction.isButton()) {
        
        
        //bouton 1
        if (interaction.customId === "bouton1") {
            interaction.reply({ content: "Ah, tu l'as vraiment fait? espèce de mouton 🐑", ephemeral: true });
        }
        if (interaction.customId === "open-ticket") {
            nbTicket++;

            interaction.guild.channels.create("ticket-" + nbTicket, {
                parent: "964975837063557120"
            }).then(channel => {
                var row = new Discord.MessageActionRow()
                    .addComponents(new Discord.MessageButton()
                        .setCustomId("close-ticket")
                        .setLabel("fermer le ticket")
                        .setStyle("DANGER")
                    );

                channel.send({ content: "<@" + interaction.user.id + "> Voici ton ticket, tu peux le fermer en appuyant sur le bouton ci-dessous :", components: [row] });

                interaction.reply({ content: "ticket correctement créé", ephemeral: true });
            });
        }


        //Ticket --> Ticket fermé
        else if (interaction.customId === "close-ticket") {
            interaction.channel.setParent("964983895160414258");

            var row = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setCustomId("delete-ticket")
                    .setLabel("supprimer le ticket")
                    .setStyle("DANGER")
                );

            interaction.message.delete();

            interaction.channel.send({ content: "**Supprimer le ticket :**", components: [row] });

            interaction.reply({ content: "ticket archivé", ephemeral: true });
        }


        //Ticket --> Ticket supprimé
        else if (interaction.customId === "delete-ticket") {
            interaction.channel.delete();

            interaction.reply({ content: "ticket supprimé", ephemeral: true });
        }
    }


    //les slash commandes:
    if (interaction.isCommand()) {
        
        
        //commande ping
        if (interaction.commandName === "ping") {
            let user = interaction.options.getUser("utilisateur");

            //permet de mentionner une personne en effectuant la commande ping
            if (user != undefined) {
                interaction.reply("pong <@" + user.id + ">");
            }
            else {
                interaction.reply("pong");
            }
        }


        //commande clear
        if (interaction.commandName === "clear") {
            var number = interaction.options.getInteger("number")

            if (number >= 2 && number <= 100) {
                interaction.channel.bulkDelete(number);
                interaction.reply({ content: number + " messages correctement supprimés", ephemeral: true });
            }
            else {
                interaction.reply({ content: "Le nombre de messages supprimés doit être compris entre 2 et 100.", ephemeral: true });
            }
        }
    }
});


//chaque message passe par ici, c'est d'ailleurs ici que l'on vérifie les commandes textuelles
Client.on("messageCreate", async (message, guild) => {
    if (message.author.bot) return; // <-- si l'hauteur du message est un bot on ne fait rien
    if (message.channel.type == "dm") return; //<-- si le message est un dm on ne fait rien
    
    
    //message avec menu de sélection
    if (message.content === prefix + "select") {

        var row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId("select")
                    .setPlaceholder("Veuillez selectionner une option :")
                    .addOptions([
                        {
                            label: "⛏️ Minecraft",
                            description: "le meilleur jeu au monde, je veux rien savoir.",
                            value: "option 1"
                        },
                        {
                            label: "🔫 Fortnite",
                            description: "le jeu qui réunit le plus d'ados de 13 ans.",
                            value: "option 2"
                        },
                        {
                            label: "🤖 Apex Legends",
                            description: "le meilleur Battle Royale au monde.",
                            value: "option 3"
                        },
                        {
                            label: "🧚🏻‍♂️ League of Legends (LOL)",
                            description: "le jeu qui a la communauté la plus cancer.",
                            value: "option 4"
                        },
                        {
                            label: "🔪 Among Us",
                            description: "le meilleur jeu pour rompre des amitiés.",
                            value: "option 5"
                        },
                        {
                            label: "❓ Autre",
                            description: "autre jeu vidéo.",
                            value: "option 6"
                        }
                    ])
            );

        message.channel.send({ content: "__**Choisit un jeu :**__", components: [row] });
    }


    //message avec bouton de lien  
    if (message.content === prefix + "link") {
        var row = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setLabel("appuie ici")
                .setStyle("LINK")
                .setEmoji("💻")
                .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
            );

        message.channel.send({ content: "__**Appuie sur le bouton :**__", components: [row] });
    }


    //message avec bouton cliquable
    if (message.content === prefix + "click") {
        var row = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("bouton1")
                .setLabel("appuie ici")
                .setStyle("PRIMARY")
                .setEmoji("👉🏻")
            );

        message.channel.send({ content: "__**Appuie sur le bouton :**__", components: [row] });
    }


    //commande help
    if (message.content === prefix + "help") {
        const embed = new Discord.MessageEmbed()
            .setColor("#FBDB60")
            .setTitle("Liste des commandes du bot :")
            .setDescription("- __**ah.help:**__ aperçu des commandes du bot\n - __**ah.ping:**__ vérifie si le bot fonctionne bien\n - __**ah.click:**__ fait apparaître un bouton cliquable mystérieux\n - __**ah.link:**__ fait apparaître un bouton de lien mystérieux\n - __**ah.select:**__ selectionne ton jeu préféré\n - __**ah.avatar:**__ affiche ta photo de profile en grand\n - __**ah.social:**__ affiche tous les réseaux sociaux de AloysH Studio\n - __**ah.invite:**__ obtiens le lien d'invitation du Serveur\n - __**ah.vote:**__ soutien le Serveur en allant voter pour lui\n - __**ah.bienvenue:**__ Souhaite la bienvenue aux nouveaux arrivants")
            .setImage("https://i.imgur.com/ZsvDANj.png")
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    };


    //commande help pour les modérateurs
    if (message.content === prefix + "helpmod") {
        const embed = new Discord.MessageEmbed()
            .setColor("#FBDB60")
            .setTitle("Liste des commandes de modération du bot :")
            .setDescription("- __**ah.helpmod:**__ affiche toutes les commandes de modération\n- __**ah.clear:**__ permet de supprimer des messages\n - __**ah.mute:**__ mute une personne\n - __**ah.unmute:**__ démute une personne\n - __**ah.kick:**__ permet d'expulser une personne\n - __**ah.ban:**__ permet de bannir une personne")
            .setImage("https://i.imgur.com/vADtXpq.png")
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    };


    //commande ping
    if (message.content === prefix + "ping") {
        message.reply("pong !");
    };


    //commande social
    if (message.content === prefix + "social") {
        const embed = new Discord.MessageEmbed()
            .setColor("#FBDB60")
            .setTitle("Réseaux Sociaux de AloysH Studio")
            .setDescription("N'hésitez pas à me suivre sur les différents réseaux sociaux suivants :")
            .setThumbnail("https://i.imgur.com/Ff1WyFZ.jpg")
            .addField("**YOUTUBE**", "[clique ici](https://youtube.com/c/AloysHStudio)", true)
            .addField("**TWITCH**", "[clique ici](https://www.twitch.tv/aloysh_studio)", true)
            .addField("**REDDIT**", "[clique ici](https://www.reddit.com/user/AloysH_Studio)", true)
            .addField("**INSTAGRAM**", "[clique ici](https://www.instagram.com/aloysh_studio/)", true)
            .addField("**SNAPCHAT**", "[clique ici](https://www.snapchat.com/add/aloysh_studio)", true)
            .addField("**TWITTER**", "[clique ici](https://twitter.com/aloysh_studio)", true)
            .setImage("https://i.imgur.com/siw4BHM.png")
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    };


    //commande invite
    if (message.content === prefix + "invite") {
        const embed = new Discord.MessageEmbed()
            .setColor("#FBDB60")
            .setTitle("Invitation Invoquée !")
            .setDescription("Tu viens d'invoquer la ***Sainte Invitation***.\nInvite tes amis sur le Serveur avec cette seule et unique invitation :\nhttps://discord.gg/CkyGYP3psM")
            .setImage("https://i.imgur.com/WMFB47G.png")
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    };


    //commande clear
    if (message.member.permissions.has("MANAGE_MESSAGES")) {
        if (message.content.startsWith(prefix + "clear")) {
            let args = message.content.split(" ");
            console.log('args[1] = ' + args[1]);
            if (!args[1]) {
                message.reply("Nombre de messages non ou mal défini.");
            }
            else {
                let number = parseInt(args[1]);

                if (isNaN(number)) {
                    message.reply("Nombre de messages non ou mal défini.");
                }
                else {
                    message.channel.bulkDelete(number).then(messages => {
                        console.log("Suppression de " + messages.size + " messages réussi !");
                    }).catch(err => {
                        console.log("Erreur de clear: " + err);
                    });
                }
            }
        }
    }


    //commande Bienvenue 1
    if (message.content === prefix + "bienvenue") {
        message.reply("Souhaitons tous la bienvenue aux nouveaux arrivants !");
    };


    //commande Bienvenue 2
    if (message.content === prefix + "bvn") {
        message.reply("Souhaitons tous la bienvenue aux nouveaux arrivants !");
    };


    //commande vote
    if (message.content === prefix + "vote") {
        var row = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setLabel("clique ici")
                .setStyle("LINK")
                .setEmoji("🗳️")
                .setURL("https://serveur-prive.net/discord/aloysh-studio-s-universe-9090/vote")
            );
        const embed = new Discord.MessageEmbed()
            .setColor("#FBDB60")
            .setTitle("Vote pour ton Serveur préféré !")
            .setDescription("Si tu aimes ce Serveur, n'hésite pas à le soutenir en votant pour lui (en cliquant sur le bouton en dessous de ce message).")
            .setThumbnail("https://i.imgur.com/Ff1WyFZ.jpg")
            .setImage("https://i.imgur.com/oxSq26i.png")
            .setTimestamp();

        message.channel.send({ embeds: [embed], components: [row] });
    }


    //commande ban
    if (message.content === prefix + "ban") {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            let mention = message.mentions.members.first();

            if (mention == undefined) {
                message.reply("Membre non ou mal mentionné !");
            }
            else {
                if (mention.bannable) {
                    message.ban();
                    message.channel.send(mention.displayName + " a été banni avec succès !");
                }
                else {
                    message.reply("Impossible de bannir ce membre.");
                }
            }
        }
    }


    //Commande Kick
    else if (message.content.startsWith(prefix + "kick")) {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            let mention = message.mentions.members.first();

            if (mention == undefined) {
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                if (mention.kickable) {
                    mention.kick();
                    message.channel.send(mention.displayName + " a été kick avec succès !");
                }
                else {
                    message.reply("Impossible de kick ce membre.");
                }
            }
        }
    }


    //Commande Mute
    else if (message.content.startsWith(prefix + "mute")) {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            let mention = message.mentions.members.first();

            if (mention == undefined) {
                message.reply("Membre non ou mal mentionné.")
            }
            else {
                mention.roles.add("962835041178775562");
                message.channel.send(mention.displayName + " a été mute avec succès.");
            }
        }
    }


    //Commande Unmute
    else if (message.content.startsWith(prefix + "unmute")) {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            let mention = message.mentions.members.first();

            if (mention == undefined) {
                message.reply("Membre non ou mal mentionné.")
            }
            else {
                mention.roles.remove("962835041178775562");
                message.channel.send(mention.displayName + " a été démute avec succès.");
            }
        }
    }


    //Commande Tempmute
    else if (message.content.startsWith(prefix + "tempmute")) {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            let mention = message.mentions.members.first();

            if (mention == undefined) {
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                let args = message.content.split(" ");

                mention.roles.add("962835041178775562");
                setTimeout(function () {
                    mention.roles.remove("962835041178775562");
                    message.channel.send("<@" + mention.id + "> peut désormais parler de nouveau !");
                }, args[2] * 1000);
            }
        }
    }


    //Commande Avatar
    let mention = message.mentions.users.first() || message.author;

    if(message.content.startsWith(`${prefix}avatar`)){
        let embed = new Discord.MessageEmbed()
            .setTitle(`Avatar de ${mention.tag}`)
            .setImage(mention.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 }))
            .setColor('#FBDB60');

        message.channel.send({ embeds: [embed] });
    }


    //Suggestions
    if (message.channel.id === "706077223362363431") {
        const suggestionEmbed = new Discord.MessageEmbed()
            .setTitle("💡 Suggestion")
            .setDescription(`${message.content}`)
            .setColor("#FBDB60")
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setTimestamp();
            

        await message.delete();
        await message.channel.send({ embeds: [suggestionEmbed] })
            .then(msg => {
                msg.react('✅');
                msg.react('❌');
        });
        return;
    }

    /*
    //Niveaux --> problème = ne fonctionne pas
    xp(message)
    if(message.author.bot) return;
    var user = message.mentions.users.first() || message.author;
    var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
    var currentxp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0;
    var xpNeeded = level * 500 + 500
    const embedlvl = new Discord.MessageEmbed()
    .setTitle(`${user.username}'s Level`)
    .setColor('#FBDB60')
    .addFields(
        { name: 'XP', value: `${currentxp}/${xpNeeded}`, inline: true},
        { name: 'Level', value: `${level}`, inline: true}
    )
    .setThumbnail(user.displayAvatarURL({dynamic: true}))
    message.channel.send(embedlvl)

    function xp(message) {
        if(message.author.Client) return
        const randomNumber = Math.floor(Math.random() * 25) + 50;
        db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber)
        db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)
        var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
        var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
        var xpNeeded = level * 500;
        if(xpNeeded < xp){
            var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1)
            db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
            message.channel.send(`Bravo ${message.author.username}, tu viens d'atteindre le niveau supérieur! Tu es maintenant niveau ${newLevel}`)
        }
    }
    */
});

    
//Tickets --> Message pour créer un ticket
var nbTicket = 0;
Client.on("ready", async => {
    /*var row = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("open-ticket")
                .setLabel("ouvrir un ticket")
                .setStyle("PRIMARY")
            );

    Client.channels.cache.get("695932843943264277").send({content: "**Appuie sur le bouton pour ouvrir un ticket :**", components: [row]});
    */
});











Client.login(process.env.token);