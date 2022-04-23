// type Commands = keyof typeof COMMANDS

import { CacheType, CommandInteraction } from 'discord.js'
import axios from 'axios'
import { COMMANDS } from './commands'

type SwitchMap = (interaction: CommandInteraction<CacheType>) => {
  [s: string]: () => Promise<void | any>
}

export const switchMap: SwitchMap = (interaction: CommandInteraction<CacheType>) => ({
  [COMMANDS.PING]: () => interaction.reply('Pong!'),
  [COMMANDS.SERVER]: () =>
    interaction.reply(
      `Server name: ${interaction?.guild?.name}\nTotal members: ${interaction?.guild?.memberCount}`
    ),
  [COMMANDS.USER]: () => interaction.reply('No'),
  [COMMANDS.KANYE]: async () => {
    const data = await axios.get('https://api.kanye.rest/').then(({ data }) => data)
    return interaction.reply(data.quote)
  },
  [COMMANDS.ACTIVITY]: async () => {
    const data = await axios.get('https://www.boredapi.com/api/activity/').then(({ data }) => data)
    return interaction.reply(data.activity)
  },
  [COMMANDS.DAD_JOKE]: async () => {
    const data = await axios
      .get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } })
      .then(({ data }) => data)
    return interaction.reply(data.joke)
  },
  [COMMANDS.GEEK_JOKE]: async () => {
    const data = await axios
      .get('https://geek-jokes.sameerkumar.website/api?format=json')
      .then(({ data }) => data)
    return interaction.reply(data.joke)
  },
  [COMMANDS.TRUMP]: async () => {
    const data = await axios.get('https://api.tronalddump.io/random/quote').then(({ data }) => data)
    return interaction.reply(data.value)
  },
})