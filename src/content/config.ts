import { defineCollection, z } from 'astro:content';

  const articlesCollection = defineCollection({
    type: 'content',  // This means it's markdown/MDX
    schema: z.object({
      // Required fields
      title: z.string(),
      description: z.string(),

      // Article type - must be one of these values
      type: z.enum(['city', 'niche', 'guide', 'case-study']),

      // Optional fields (notice .optional())
      city: z.string().optional(),
      region: z.string().optional(),

      // Array of strings for keywords
      keywords: z.array(z.string()),

      // Nested object for hero section
      hero: z.object({
        title: z.string(),
        subtitle: z.string(),
        cta_text: z.string().default('Solicită Consultanță'),
      }),

      // Optional array of case studies
      case_studies: z.array(z.object({
        business: z.string(),
        niche: z.string(),
        result: z.string(),
      })).optional(),

      // Dates - using coerce to convert strings to dates
      published_date: z.coerce.date(),
      updated_date: z.coerce.date().optional(),

      // Boolean with default value
      featured: z.boolean().default(false),
    }),
  });

  // Export collections - Astro uses this
  export const collections = {
    articles: articlesCollection,
  };