import fastify from "fastify";  
import { profileRoutes } from "../routes/profileroutes";


const app = fastify();

app.register(profileRoutes, {
    prefix: "/api",
});


app.listen({
    port: 3000,
})