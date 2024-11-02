## Para realizar o deploy da sua aplicação na AWS utilizando Kubernetes, você pode seguir os passos abaixo.
      
  ## Instruções:  
   Ter um Kubernetes instalado localmente, Criar uma conta na AWS e configurar seu primeiro projeto , permissões de acesso, suas keys para github Actions.       
  <br>   
  
  Passo 1: Configurar o AWS CLI e o EKS
      
  - Instalar o AWS CLI:
  Certifique-se de que o AWS CLI está instalado e configurado corretamente.

   ```bash
     aws configure
   ```

<br>

   - Criar um Cluster EKS:
     Utilize o AWS CLI para criar um cluster EKS. Substitua <cluster-name> e <region> pelos valores apropriados.

      ```bash
        aws eks create-cluster --name <cluster-name> --region <region> --role-arn <role-arn> --resources-vpc-config subnetIds=<subnet-ids>,securityGroupIds=<security-group-          ids>
      ```

<br>

   - Configurar o kubectl para o EKS:
      Atualize o kubeconfig para usar o cluster EKS.

       ```bash
           aws eks --region <region> update-kubeconfig --name <cluster-name>
       ```
       <br>


Passo 2: Configurar o AWS ECR

   - Criar um Repositório ECR:
      Crie um repositório no ECR para armazenar suas imagens Docker.

     ```bash
       aws ecr create-repository --repository-name url-shortener --region <region>
     ```
     
<br>
 - Autenticar no ECR:
       Autentique-se no ECR para poder enviar suas imagens Docker.
     
   ```bash
      aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws-account-id>.dkr.ecr.<region>.amazonaws.com  
   ```
<br>
      
 - Construir e Enviar a Imagem Docker:
      Construa e envie a imagem Docker para o ECR.

   ```bash
     docker build -t <aws-account-id>.dkr.ecr.<region>.amazonaws.com/url-shortener:latest .
      docker push <aws-account-id>.dkr.ecr.<region>.amazonaws.com/url-shortener:latest
    ```
   

   Passo 3: Configurar Segredos no GitHub
   
      - Adicionar Segredos no GitHub:
            No repositório do GitHub, vá para Settings > Secrets e adicione os seguintes segredos:

        ```bash
            AWS_ACCESS_KEY_ID
            AWS_SECRET_ACCESS_KEY
            AWS_REGION
            AWS_ACCOUNT_ID
        ```
        <br>

   Passo 4: Configurar os Arquivos de Manifests Kubernetes
      Certifique-se de que os arquivos de manifests Kubernetes estão configurados corretamente. 
      São os arquivos que separei na pasta K8s
   

Criar o Deployment e Service do Banco de Dados:

Criar o ConfigMap do Krakend:

Criar o Deployment e Service da Aplicação:

Passo 4: Verificar o Status dos Recursos
Verificar os Pods:

Verificar os Services:

Verificar os Deployments:

Passo 5: Acessar a Aplicação
Após aplicar todos os manifests, o Kubernetes provisionará um LoadBalancer para o serviço url-shortener-service. Você pode obter o endereço IP do LoadBalancer com o seguinte comando:

A saída incluirá o endereço IP externo do LoadBalancer. Use esse endereço para acessar a aplicação.

Conclusão
Seguindo esses passos, você pode realizar o deploy da sua aplicação na AWS utilizando Kubernetes. Certifique-se de que todos os arquivos de configuração estão corretos e que você tem as permissões necessárias para criar e gerenciar recursos na AWS. Se encontrar algum problema, verifique os logs dos pods e os eventos do Kubernetes para obter mais informações.
