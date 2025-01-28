import { FastifyInstance } from "fastify";
import { prismaClient } from "../prisma";
import {z} from "zod"; 



export const profileRoutes = async (app: FastifyInstance) => {

    const profileSchma = z.object({
        id: z.number(),
        name: z.string(),
        about: z.string(),
        eye: z.string(),
        email: z.string(),
        phone: z.string(),
        local: z.string(),
        language: z.string(),
        socialWpp: z.string()
    })


    app.post("/", async (request, reply) => {

        const idCreatedExists = await prismaClient.mySite.findFirst({
            where: {
                id: 1
            }
        })

        if(idCreatedExists) {
            return reply.status(400).send('Já foi criado as informações iniciais')
        }

        await prismaClient.mySite.create({
           data: {
            id: 1,
            name: 'André Caetano de Sousa',
            about: 'Com formação em Sistemas de Informação e mais de 4 anos de experiência dedicados ao desenvolvimento de sistemas, destaco-me por minha especialidade no âmbito do front-end, onde utilizo habilmente as tecnologias React e Next.js. Minha paixão por aprendizado contínuo impulsiona-me a estar sempre atualizado no cenário tecnológico em constante evolução. Como resultado, sou capaz de criar interfaces envolventes e funcionais, enquanto permaneço aberto a novos desafios que me permitam expandir ainda mais meu conjunto de habilidades. Lembro-me constantemente de que o progresso é uma jornada, não um destino, e assim sigo em busca de excelência e crescimento constante.',
            eye: '23',
            email: 'andre@devandresousa.com',
            phone: '+55 (88) 9 8866-5252',
            local: 'Crato, Ceará, Brasil',
            language: 'Português, English',
            socialWpp: 'https://api.whatsapp.com/send/?phone=5588988665252&text&type=phone_number&app_absent=0'
           }
        })

        return reply.status(201).send('Informações criadas com sucesso')
    })

    app.get("/", async (request, reply) => {
        const profile = await prismaClient.mySite.findMany()

        return {
            profile
        }
    })


    app.put("/", async (request, reply) => {


        const { id } = profileSchma.parse(request.params)

        if(id !== 1) {
            return reply.status(400).send('O id deve ser 1')
        }

        const { name, about, eye, email, phone, local, language, socialWpp } = profileSchma.parse(request.body)

        const profile = await prismaClient.mySite.update({
            where: {
                id
            },
            data: {
                name,
                about,
                eye,
                email,
                phone,
                local,
                language,
                socialWpp 
            }
        })

        return reply.status(200).send(profile)
    })



}