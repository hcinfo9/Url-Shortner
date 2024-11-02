# URL Shortener API

## Descrição

Este projeto é uma API de encurtamento de URLs desenvolvida com NestJS. A API permite que usuários autenticados e não autenticados criem URLs encurtadas. Usuários autenticados podem gerenciar suas URLs, enquanto usuários não autenticados podem apenas criar URLs encurtadas. A API também inclui autenticação JWT, monitoramento de desempenho com Prometheus, documentação com Swagger, e logs com Winston.

 </br>
  </br>
  

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

  <br>
   <br>
   
  
## Pré-requisitos

- Node.js (versão 22.11.0 ou superior)
- ter Docker instalado na maquina e Docker Compose
- PostgreSQL (ou outro banco de dados compatível com Prisma)
- AWS CLI (para integração com AWS)
- Kubernetes (Cluster responsavél por conter sua aplicação)

 </br>
  </br>

  
## Funcionalidades
   
   Autenticação de Usuários:
   - Registro: Permite que novos usuários se registrem.
   - Login: Permite que usuários existentes façam login e obtenham um token JWT.
     
   </br>
    
   Encurtamento de URLs:
   - Criação de URLs: Usuários autenticados e não autenticados podem criar URLs encurtadas.
   - Listagem de URLs: Usuários autenticados podem listar todas as suas URLs encurtadas.
   - Redirecionamento: Redireciona para a URL original quando acessada a URL encurtada.
   - Atualização de URLs: Usuários autenticados podem atualizar suas URLs encurtadas.
   - Exclusão de URLs: Usuários autenticados podem excluir suas URLs encurtadas.

    
  </br>
  
   Monitoramento e Logs:
   - Prometheus: Monitoramento de desempenho.
   - Winston: Logs estruturados.
   - Documentação:


  </br>
  </br>
   Swagger: Documentação interativa da API pode acessada pela url:http://localhost:3000/api, isso depois de estar com aplicação em execução é claro.
   

      


## Instalação


Siga as etapas para instalar e executar o projeto localmente:


</br>

   1. Clone o repositório:
   
      ```bash
         git clone https://github.com/hcinfo9/Project-Web-Scrapping.git](https://github.com/hcinfo9/Url-Shortner.git
      ```

   </br>
   
   2. Acesse o diretório do projeto:
      
      ```bash
         cd Url-Shortner
      ```
      
   </br>
   
   3. Instale as dependências:
       
      ```bash
         npm install
      ```
      
   </br>
   
   4. Cria e inicie o container docker rodando a imagem do PostgreSQL, kraked, e Servidor Node com NestJS:
   
       ```bash
         docker-compose up --build
             OR
          docker-compose up -d
      ```
   </br>
   
   5. Execute esse comnado para executar comando que afetam diretametne dentro do noss container:
   
       ```bash
         docker-compose exec app sh
      ```
   </br>
   
   6. Garantir que a configuração do prisma e suas tabelas estão funcionando: 
   
       ```bash
         npx prisma migrate deploy
      ```
       
   </br>
   
   7. Para realizar os testes unitarios:
   
      ```bash
      npm rum test
      ```
      

   </br>
   
   8. Rotas para testar com API Gateway do Kraked
       
      ```bash
         http://localhost:8080/api/v1/auth/login
         
         http://localhost:8080/api/v1/urls
      ```
    
</br>

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

</br>

## Pontos de Melhoria para Escalabilidade Horizontal

- **Balanceamento de Carga**: Implementar um balanceador de carga para distribuir o tráfego entre múltiplas instâncias.
- **Cache**: Utilizar cache (por exemplo, Redis) para reduzir a carga no banco de dados.
- **Desacoplamento de Serviços**: Separar serviços em microsserviços para melhorar a escalabilidade e manutenção.
- **Monitoramento e Logging**: Implementar ferramentas de monitoramento e logging para identificar gargalos e problemas de performance.
  
</br>

### Desafios

- **Gerenciamento de Estado**: Manter a consistência do estado entre múltiplas instâncias pode ser desafiador.
- **Latência de Rede**: A comunicação entre serviços distribuídos pode introduzir latência.
- **Complexidade Operacional**: Gerenciar uma arquitetura distribuída pode aumentar a complexidade operacional.
