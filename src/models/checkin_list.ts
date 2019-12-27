import { Schema, Model, model, Document } from 'mongoose'

export interface CheckinListDocument extends Document {
  users: string[],
  session: string
}

const CheckinListSchema: Schema= new Schema({
  users: { type: [String], required: true },
  session: { type: Schema.Types.String, required: true, unique: true },
})

CheckinListSchema.index({ session: 1 }, { unique: true })

export const CheckinListModel: Model<CheckinListDocument> = model('CheckinList', CheckinListSchema)
