# URL Shortener API

## Descrição

Este projeto é uma API de encurtamento de URLs desenvolvida com NestJS. A API permite que usuários autenticados e não autenticados criem URLs encurtadas. Usuários autenticados podem gerenciar suas URLs, enquanto usuários não autenticados podem apenas criar URLs encurtadas. A API também inclui autenticação JWT, monitoramento de desempenho com Prometheus, documentação com Swagger, e logs com Winston.


## Tecnologias Utilizadas


- **[NodeJS](https://nodejs.org/en/download/prebuilt-installer)**: Linguaguem backend  utilizada para desenvolvimento do projeto 
- **[TypeScript](https://www.typescriptlang.org/)**: É um superconjunto sintático estrito de JavaScript e adiciona tipagem estática opcional à linguagem
- **[NesjJS](https://nestjs.com/)**: é um framework Node.js de código aberto destinado ao desenvolvimento de aplicativos do lado do servidor
- **[PostGreSQL](https://www.postgresql.org/)**: Banco de dados utilizado para organizar e manter nossas metas guardadas.
- **[Prisma](https://www.prisma.io/)**: Integração com banco de dados , criação dos esquemas das tabelas;
- **[Docker](https://www.docker.com/)**: Utilizado para criar uma imagem Postgres, do kraked assim permitindo executar o banco de dados e tendo a execução da API Gateway mesmo sem instala-lo na maquina.
- **[Jest](https://jestjs.io/pt-BR/)**: Utilizado para criar uma imagem Postgres, assim permitindo executar o banco de dados mesmo sem instala-lo na maquina.
- **[AWS](https://aws.amazon.com/free)**: Cloud Provider utilizado para fazer o deploy da aplicaçção
- **[Kubernetes](https://kubernetes.io/pt-br/docs/reference/kubectl/)**: Utilizado para criar um cluster e configurar os pods permindo a execução do nosso projeto em um ambiente em nuvem.
- **[githubAction](https://kubernetes.io/pt-br/docs/reference/kubectl/)**: Executa os testes Unitarios, Lint, Configurações de conexão AWS, e  configuração kubernetes para deploy.

## Pré-requisitos

- Node.js (versão 22.11.0 ou superior)
- ter Docker instalado na maquina e Docker Compose
- PostgreSQL (ou outro banco de dados compatível com Prisma)
- AWS CLI (para integração com AWS)
- Kubernetes (Cluster responsavél por conter sua aplicação)


## Funcionalidades
   
   Autenticação de Usuários:
   - Registro: Permite que novos usuários se registrem.
   - Login: Permite que usuários existentes façam login e obtenham um token JWT.
   
   Encurtamento de URLs:
   - Criação de URLs: Usuários autenticados e não autenticados podem criar URLs encurtadas.
   - Listagem de URLs: Usuários autenticados podem listar todas as suas URLs encurtadas.
   - Redirecionamento: Redireciona para a URL original quando acessada a URL encurtada.
   - Atualização de URLs: Usuários autenticados podem atualizar suas URLs encurtadas.
   - Exclusão de URLs: Usuários autenticados podem excluir suas URLs encurtadas.

   
   Monitoramento e Logs:
   - Prometheus: Monitoramento de desempenho.
   - Winston: Logs estruturados.
   - Documentação:

   
   Swagger: Documentação interativa da API.


 ## Testar as Rotas da API
 
   1. Registro de Usuário
      
      ```bash
         Método: POST
         URL: http://localhost:3000/auth/register
         Body: JSON (raw)
      ```

   2. Login de Usuário

      ```bash
         Método: POST
         URL: http://localhost:3000/auth/login
         Body: JSON (raw)
         Resposta Esperada: Um token JWT
      ```
      

   3. Criar URL Encurtada (Usuário Autenticado)
      
      ```bash
         Método: POST
         URL: http://localhost:3000/urls
         Headers:
         Authorization: Bearer <seu_token_jwt>
         Body: JSON (raw)
         Resposta Esperada: Detalhes da URL encurtada
      ```

      
   4. Criar URL Encurtada (Usuário Não Autenticado)

       ```bash
         Método: POST
         URL: http://localhost:3000/urls
         Body: JSON (raw)
         Resposta Esperada: Detalhes da URL encurtada (sem userId)
      ```
      

   5. Listar URLs Encurtadas (Usuário Autenticado)
   
      ```bash
       Método: GET
       URL: http://localhost:3000/urls
       Headers:
       Authorization: Bearer <seu_token_jwt>
       Resposta Esperada: Lista de URLs encurtadas do usuário
      ```
      
   
   6. Redirecionar para a URL Original

       ```bash
         Método: GET
         URL: http://localhost:3000/urls/abc123
         Resposta Esperada: Redirecionamento para a URL original
      ```
      
   

   7. Atualizar URL Encurtada (Usuário Autenticado)

       ```bash
         Método: PUT
         URL: http://localhost:3000/urls/:id
         Headers:
         Authorization: Bearer <seu_token_jwt>
         Body: JSON (raw)
         Resposta Esperada: Detalhes da URL atualizada
      ```
   



   8. Excluir URL Encurtada (Usuário Autenticado)

       ```bash
         Método: DELETE
         URL: http://localhost:3000/urls/:id
         Headers:
         Authorization: Bearer <seu_token_jwt>
         Resposta Esperada: Confirmação de exclusão
      ```

       

## Instalação


Siga as etapas para instalar e executar o projeto localmente:


   1. Clone o repositório:
   
      ```bash
         git clone https://github.com/hcinfo9/Project-Web-Scrapping.git](https://github.com/hcinfo9/Url-Shortner.git
      ```
   
   2. Acesse o diretório do projeto:
      
      ```bash
         cd Url-Shortner
      ```
   
   3. Instale as dependências:
       
      ```bash
         npm install
      ```
   
   4. Cria e inicie o container docker rodando a imagem do PostgreSQL, kraked, e Servidor Node com NestJS:
   
       ```bash
         docker-compose up --build
             OR
          docker-compose up -d
      ```
   
   5. Execute esse comnado para executar comando que afetam diretametne dentro do noss container:
   
       ```bash
         docker-compose exec app sh
      ```
   
   6. Garantir que a configuração do prisma e suas tabelas estão funcionando: 
   
       ```bash
         npx prisma migrate deploy
      ```
   
   7. Para realizar os testes unitarios:
   
      ```bash
      npm rum test
      ```
      
   
   8. Ambiente docker rodando sem erros
      Pode executar as rotas em um assistente como PostMan ou Insomnia.
   
    

## Estrutura do Projeto:
   ```bash
      src/: Contém o código-fonte do projeto.
      auth/: Módulo de autenticação.
      url/: Módulo de encurtamento de URLs.
      prisma/: Configuração do Prisma.
      common/: Guardas e middlewares comuns.
      interface/: Interfaces usadas no projeto.
      docker-compose.yml: Configuração do Docker Compose.
      Dockerfile: Configuração do Docker.
      prisma/: Configurações e migrations do Prisma.
      .github/: Workflows do GitHub Actions.
      package.json: Dependências e scripts do projeto.
      README.md: Documentação do projeto.
      k8s: arquivos dpara fazer o deploy na AWS
   ```


## Pontos de Melhoria para Escalabilidade Horizontal

- **Balanceamento de Carga**: Implementar um balanceador de carga para distribuir o tráfego entre múltiplas instâncias.
- **Cache**: Utilizar cache (por exemplo, Redis) para reduzir a carga no banco de dados.
- **Desacoplamento de Serviços**: Separar serviços em microsserviços para melhorar a escalabilidade e manutenção.
- **Monitoramento e Logging**: Implementar ferramentas de monitoramento e logging para identificar gargalos e problemas de performance.

### Desafios

- **Gerenciamento de Estado**: Manter a consistência do estado entre múltiplas instâncias pode ser desafiador.
- **Latência de Rede**: A comunicação entre serviços distribuídos pode introduzir latência.
- **Complexidade Operacional**: Gerenciar uma arquitetura distribuída pode aumentar a complexidade operacional.
