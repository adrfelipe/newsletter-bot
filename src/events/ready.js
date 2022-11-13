const { ActivityType } = require("discord.js");

module.exports = async (client) => {
  await client.user.setStatus("dnd");
  client.application.commands.set(client.commands.map(command => command.data))
    .then(() => console.log(`💠 | [Slash Commands] Comandos carregados em todas guilds.\n`))
    .catch(() => console.log(`🚨 | [Erro] Falha ao carregar os comandos.`))

  
  let botStatus = ["Em desenvolvimento.", "Você é novo aqui?"];
  let botActivity = ActivityType.Playing;

  i = 0;
  setInterval(
    () =>
      client.user.setActivity(`${botStatus[i++ % botStatus.length]}`, {
        type: botActivity[i++ % botActivity.length],
      }),
    2000
  );

  console.log(
    `👥 | [Estatísticas] ${client.guilds.cache.size.toLocaleString()} servidores | ${client.guilds.cache
      .map((g) => g.memberCount)
      .reduce((x, f) => x + f, 0)
      .toLocaleString()} usuários\n🤖 | [Bot] Conectado em ${client.user.tag}.`
  );
  
  console.log(`💠 | [Slash Commands] Iniciando deploy em todas guilds.\n`);
};
