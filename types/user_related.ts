export interface User {
    __v: number; // Version key (Mongoose-specific)
    _id: string; // Unique identifier (ObjectId as string)
    balance: number; // User's balance
    email: string; // User's email address
    points: number; // User's points
    username: string; // User's username
  }