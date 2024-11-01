# URL Shortener API

## Descrição

API para encurtamento de URLs com autenticação de usuários.

## Pré-requisitos

- Node.js (v22.11.0) é versão LTS mais recente.
- Docker e Docker Compose instalados.

## Instalação

### Localmente

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>


## Pontos de Melhoria para Escalabilidade Horizontal

- **Balanceamento de Carga**: Implementar um balanceador de carga para distribuir o tráfego entre múltiplas instâncias.
- **Cache**: Utilizar cache (por exemplo, Redis) para reduzir a carga no banco de dados.
- **Desacoplamento de Serviços**: Separar serviços em microsserviços para melhorar a escalabilidade e manutenção.
- **Monitoramento e Logging**: Implementar ferramentas de monitoramento e logging para identificar gargalos e problemas de performance.

### Desafios

- **Gerenciamento de Estado**: Manter a consistência do estado entre múltiplas instâncias pode ser desafiador.
- **Latência de Rede**: A comunicação entre serviços distribuídos pode introduzir latência.
- **Complexidade Operacional**: Gerenciar uma arquitetura distribuída pode aumentar a complexidade operacional.
