export default {
  name: 'country',
  title: 'Country',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Country Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'flag',
      title: 'Flag Emoji',
      type: 'string',
      description: 'Emoji representation of the flag',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Used for sorting the countries in the marquee',
      initialValue: 0,
    },
  ],
}
