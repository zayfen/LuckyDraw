import { Schema, Model, model, Document } from 'mongoose'

export interface UserDocument extends Document {
  user: string,
  avatar: string,
  session: string
}

const UserSchema: Schema= new Schema({
  user: { type: Schema.Types.String, required: true },
  avatar: { type: Schema.Types.String, required: true },
  session: { type: Schema.Types.String, required: true },
  sid: { type: Schema.Types.String, required: true, unique: true }
})

UserSchema.index({ sid: 1 }, { unique: true })

export const UserModel: Model<UserDocument> = model('User', UserSchema)
