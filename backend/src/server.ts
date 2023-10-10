import fastify from "fastify";
import dotenv from "dotenv";
import crypto from "crypto";
import connectToDatabase from "./utils/ConnectionDB";
import Link from "./Model/Link";

dotenv.config();
connectToDatabase();
const app = fastify({ logger: true });

// get link from user and save it in database and genrate nanoid route :- /api/shortner Method - POST
app.post<{ Body: { orginalLink: string; email: string } }>(
  "/api/shortner",
  async (request, reply) => {
    const { orginalLink, email } = request.body;
    try {
      if (!orginalLink)
        return reply.status(400).send({ error: "url is required" });
      // genrate nanoid
      const shortLink = crypto.randomBytes(6).toString("hex");
      // save link in database
      await Link.create({
        orginalLink,
        shortLink,
        email,
      });
      reply.status(200).send({ shortLink, orginalLink });
    } catch (error) {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
);

// create route for redirecting to orginal link :- /api/shortner/:shortLink Method - GET
app.get<{ Params: { shortLink: string } }>(
  "/api/:shortLink",
  async (request, reply) => {
    const { shortLink } = request.params;
    try {
      // const link = await Link.findOne({ shortLink });
      const link = await Link.findOneAndUpdate(
        {
          shortLink,
        },
        {
          $push: {
            visitHistory: {
              timestamp: Date.now(),
            },
          },
        }
      );
      if (!link) return reply.status(404).send({ error: "Link not found" });
      reply.redirect(link.orginalLink);
    } catch (error) {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
);

const start = async () => {
  try {
    await app.listen(3005);
    console.log("Server is running on http://localhost:3005");
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

start();
