/**
 * Represents a Game Mod (Oyun Modu) in the aramizdakioyuncu.com platform.
 */
export class Mod {
  id: string = '';
  name: string = '';
  game: string = '';
  version: string = '';
  author: string = '';
  downloads: string = '';
  image: string = '';
  isFeatured: boolean = false;

  constructor(data: Partial<Mod>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a Mod object from a JSON object.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJSON(json: Record<string, any>): Mod {
    return new Mod({
      id: json.id || '',
      name: json.name || json.title || '',
      game: json.game || '',
      version: json.version || '',
      author: json.author || '',
      downloads: json.downloads || '0',
      image: json.image || '',
      isFeatured: json.isFeatured || false,
    });
  }
}
