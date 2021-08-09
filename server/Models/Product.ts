import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price?: string;
  description?: string;
  strongPoints?: string[];
  whoKind?: string[];
  whoType?: string[];
  occasions?: string[];
  parties?: string[];
  urlAmazon?: string;
  imagesFolder?: string;
  createdAt?: Date;
  editedAt?: Date;
  visits?: number;
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: String, default: "€" },
  description: String,
  strongPoints: Array,
  whoKind: Array,
  whoType: Array,
  occasions: Array,
  parties: Array,
  urlAmazon: String,
  imagesFolder: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  editedAt: { type: Date, default: Date.now },
  visits: { type: Number, default: 0 }
});

export default mongoose.model<IProduct>("Product", productSchema);
