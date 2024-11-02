## Para realizar o deploy da sua aplicação na AWS utilizando Kubernetes, você pode seguir os passos abaixo. Esses passos incluem a configuração do cluster EKS, a criação de recursos Kubernetes e a configuração do AWS ECR para armazenar suas imagens Docker.
      
        
     
 Passo 1: Configurar o AWS CLI e o EKS
      
    Instalar o AWS CLI:

      `´´´bash
        aws configure
      ´´´


      Certifique-se de que o AWS CLI está instalado e configurado corretamente.
      
      Criar um Cluster EKS:
      
      Utilize o AWS CLI para criar um cluster EKS. Substitua <cluster-name> e <region> pelos valores apropriados.
      
      Configurar o kubectl para o EKS:
      
      Atualize o kubeconfig para usar o cluster EKS.
      
      Passo 2: Configurar o AWS ECR
      Criar um Repositório ECR:
      
      Crie um repositório no ECR para armazenar suas imagens Docker.
      
      Autenticar no ECR:
      
      Autentique-se no ECR para poder enviar suas imagens Docker.
      
      Construir e Enviar a Imagem Docker:
      
      Construa e envie a imagem Docker para o ECR.
      
      Passo 3: Aplicar os Manifests Kubernetes
      Criar o PersistentVolume e PersistentVolumeClaim:
      
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
