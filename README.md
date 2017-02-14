| [Voltar](./)  |                                                   |  |
|:--------------|:-------------------------------------------------:|-:|
|               | ![Justiça Linux](imagens/LinuxLawyer.png =20%x*)  |  |
|               | Gerenciador Judicial                              |  |

#Bolão dos Combinados
## Pré requisitos
- nodejs 6.x
- npm 3.x

> Instalação dos pre-requisitos no Ubuntu

Rode o seguinte comando no terminal para instalar o repositório de fontes
- `curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -`

Quando terminar, rode esse comando para instalar a última versão do nodejs e do npm.
- `sudo apt-get install -y nodejs`
- `sudo apt-get install -y npm`

## Instalação e execução do reinaldo:
Entre na pasta onde baixou os fontes dos reinaldo-web
- `cd reinaldo`

O comando abaixo irá baixar as dependências do projeto (pasta: node_modules), empacotar o projeto (pasta: build) e executar o sistema com um servidor embarcado.
- `npm install`

    > Vá para `http://localhost:9000`. Página atualizada automaticamente quando mudanças acontecem.

## Algumas tarefas previamente configuradas

1. Um servidor embarcado atualiza a página sem intervenção humanda (hot reload):
    - `npm start`

    > Vá para `http://localhost:9000/`, página atualizada automaticamente quando mudanças acontecem.
2. Apagar a pasta build
    - `npm run apagar`
3. Realiza o Empacotamento, ou seja, cria todos os artefatos da pasta build
    - `npm run empacotar`    
4. Realiza as duas operações acima, ou seja, apagar e empacotar.
    - `npm run apagar && npm run empacotar`
5. Observa mudanças contínuas nos arquivos, reconstroi incrementalmente, sempre que eles mudam:
    - `npm run observar`

    > manualmente atualiza a página no navegador para ver os reflexos das mudanças
6. Realiza o Empacotamento com arquivos minificados
    - `npm run empacotar-producao`
7. Publicar no ambiente de desenvolvimento
    - `npm run publicar`

    > Esta operação apagará a pasta build, empacotará a aplicação com a variável produção setada e copiará todos os artefatos gerados para o servidor do Autenkus em desenvolvimento.

8. Atalho para os comandos definidos respectivamente em 2, 3 e 9.
    - `npm run redefinir`

    > Execute esse comando quando alterar arquivos que não são carregados pelo webpack, por exemplo: base.ejs    

9. Gerar a documentação
    - `npm run documentar`

    > Gerar o html desse arquivo, acessível na url http[s]://host[:porta]/ajuda.html


[Voltar](./)
