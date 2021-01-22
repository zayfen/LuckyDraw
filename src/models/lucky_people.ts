import { Model, Schema, model, Document } from 'mongoose'

export interface LuckyPeopleDocument extends Document {
  session: string,
  luckId: string,
  users: Array<string>
}

const LuckyPeopleSchema: Schema= new Schema({
  session: { type: Schema.Types.String, required: true },
  luckId: { type: Schema.Types.String, required: true },
  users: { type: Schema.Types.Array, required: true, default: [] }
})

LuckyPeopleSchema.index({ session: 1, luckId: 1 }, { unique: true })

export const LuckyPeopleModel: Model<LuckyPeopleDocument> = model('LuckyPeople', LuckyPeopleSchema)
