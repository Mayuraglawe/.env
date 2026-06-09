export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Solved' | 'Todo';
  acceptance: string;
  description: string;
  requirements: string[];
  constraints: string[];
}

export const PROBLEMS: Problem[] = [
  {
    id: '1',
    title: 'Design URL Shortener',
    difficulty: 'Easy',
    status: 'Solved',
    acceptance: '65%',
    description: 'Design a service like bit.ly that takes a long URL and generates a short, unique alias. When users visit the short alias, they should be redirected to the original long URL.',
    requirements: [
      'Generate a short and unique alias for a given URL.',
      'Redirect users to the original URL when they visit the short alias.',
      'The short URL should be as short as possible.',
      'Links will expire after a standard default timespan.'
    ],
    constraints: [
      'Traffic: 100 million new URLs generated per day.',
      'Read/Write ratio: 10:1 (1 billion redirects per day).',
      'The service must be highly available.',
      'URL redirection should happen in real-time with minimal latency.'
    ]
  },
  {
    id: '2',
    title: 'Design Rate Limiter',
    difficulty: 'Medium',
    status: 'Todo',
    acceptance: '45%',
    description: 'Design an API Rate Limiter that restricts the number of requests a client can make to a service within a given time window.',
    requirements: [
      'Limit requests per user ID or IP address.',
      'Allow custom rate limiting rules per API endpoint.',
      'Return HTTP 429 (Too Many Requests) when a client exceeds the limit.'
    ],
    constraints: [
      'Must handle extremely high throughput (10M requests per second).',
      'Must add minimal latency to the API requests.',
      'Should work efficiently in a distributed environment.'
    ]
  },
  {
    id: '3',
    title: 'Design Twitter',
    difficulty: 'Hard',
    status: 'Todo',
    acceptance: '32%',
    description: 'Design a social media platform similar to Twitter where users can post tweets, follow other users, and view a timeline of tweets from users they follow.',
    requirements: [
      'Users can post tweets (text and media).',
      'Users can follow/unfollow other users.',
      'Users have a home timeline displaying recent tweets from followees.'
    ],
    constraints: [
      'DAU: 300 Million.',
      'Reads heavily outnumber writes (100:1 read/write ratio).',
      'Fast timeline generation is critical (must render < 200ms).'
    ]
  }
];

export const getProblemById = (id: string | undefined): Problem | undefined => {
  return PROBLEMS.find(p => p.id === id);
};
