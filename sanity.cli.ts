import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'dd2wc1hr',
    dataset:   'production',
  },
  studioHost: 'cochin-snacks', // becomes https://cochin-snacks.sanity.studio
})
