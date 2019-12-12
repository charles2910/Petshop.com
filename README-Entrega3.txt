Petshop.com
Alunos: Carlos Henrique Lima Melara
        Matheus Vieira Gonçalves

Número USP: 9805380
Número USP: 11200397


Recursos Utilizados:
	- Node.js: servidor e rotas da API.
	- CouchDB: armazena as informações relativas aos produtos, usuários, etc.
	- Google Cloud: para desenvolver esta última parte, criamos um servidor no
google cloud, o configuramos com os softwares necessários e adicionamos uma 
regra no firewall para permitir a entrada na porta 8082.
	- DNS Dinâmico: foi associado um nome ao IP do servidor para ser possível
acessá-lo facilmente pelo navegador.

URL de acesso: www.trabweb.ddns.net:8082
	Essa URL permite acesso ao servidor provisionado no GCloud.

Descrição dos arquivos:
* Pastas 
	- conteudos: todos os conteudos HTML que são carregados dinamicamente;
	- css: arquivos de estilo do site;
	- html: contém o index (esqueleto principal) que é utilizado para navegar 
por todo site
	- images: icones utilizados no site e imagens dos produtos;
	- js: scripts utilizados no front end;
	- produtos: json com todos os produtos do site (foi utilizado para 
carregar o banco de dados, a partir disso, todas consultas a produtos ocorrem 
por meio de uma API Restful;
	- node_modules: contém os módulos necessários ao servidor, como o express,
bodyparser, etc. Contém também dois módulos feitos especificamente para acesso 
ao BD e à API, eles são couchDB.js e api.js

* server.js: arquivo que inicializa o servidor, pode-se iniciar o servidor com
node server.js ou nodemon server.js.
