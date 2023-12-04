// types.ts (located in the appropriate directory)

export interface Post {
    id: number;
    title: string;
    link: string;
    description: string;
    creator: number;
    subgroup: string;
    timestamp: number;
    votes: number; // Make sure this is included
  }
  