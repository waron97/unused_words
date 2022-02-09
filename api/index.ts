import app from "./app";

require("dotenv").config();

app.listen(process.env.PORT ?? 3000, () =>
  console.log("Server listening on port 3000")
);
