import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });

// Register CORS for Vite client access
fastify.register(cors, {
  origin: '*', // For dev purposes
});

fastify.get('/health', async () => {
  return { status: 'ok' };
});

// POST endpoint mapping to the PRD 6.3 details
fastify.post('/evaluate', async (request, reply) => {
  const payload = request.body;
  fastify.log.info({ payload }, 'Received evaluation payload');

  // MOCK CLAUDE SONNET RESPONSE based on 3.3 Scorecard
  return {
    scores: {
      Scalability: 85,
      Availability: 90,
      Latency: 75,
      Consistency: 100,
      CostEfficiency: 80
    },
    annotations: [
      { nodeId: '1', message: 'Good choice of load balancer for fronting traffic.' },
      { nodeId: '2', message: 'Redis cache effectively shields the database from repetitive reads.' }
    ]
  };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();