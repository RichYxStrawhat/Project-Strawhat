const {Client} = require('discord.js'),
    client = new Client;

const { MessageEmbed, Collection, Intents } = require('discord.js');

client.login("ENTER YOUR BOT TOKEN")

client.on('ready', async () => {
    console.log(`CONNECTED TO ${client.user.tag} | THANKS FOR USING PROJECT STRAWHAT`)
})

const Discord = require('discord.js');
// enter your prefix here!!!
let prefix = 'ENTER YOUR PREFIX HERE';

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/);
	const command = args.shift().toLowerCase();
    const userCount = client.guilds.cache.map((guild) => guild.memberCount).reduce((p, c) => p + c, 0);

	if (command === 'ping') {
		let ping = Math.round(message.client.ws.ping);


		let seconds = Math.floor(message.client.uptime / 1000);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		let days = Math.floor(hours / 24);

		seconds %= 60;
		minutes %= 60;
		hours %= 24;

		let embed = new Discord.MessageEmbed()
			.setColor('00C8FF')
                        .setThumbnail('https://cdn.discordapp.com/attachments/860898390111551498/865991782687834112/richygif.gif')
			.addField(`Ping :`, `__**${ping}ms**__`)
			.setFooter(
				`STRAWHAT ANTI BOT-ADD TOOL!`
			);

		message.channel.send(embed);
	}
});


client.on("guildMemberAdd", async (member) => {

    const eventsTimestamp = Date.now().toString()

    const FetchingLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: "BOT_ADD",
    }).catch((err) => {
        return console.log("AUDIT LOG ERROR!!!")
    });

    if (!FetchingLogs) return console.log("[Entries Error] Unable to fetch Entries.");

    const botAddLog = FetchingLogs.entries.first();

    if (!botAddLog) {
        return console.log(`unable to fetch audit log!!!`);
    } else {

        console.log(("banned"))

        const { executor, target, createdAt, createdTimestamp } = botAddLog;

        console.log("EXECUTING");
        const successfulBan = new MessageEmbed()
            .setThumbnail('https://cdn.discordapp.com/attachments/860898390111551498/865991782687834112/richygif.gif')
            .setDescription(`**Bot Added By:** ${executor.tag} \n**Bot Name:** ${target.tag} \n**Action:** Ban.`)
            .setColor(0x47ff00)
            .setTimestamp(Date.now());
        const LogTimeString = createdTimestamp.toString();
        const EventExecution = eventsTimestamp;

        const logtime = LogTimeString.slice(0, -3);
        const eventtime = EventExecution.slice(0, -3);

        const logtime2 = LogTimeString.slice(0, -4);
        const eventtime2 = EventExecution.slice(0, -4);

        if (logtime === eventtime) {
            if (executor.id === client.user.id) return console.log("ALLOWED")
            if (executor.id === member.guild.owner.id) return console.log("ALLOWED")
            if (target.bot) {
                member.guild.members.ban(executor.id, {
                    reason: `Nigga Was Adding Bot`
                }).then(member.guild.owner.send(successfulBan).catch((err) => {
                    return console.log("[Owner]: " + member.guild.owner.user.tag);
                })).then(member.guild.members.ban(target.id, {
                    reason: "Nigga Was Adding Bot"
                }).then(() => {
                    console.log("TRYING");
                })).catch((err) => {
                    return console.log("TRYING");
                });
            }
        } else if (logtime2 === eventtime2) {
            console.log(`[Event Validity #2]: True`)
            if (executor.id === client.user.id) return console.log(`[Action Type]:Authorised`);
            if (executor.id === member.guild.owner.id) return console.log(`[Action Type]: AUTHORISED`);
            if (target.bot) {
                member.guild.members.ban(executor.id, {
                    reason: `Nigga Was Adding Bot`
                }).then(member.guild.owner.send(successfulBan))
                    .then(member.guild.members.ban(target.id, {
                        reason: "Nigga Was Adding Bot"
                    }).then(() => {
                        console.log("[Action]: Ban")
                    })).catch((err) => {
                        return console.log("[Trial]: False")
                    });
            }
        } else {
            return console.log(`[Event Validity]: False`)
        }
    }

});
