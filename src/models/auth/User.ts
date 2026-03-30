import { Role } from './Role';
import { Chat } from '../social/Chat';
import { Notification } from '../social/Notification';
import { NotificationSender } from '../social/NotificationSender';

/**
 * Represents a User in the aramizdakioyuncu.com platform.
 */
export class User {
  id: string = '';
  username: string = '';
  displayName: string = '';
  avatar: string = '';
  banner: string = '';
  bio: string = '';
  role: Role | null = null;
  verified: boolean = false;
  level: number = 1;
  xp: number = 0;
  popScore: number = 0;
  groups: any[] = []; 
  chatList: Chat[] = [];
  friends: User[] = [];
  myPosts: any[] = []; // Use any[] temporarily to avoid circular dependency issues during initialization if needed, or import Post properly
  notifications: Notification[] = []; // Notification list

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }

  /**
   * Returns the absolute URL to the user's profile page.
   */
  getProfileUrl(): string {
    return `/oyuncular/${this.username}`;
  }

  /**
   * Converts the user to a standardized notification sender.
   */
  toNotificationSender(): NotificationSender {
    return new NotificationSender({
      id: this.id,
      name: this.displayName,
      avatar: this.avatar,
      type: 'USER',
      url: this.getProfileUrl()
    });
  }

  /**
   * Instantiates a User object from a JSON object.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJSON(json: Record<string, any>): User {
    return new User({
      id: json.id || json.id_user || '',
      username: json.username || '',
      displayName: json.displayName || json.name || json.username || '',
      avatar: json.avatar || json.avatar_url || '',
      banner: json.banner || json.banner_url || 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2574&auto=format&fit=crop',
      bio: json.bio || '',
      role: json.role ? Role.fromJSON(json.role) : null,
      verified: json.verified || false,
      level: json.level || json.user_level || 1,
      xp: json.xp || json.experience || 0,
      popScore: json.popScore || 0,
      groups: json.groups || [],
      chatList: Array.isArray(json.chatList) ? json.chatList.map((c: any) => Chat.fromJSON(c)) : [],
      friends: Array.isArray(json.friends) ? json.friends.map((f: any) => {
        // Shallow conversion to avoid infinite recursion
        if (f instanceof User) return f;
        return new User({
          id: f.id || f.id_user || '',
          username: f.username || '',
          displayName: f.displayName || f.name || f.username || '',
          avatar: f.avatar || f.avatar_url || '',
          role: f.role ? Role.fromJSON(f.role) : null,
          verified: f.verified || false,
          level: f.level || 1
        });
      }) : [],
      notifications: Array.isArray(json.notifications) ? json.notifications.map((n: any) => Notification.fromJSON(n)) : [],
    });
  }
}
