import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  readonly name: string;
  readonly email: string;
  readonly bio?: string;
  readonly avatar?: string;
  readonly hashed_password: string;
  readonly following: Array<Schema.Types.ObjectId>;
  readonly follower: Array<Schema.Types.ObjectId>;
  readonly created: string;
  readonly updated: string;
}
