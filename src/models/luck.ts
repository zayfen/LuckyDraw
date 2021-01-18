import { Model, Schema, model, Document } from 'mongoose'

export interface LuckDocument extends Document {
  session: string,
  luckId: string,
  prizes: Array<string>,
  count: Number
}

const LuckSchema: Schema= new Schema({
  session: { type: Schema.Types.String, required: true },
  luckId: { type: Schema.Types.Number, required: true, auto: true },
  prizes: { type: Schema.Types.Array, required: true },
  count: { type: Schema.Types.Number, required: false, default: 1 }
})

LuckSchema.index({ session: 1, luckId: 1 }, { unique: true })

export const LuckModel: Model<LuckDocument> = model('Luck', LuckSchema)
