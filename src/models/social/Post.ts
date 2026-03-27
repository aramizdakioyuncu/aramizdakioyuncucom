import { User } from '../auth/User';

export interface PostMedia {
  type: 'image' | 'video';
  url: string;
}

export interface PostStats {
  likes: number;
  comments: number;
  reposts: number;
  shares: number;
}

/**
 * Represents a Post (Gönderi/Paylaşım) in the aramizdakioyuncu.com platform.
 */
export class Post {
  id: string = '';
  author: User | null = null;
  content: string = '';
  media: PostMedia[] = [];
  createdAt: string = '';
  stats: PostStats = { likes: 0, comments: 0, reposts: 0, shares: 0 };
  hashtags: string[] = [];

  constructor(data: Partial<Post>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a Post object from a JSON object.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJSON(json: Record<string, any>): Post {
    return new Post({
      id: json.id || '',
      author: json.author ? User.fromJSON(json.author) : null,
      content: json.content || '',
      media: Array.isArray(json.media) ? json.media : (json.imageUrl ? [{ type: 'image', url: json.imageUrl }] : []),
      createdAt: json.createdAt || json.created_at || '',
      stats: json.stats || {
        likes: json.likeCount || 0,
        comments: json.commentCount || 0,
        reposts: json.repostCount || 0,
        shares: json.shareCount || 0,
      },
      hashtags: json.hashtags || [],
    });
  }
}
