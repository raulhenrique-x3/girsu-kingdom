import app from "./index";
import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
