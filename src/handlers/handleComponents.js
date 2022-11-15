const { readdirSync } = require("fs");

module.exports = async (client) => {
    const componentsFolder =  readdirSync('./src/components')

    for (const folder of componentsFolder) {
      const componentsFiles = readdirSync(`./src/components/${folder}`)
        .filter((file) => file.endsWith(".js"));

      switch (folder) {
        case "selectMenus":
          for (const file of componentsFiles) {
            const menu = require(`../components/${folder}/${file}`);
            client.selectMenus.push(menu)
            console.log(`📕 | [Select Menus] ${menu.data.name} carregado.`)
          }
          break;

        default:
          break;
      }
    }
};