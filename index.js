const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
    ]
});


//préfixe du bot
const prefix = "ah.";


// démarrage du bot
Client.on("ready", async () => {
    
    //Slash Commande Ping
    Client.application.commands.create(data1); //<-- commandes slash pour tous les serveurs, mais prend du temps (environ 1h)
    Client.guilds.cache.get("665602826373693540").commands.create(data1); //<-- commandes pour son propre Serveur, prends peu de temps

    //Slash Commmande Clear
    Client.application.commands.create(data2); //<-- commandes slash pour tous les serveurs, mais prend du temps (environ 1h)
    Client.guilds.cache.get("665602826373693540").commands.create(data2); //<-- commandes pour son propre Serveur, prends peu de temps


    //permet de vérifier le cache des commandes slash
    console.log(Client.application.commands.cache);
    await Client.application.commands.fetch();
    console.log(Client.application.commands.cache);

    Client.application.commands.cache.map(command => {
        command.delete();
    });

    //message de démarrage du bot
    console.log("bot opérationnel !");
});


//Custom Status
Client.on("ready", () => {
    function randomStatus() {
        let status = ["ah.help"] //<-- message de status
        let rstatus = Math.floor(Math.random() * status.length);

        Client.user.setActivity(status[rstatus], {type: "STREAMING", url: "https://www.twitch.tv/aloysh_studio"}); //<-- type de status
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

    Client.channels.cache.get("962776742412550194").send({files: [attachement]});
});


//messages de départ d'une personne sur le Serveur
Client.on("guildMemberRemove", member => {
    console.log("un membre a quitté le Serveur.");
    member.guild.channels.cache.find(channel => channel.id === "962776742412550194").send("<@" + member.id + "> a quitté le Serveur !\nNous sommes désormais **" + member.guild.memberCount + "personnes** sur le Serveur !");
});


//message avec bouton cliquable
Client.on("messageCreate", message => {
    if (message.content === prefix + "click"){
        var row = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("bouton1")
                .setLabel("appuie ici")
                .setStyle("PRIMARY")
                .setEmoji("👉🏻")
            );

        message.channel.send({content: "__**Appuie sur le bouton :**__", components: [row]}); 
    }
});

Client.on("interactionCreate", interaction => {
    if (interaction.isButton()){
        if (interaction.customId === "bouton1"){
            interaction.reply("Ah, tu l'as vraiment fait? espèce de mouton 🐑");
        }
    }
});


//message avec bouton de lien
Client.on("messageCreate", message => {
    if (message.content === prefix + "link"){
        var row = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setLabel("appuie ici")
                .setStyle("LINK")
                .setEmoji("💻")
                .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
            );

        message.channel.send({content: "__**Appuie sur le bouton :**__", components: [row]}); 
    }
});


//message avec menu de sélection
Client.on("messageCreate", message => {
    if (message.content === prefix + "select"){

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

    message.channel.send({content: "__**Choisit un jeu :**__", components: [row]});
            }
});

Client.on("interactionCreate", interaction => {
    if (interaction.isSelectMenu()){
        if (interaction.customId === "select"){
            console.log(interaction.values);

            if (interaction.values == "option 1"){
                interaction.reply({content: "Tu as choisi **Minecraft**.", ephemeral: true});
            }
            else if (interaction.values == "option 2"){
                interaction.reply({content: "Tu as choisi **Fortnite**.", ephemeral: true});
            }
            else if (interaction.values == "option 3"){
                interaction.reply({content: "Tu as choisi **Apex Legends**.", ephemeral: true});
            }
            else if (interaction.values == "option 4"){
                interaction.reply({content: "Tu as choisi **League of Legends**.", ephemeral: true});
            }
            else if (interaction.values == "option 5"){
                interaction.reply({content: "Tu as choisi **Among Us**.", ephemeral: true});
            }
            else if (interaction.values == "option 6"){
                interaction.reply({content: "Tu as choisi **Autre**.", ephemeral: true});
            }
        }
    }
});


//slash commande ping
const data1 = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("renvoie pong")
    .addUserOption(option => option
        .setName("utilisateur")
    .setDescription("utilisateur que vous souhaitez mentionner")
    .setRequired(false));
    
Client.on("interactionCreate", interaction => { // <-- permet d'effectuer la commandes slash ping
    if (interaction.isCommand()){
        if (interaction.commandName === "ping"){
            let user = interaction.options.getUser("utilisateur");

            //permet de mentionner une personne en effectuant la commande ping
            if (user != undefined){
                interaction.reply("pong <@" + user.id + ">");
            }
            else {
                interaction.reply("pong");
            }
        }
    }
    
});


