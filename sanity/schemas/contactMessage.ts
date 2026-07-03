import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactMessage',
  title: 'Contact Message',
  type: 'document',
  // Read-only document — populated by the contact form API route
  fields: [
    defineField({ name: 'name',        title: 'Name',         type: 'string'   }),
    defineField({ name: 'email',       title: 'Email',        type: 'string'   }),
    defineField({ name: 'subject',     title: 'Subject',      type: 'string'   }),
    defineField({ name: 'message',     title: 'Message',      type: 'text', rows: 6 }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'subject' },
    prepare({ title, subtitle }: any) {
      return { title: title ?? '(no name)', subtitle: subtitle ?? '' }
    },
  },
})
