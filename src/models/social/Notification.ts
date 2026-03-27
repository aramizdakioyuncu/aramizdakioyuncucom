import { User } from '../auth/User';

export type NotificationType = 'like' | 'comment' | 'friend_request' | 'mention' | 'system' | 'group_invite';

/**
 * Represents a Notification in the aramizdakioyuncu.com platform.
 */
export class Notification {
  id: string = '';
  type: NotificationType = 'system';
  title: string = '';
  message: string = '';
  sender: User | null = null;
  link: string = '';
  isRead: boolean = false;
  createdAt: string = '';

  constructor(data: Partial<Notification>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a Notification object from a JSON object.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJSON(json: Record<string, any>): Notification {
    return new Notification({
      id: json.id || '',
      type: json.type || 'system',
      title: json.title || '',
      message: json.message || '',
      sender: json.sender ? User.fromJSON(json.sender) : null,
      link: json.link || '',
      isRead: json.isRead || false,
      createdAt: json.createdAt || json.created_at || '',
    });
  }
}