Client.on("messageCreate", message =>{
    if (message.author.bot) return; // <-- permet au bot de répondre aux commandes.


     //commande help
     if (message.content === prefix + "help"){
        const embed = new Discord.MessageEmbed()
        .setColor("#FBDB60")
        .setTitle("Liste des commandes du bot :")
        .setDescription("- __ah.help:__ aperçu des commandes du bot\n - __ah.ping:__ vérifie si le bot fonctionne bien\n - __ah.click:__ fait apparaître un bouton cliquable mystérieux\n - __ah.link:__ fait apparaître un bouton de lien mystérieux\n - __ah.select:__ selectionne ton jeu préféré\n - __ah.social:__ affiche tous les réseaux sociaux de AloysH Studio\n - __ah.invite:__ obtiens le lien d'invitation du Serveur\n - __ah.vote:__ soutien le Serveur en allant voter pour lui\n - __ah.bienvenue:__ Souhaite la bienvenue aux nouveaux arrivants")
        .setImage("https://i.imgur.com/ZsvDANj.png")
        .setTimestamp();

        message.channel.send({ embeds: [embed]});
    };


    //commande help pour les modérateurs
    if (message.content === prefix + "helpmod"){
        const embed = new Discord.MessageEmbed()
        .setColor("#FBDB60")
        .setTitle("Liste des commandes de modération du bot :")
        .setDescription("- __ah.clear:__ permet de supprime des messages\n - __ah.mute:__ mute une personne\n - __ah.unmute:__ démute une personne\n - __ah.kick:__ permet d'expulser une personne\n - __ah.ban:__ permet de bannir une personne")
        .setImage("https://i.imgur.com/vADtXpq.png")
        .setTimestamp();

        message.channel.send({ embeds: [embed]});
    };


    //commande ping
    if (message.content === prefix + "ping"){
        message.reply("pong !");
    };


//commande social
if (message.content === prefix + "social"){
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

    message.channel.send({ embeds: [embed]});
};


//commande invite
if (message.content === prefix + "invite"){
    const embed = new Discord.MessageEmbed()
    .setColor("#FBDB60")
    .setTitle("Invitation Invoquée !")
    .setDescription("Tu viens d'invoquer la ***Sainte Invitation***.\nInvite tes amis sur le Serveur avec cette seule et unique invitation :\nhttps://discord.gg/CkyGYP3psM")
    .setImage("https://i.imgur.com/WMFB47G.png")
    .setTimestamp();

    message.channel.send({ embeds: [embed]});
};


//commande clear
if(message.member.permissions.has("MANAGE_MESSAGES")){
    if(message.content.startsWith(prefix + "clear")){
        let args = message.content.split(" ");
        console.log('args[1] = ' + args[1]);
        if(!args[1]){
            message.reply("Nombre de messages non ou mal défini.");
        }
        else {
            let number = parseInt(args[1]);

            if (isNaN(number)){
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
if (message.content === prefix + "bienvenue"){
    message.reply("Souhaitons tous la bienvenue aux nouveaux arrivants !");
};


//commande Bienvenue 2
if (message.content === prefix + "bvn"){
    message.reply("Souhaitons tous la bienvenue aux nouveaux arrivants !");
};
});


//Slash commande clear
const data2 = new SlashCommandBuilder()
    .setName("clear")
    .setDescription("permet de supprimer des messages rapidement")
    .addIntegerOption(option =>
        option.setName("number")
            .setDescription("Nombre de messages que vous voulez supprimer")
            .setRequired(true)
    );

Client.on("interactionCreate", interaction => {
    if(interaction.isCommand()){
        if(interaction.commandName === "clear"){
            var number = interaction.options.getInteger("number")

            if(number >= 2 && number <= 100){
                interaction.channel.bulkDelete(number);
                interaction.reply({content: number + " messages correctement supprimés", ephemeral: true});
            }
            else {
                interaction.reply({content: "Le nombre de messages supprimés doit être compris entre 2 et 100.", ephemeral: true});
            }
        }
    }
});


//Commande Vote
Client.on("messageCreate", message => {
    if (message.content === prefix + "vote"){
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

        message.channel.send({ embeds: [embed], components: [row]});
    }
});


//Commande Ban
Client.on("messageCreate", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.member.permissions.has("ADMINISTRATOR")){
        if (message.content === prefix + "social"){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné !");
            }
            else {
                if(mention.bannable){
                    message.ban();
                    message.channel.send(mention.displayName + " a été banni avec succès !");
                }
                else {
                    message.reply("Impossible de bannir ce membre.");
                }
            }
        }
        //Commande Kick
        else if (message.content.startsWith (prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                if(mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + " a été kick avec succès !");
                }
                else {
                    message.reply("Impossible de kick ce membre.");
                }
            }
        }
        //Commande Mute
        else if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.")
            }
            else {
                mention.roles.add("962835041178775562");
                message.channel.send(mention.displayName + " a été mute avec succès.");
            }
        }
        //Commande Unmute
        else if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.")
            }
            else {
                mention.roles.remove("962835041178775562");
                message.channel.send(mention.displayName + " a été démute avec succès.");
            }
        }
        //Commande Tempmute
        else if(message.content.startsWith(prefix + "tempmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                let args = message.content.split(" ");

                mention.roles.add("962835041178775562");
                setTimeout(function() {
                    mention.roles.remove("962835041178775562");
                    message.channel.send("<@" + mention.id + "> peut désormais parler de nouveau !");
                }, args[2] * 1000);
            }
        }
    }
});

















































Client.login(process.env.TOKEN);