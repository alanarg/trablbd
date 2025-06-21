
import swaggerJSDoc from 'swagger-jsdoc'

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API com Swagger',
      version: '1.0.0',
      description: 'Documentação da API usando Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Altere se necessário
      },
    ],
  },
  apis: ['./src/controllers/*.ts'], // Caminho para seus arquivos de rota com comentários Swagger
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
