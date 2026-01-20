import { app } from "./app";
import { env } from "./config/env";

const { port } = env()

async function bootstrap() {
    try {
        app.listen(port, () => {
            console.log("Servido rondado na porta: ", port)
        })
    } catch (err) {
        console.error("Error ao iniciar servidor: ", err)
    }
}

bootstrap();