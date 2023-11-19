import { type MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://hangman.mehdibb.ir',
      lastModified: new Date('2023-11-19T21:39:19+00:00'),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: 'https://hangman.mehdibb.ir/leaderboard',
      lastModified: new Date('2023-11-19T21:39:19+00:00'),
      changeFrequency: 'always',
      priority: 0.8,
    },
  ];
}
