import fastify from "fastify";  
import { profileRoutes } from "../routes/profileroutes";


const app = fastify();

app.register(profileRoutes, {
    prefix: "/api",
});


app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3000
})