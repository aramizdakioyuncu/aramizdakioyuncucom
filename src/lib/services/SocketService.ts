import { io, Socket } from 'socket.io-client';

export type SocketEvent = 'message' | 'status' | 'typing' | 'notification' | 'post' | 'post_like' | 'post_repost_count' | 'connect' | 'disconnect';

/**
 * A production-ready WebSocket service for the aramizdakioyuncu.com platform.
 * Connects to the standalone armoyu-socket-server on port 3001.
 */
class SocketService {
  private socket: Socket | null = null;
  public isConnected: boolean = false;
  private listeners: Map<SocketEvent, ((data: any) => void)[]> = new Map();

  constructor() {
    // We only initialize on the client side
    if (typeof window !== 'undefined') {
      this.connect();
    }
  }

  private connect() {
    console.log('[SocketService] Connecting to real socket server...');
    
    // Connect to the standalone server
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'https://socket.armoyu.com';
    this.socket = io(socketUrl, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 10
    });

    this.socket.on('connect', () => {
      console.log('[SocketService] Connected to server! ID:', this.socket?.id);
      this.isConnected = true;
      this.emitInternal('connect', { status: 'online', socketId: this.socket?.id });
    });

    this.socket.on('disconnect', () => {
      console.log('[SocketService] Disconnected from server.');
      this.isConnected = false;
      this.emitInternal('disconnect', { status: 'offline' });
    });

    // Proxy all incoming events from the real socket to our internal event bus
    const events: SocketEvent[] = ['message', 'typing', 'notification', 'status', 'post', 'post_like', 'post_repost_count'];
    events.forEach(event => {
      this.socket?.on(event, (data: any) => {
        console.log(`[SocketService] Incoming event: ${event}`, data);
        this.emitInternal(event, data);
      });
    });
  }

  /**
   * Internal event bus for React context synchronization
   */
  private emitInternal(event: string, data: any) {
    const eventListeners = this.listeners.get(event as SocketEvent) || [];
    eventListeners.forEach(callback => callback(data));
  }

  /**
   * Subscribe to a socket event
   */
  on(event: SocketEvent, callback: (data: any) => void): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);

    // If already connected and someone listens for 'connect', fire it immediately
    if (event === 'connect' && this.isConnected) {
      callback({ status: 'online', socketId: this.socket?.id, alreadyConnected: true });
    }

    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(event) || [];
      this.listeners.set(event, callbacks.filter(cb => cb !== callback));
    };
  }

  /**
   * Emit an event to the real socket server
   */
  emit(event: SocketEvent, data: any) {
    if (this.socket && (this.isConnected || this.socket.connected)) {
      console.log(`[SocketService] Emitting ${event}:`, data);
      this.socket.emit(event, data);
    } else {
      console.warn(`[SocketService] Cannot emit ${event}, socket not connected.`, {
        socketExists: !!this.socket,
        isConnectedState: this.isConnected,
        socketStatus: this.socket?.connected
      });
    }
  }
}

export const socketService = new SocketService();
