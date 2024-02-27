import { fastify } from 'fastify';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
const database = new DatabasePostgres();

// Rota POST para criar um vídeo
server.post('/videos', async (request, reply) => {
  const { title, description, duration } = request.body;

  console.log(title, description, duration);

  await database.create({
    title: title,
    description: description,
    duration: duration,
  });

  return reply.status(201).send();
});

// Rota GET para buscar vídeos
server.get('/videos', async (request) => {
  const search = request.query.search;

  const videos = await database.list(search);

  return videos;
});

// Rota PUT para atualizar um vídeo
server.put('/videos/:id', async (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  console.log(title, description, duration);

  await database.update(videoId, {
    title: title,
    description: description,
    duration: duration,
  });

  return reply.status(204).send();
});

// Rota DELETE para excluir um vídeo
server.delete('/videos/:id', (request, reply) => {
  const videoId = request.params.id;

  database.delete(videoId);

  return reply.status(204).send();
});

server.listen({
  port: process.env.PORT ?? 3333,
});
