export class ArmoyuEvent {
  id: string = '';
  title: string = '';
  status: string = '';
  banner: string = '';
  date: string = '';
  location: string = '';
  participantLimit: number = 0;
  currentParticipants: number = 0;
  description: string = '';
  rules: string[] = [];
  admins: any[] = [];
  game: string = '';
  rewards: string = '';
  isHot: boolean = false;
  isLive: boolean = false;
  participants: any[] = []; // Array of participant objects/users
  participationType: 'INDIVIDUAL' | 'GROUP' | 'BOTH' = 'INDIVIDUAL'; 

  constructor(data: Partial<ArmoyuEvent>) {
    Object.assign(this, data);
  }

  static fromJSON(json: any): ArmoyuEvent {
    return new ArmoyuEvent(json);
  }
}
