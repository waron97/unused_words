export const getMongoUrl = () => {
  const username = process.env.MONGO_USERNAME;
  const password = process.env.MONGO_PASSWORD;
  return `mongodb+srv://${username}:${password}@cluster0.wrosh.mongodb.net/words?retryWrites=true&w=majority`;
};
