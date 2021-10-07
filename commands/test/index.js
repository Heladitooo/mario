const response = async (interaction) => {
    await interaction.reply(`Woa!, respondi en ${Date.now() - interaction.createdTimestamp} ms :red_circle:  `);
}

module.exports = response;
