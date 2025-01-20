import mongoose from 'mongoose';

const CallSchema = new mongoose.Schema({
  caller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'ongoing', 'ended'],
    default: 'pending',
  },
  startTime: Date,
  endTime: Date,
}, { timestamps: true });

const Call = mongoose.model('Call', CallSchema);
export default Call; 