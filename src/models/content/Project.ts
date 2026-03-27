/**
 * Represents a Project in the aramizdakioyuncu.com platform.
 */
export class Project {
  id: string = '';
  name: string = '';
  description: string = '';
  status: string = '';
  image: string = '';
  url: string = '';

  constructor(data: Partial<Project>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a Project object from a JSON object.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJSON(json: Record<string, any>): Project {
    return new Project({
      id: json.id || '',
      name: json.name || json.title || '',
      description: json.description || '',
      status: json.status || '',
      image: json.image || json.thumb || '',
      url: json.url || '',
    });
  }
}
