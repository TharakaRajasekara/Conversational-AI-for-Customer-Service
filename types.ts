
export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
  ERROR = 'error',
}

export interface Message {
  role: MessageRole;
  text: string;
}
