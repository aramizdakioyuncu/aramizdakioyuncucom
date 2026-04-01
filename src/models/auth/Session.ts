import { User } from './User';
import { CartItem } from '../shop/CartItem';

export class Session {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null; // Timestamp
  cart: CartItem[];

  constructor(data: Partial<Session>) {
    this.user = data.user || null;
    this.token = data.token || null;
    this.refreshToken = data.refreshToken || null;
    this.expiresAt = data.expiresAt || null;
    this.cart = data.cart || [];
  }

  /**
   * Checks if the session is still valid based on the expiration timestamp.
   */
  isValid(): boolean {
    if (!this.token || !this.expiresAt) return false;
    return Date.now() < this.expiresAt;
  }

  /**
   * Static factory for creating a Session instance from a JSON object.
   */
  static fromJSON(json: any): Session {
    return new Session({
      user: json.user ? User.fromJSON(json.user) : null,
      token: json.token || json.jwt_token || null,
      refreshToken: json.refreshToken || json.refresh_token || null,
      expiresAt: json.expiresAt || json.expires_at || (Date.now() + 3600 * 1000), // Default 1 hour
      cart: Array.isArray(json.cart) ? json.cart.map((i: any) => CartItem.fromJSON(i)) : [],
    });
  }
}
