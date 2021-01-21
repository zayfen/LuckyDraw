import { Model, Schema, model, Document } from 'mongoose'

export interface LuckDocument extends Document {
  session: string,
  prizes: string,
  count: number,
  startTime: number,
  uid: string,
  finished: boolean
}

const LuckSchema: Schema= new Schema({
  session: { type: Schema.Types.String, required: true },
  prizes: { type: Schema.Types.String, required: true },
  count: { type: Schema.Types.Number, required: false, default: 1 },
  startTime: { type: Schema.Types.Number, required: true },
  uid: { type: Schema.Types.String, required: true, unique: true },
  finished: { type: Schema.Types.Boolean, required: false, default: false }
})

LuckSchema.index({ uid: 1 }, { unique: true })

export const LuckModel: Model<LuckDocument> = model('Luck', LuckSchema)
