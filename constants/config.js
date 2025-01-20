const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

const CHATTU_TOKEN = "chattu-token";

export { corsOptions, CHATTU_TOKEN };
