module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`🛠️  Logado como ${client.user.tag}!`);
    client.handleCommands();
  }
}