import app from "./app.js";
import { PORT } from "./config/db.js";

app.listen(PORT);
console.log(`Server on port http://localhost:${PORT}`);