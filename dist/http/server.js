"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/http/server.ts
var import_fastify = __toESM(require("fastify"));

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();

// src/routes/profileroutes.ts
var import_zod = require("zod");
var profileSchma = import_zod.z.object({
  id: import_zod.z.number(),
  name: import_zod.z.string(),
  about: import_zod.z.string(),
  eye: import_zod.z.string(),
  email: import_zod.z.string(),
  phone: import_zod.z.string(),
  local: import_zod.z.string(),
  language: import_zod.z.string(),
  socialWpp: import_zod.z.string()
});
var profileRoutes = (app2) => __async(void 0, null, function* () {
  app2.post("/", (request, reply) => __async(void 0, null, function* () {
    const idCreatedExists = yield prismaClient.mySite.findFirst({
      where: {
        id: 1
      }
    });
    if (idCreatedExists) {
      return reply.status(400).send("J\xE1 foi criado as informa\xE7\xF5es iniciais");
    }
    yield prismaClient.mySite.create({
      data: {
        id: 1,
        name: "Andr\xE9 Caetano de Sousa",
        about: "Com forma\xE7\xE3o em Sistemas de Informa\xE7\xE3o e mais de 4 anos de experi\xEAncia dedicados ao desenvolvimento de sistemas, destaco-me por minha especialidade no \xE2mbito do front-end, onde utilizo habilmente as tecnologias React e Next.js. Minha paix\xE3o por aprendizado cont\xEDnuo impulsiona-me a estar sempre atualizado no cen\xE1rio tecnol\xF3gico em constante evolu\xE7\xE3o. Como resultado, sou capaz de criar interfaces envolventes e funcionais, enquanto permane\xE7o aberto a novos desafios que me permitam expandir ainda mais meu conjunto de habilidades. Lembro-me constantemente de que o progresso \xE9 uma jornada, n\xE3o um destino, e assim sigo em busca de excel\xEAncia e crescimento constante.",
        eye: "23",
        email: "andre@devandresousa.com",
        phone: "+55 (88) 9 8866-5252",
        local: "Crato, Cear\xE1, Brasil",
        language: "Portugu\xEAs, English",
        socialWpp: "https://api.whatsapp.com/send/?phone=5588988665252&text&type=phone_number&app_absent=0"
      }
    });
    return reply.status(201).send("Informa\xE7\xF5es criadas com sucesso");
  }));
  app2.get("/", (request, reply) => __async(void 0, null, function* () {
    const profile = yield prismaClient.mySite.findMany();
    return {
      profile
    };
  }));
  app2.patch("/:ids", (request, reply) => __async(void 0, null, function* () {
    const idParms = import_zod.z.object({
      ids: import_zod.z.string()
    });
    const { ids } = idParms.parse(request.params);
    if (ids !== "1") {
      return reply.status(400).send("O id deve ser 1");
    }
    const { id, name, about, eye, email, phone, local, language, socialWpp } = profileSchma.parse(request.body);
    const profile = yield prismaClient.mySite.update({
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
    });
    return reply.status(200).send(profile);
  }));
});

// src/http/server.ts
var app = (0, import_fastify.default)();
app.register(profileRoutes, {
  prefix: "/api"
});
app.listen({
  port: 3e3
});
