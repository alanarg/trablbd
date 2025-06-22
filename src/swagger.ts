
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
    tags: [
      {
        name: 'Geração clientes',
        description: 'Gera automaticamente 100 clientes, com contas e dispositivos.',
      },
      {
        name: 'Geração transações',
        description: 'Gera automaticamente 1000 transações de clientes previamente cadastrados.',
      },
      {
        name: 'Top 10 clientes anomalias',
        description: 'Operações relacionadas a usuários',
      },
      {
        name: 'Top 10 horários de maior incidência',
        description: 'Operações relacionadas a usuários',
      },
    
       {
        name: 'Evolução Anomalias',
        description: ' Retorna a evolução das anomalias, podendo ser ',
      }
   
    ],
  },
  apis: ['./src/controllers/*.ts'], // Caminho para seus arquivos de rota com comentários Swagger
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
