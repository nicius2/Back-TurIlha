import { app } from "./app";
import { env } from "./env";

const PORT = env.PORT;

app.listen(PORT, () => {
     console.log(` 🔥 Server is running with success `)
     console.log(` 🚀  Server listening on port http://localhost:${PORT} `)
})