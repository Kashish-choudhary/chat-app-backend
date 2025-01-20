import Call from '../models/call.js';

export const startVideoCall = async (req, res) => {
  try {
    const { callerId, receiverId } = req.body;
    const caller = await User.findById(callerId);
    const receiver = await User.findById(receiverId);

    if (!caller || !receiver) {
      return res.status(404).json({ message: "Caller or Receiver not found" });
    }

    const newCall = new Call({
      caller: callerId,
      receiver: receiverId,
      status: 'pending'
    });
    await newCall.save();

    // Emit socket event to notify receiver
    req.app.get('io').to(receiver.socketId).emit('incomingCall', { callId: newCall._id, caller: caller.username });
    res.status(200).json({ callId: generatedCallId });
    // res.json({ message: "Call initiated", callId: newCall._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const answerCall = async (req, res) => {
  try {
    const { callId } = req.body;
    const call = await Call.findByIdAndUpdate(callId, { status: 'ongoing' }, { new: true });
    
    if (!call) {
      return res.status(404).json({ message: "Call not found" });
    }

    // Emit socket event to notify caller
    req.app.get('io').to(call.caller.socketId).emit('callAnswered', { callId });

    res.json({ message: "Call answered" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const endCall = async (req, res) => {
  try {
    const { callId } = req.body;
    const call = await Call.findByIdAndUpdate(callId, { status: 'ended' }, { new: true });
    
    if (!call) {
      return res.status(404).json({ message: "Call not found" });
    }

    // Emit socket event to notify both parties
    req.app.get('io').to(call.caller.socketId).to(call.receiver.socketId).emit('callEnded', { callId });

    res.json({ message: "Call ended" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};