Aluno: Matheus Vieira Gonçalves
Número USP: 11200397

Descrição dos arquivos:

-Index.html e index4.css: 

    Página principal do site, mostrando os produtos em promoção, os mais vistos e etc, e arquivo css responśavel pelo estilo das janelas de exibição dos produtos 
na página.

-cadastro.html e cadastro.css:

	Página onde os usuários podem se cadastrar utilizando dados pessoais, endereço e cartão. Cadastro.css é o arquivo responsável pelo estilo do formulário na 
    página.

-carrinho.html e carrinho.css:

	Respectivamente a página onde ficam salvos os itens selecionados pelo usuário e o arquivo responsável pelo estilo da tabela onde são salvos. 

-cadastro_admin.html:

	Página onde um administrador pode cadastrar um novo, pode ser acessada apenas por um administrador através do cabeçalho.Esta página também pode ser acessada 
quando algum administrador tentar ver seu perfil, nesse caso a página deveria aparecer preenchida.

-compra_administrador.html e cadastro_produto.css:

	Está pagina é a responsável por cadastrar e/ou editar os produtos da loja, o administrador é o único que terá acesso a ela. Ele poderá ter acesso a ela 
quando clicar em algum produto da loja (Esta função ainda não foi implementada devido ao uso de JavaScript para detectar login) , nesse caso para editar, ou 
quando clicar na aba "Adicionar Produto" no cabeçalho.

-compra.html e compras.css:
	
	Aqui o usuário poderá adicionar um produto em seu carrinho, conferir prazos de entrega e verificar a descrição de cada produto. Compras.css é o arquivo 
responsável pelo estilo da página.

-listaProdutos.html e listaProduto.css:
	
	Sempre que o usuário clicar em algum departamento ou setor (exceto serviços) ele será redirecionado para aqui, onde poderá aplicar filtros de podendo 
assim navegar entre os produtos disponíveis na loja.

-perfil.html, perfil_pedidos.html, perfil_servicos.html, perfil_pedidos.css, perfil.css:
	
	Esse conjunto de arquivos permite que o usuário veja seu perfil podendo alterar seus dados, ver seus pedidos, ver os serviços agendados e ver o seu 
histórico na loja.


-servicos.html e servicos.css:

	Página onde um usuário poderá agendar serviços e terá acesso a uma descrição onde poderá ser informada uma tabela base de preços ou outras informações 
pertinentes.

-servicos_admin.html servicos_admin.css:

	Nessa página o administrador pode conferir as solicitações de pedidos feitas, podendo cancelá-las ou marcá-las como concluídas, podendo também ver um 
histórico dos serviços prestados.

-popupLogin.css:

	Arquivo responsável pelo estilo do formulário de login que está contido em todas as páginas no final, na div login_form_popup, onde o usuário pode se 
logar ou ir para a página de cadastro.

-popupSenha.css:

	Assim como no formulário de login, este arquivo é responsável pelo estilo da div contida nas páginas janela_popup_senha, permitindo que o usuário tente 
recuperar uma senha perdida.

-chatPopup.css:

	Arquivo responsável pelo estilo da div popupChatDiv, possibilitando que o usuário se comunique com a loja através de um email.

-cabecalho.css:
	
	Dentro de cada página está contido um cabeçalho fixo que permite sempre a navegação dentro do site, dando a impressão de uma aplicação de área de trabalho,
este arquivo é o responsável pelo estilo deste cabeçalho.

-rodape.css:
	
	Da mesma forma que o cabeçalho existe um rodapé fixo em todas as páginas do site contendo informações da loja, este arquivo é responsável pelo estilo do 
rodapé.

-produto.css:

	Arquivo que responsável pelo estilo de todos os produtos contidos no site.

-pets.html pets.css:

	Pagina do perfil onde o usuário pode salvar os dados de seus animais e consultar os dados dos animais já salvos. Aqui o usuário também pode editar dados de um animal
já cadastrado, nesse caso a mesma tela de cadastro irá aparecer, mas preenchida e o texto do botão mudaria para "alterar" (Não inplementado).

-popupCadastro.css:

	Arquivo responsável pelo estilo do formulário de cadastro de pets contido dentro da página citada anteriormente.


-scriptsBasicos:

	Este arquivo contém apenas 4 funções que tem como fim fazer com que os popups citados anteriormente apareçam e desapareçam e uma que facilita a navegação 
para a página compra.html. (Por serem muito básicas acredito que não há problemas em utilizá-las, mas foi a única maneira viável encontrada)

OBS: 

	-Como foi requerido que não se utilizasse JavaScript, cada página contém de maneira repetida o código em html do cabeçalho e do rodapé. Futuramente será 
apenas uma página que, através de requisições AJAX, mostrará todo conteúdo.

	-As únicas páginas que estão "logadas" como usuário são: perfil_pedidos.html perfil_servicos.html perfil.html pets.html

	-As únicas páginas que estão "logadas" como administrador são : cadastro_admin.html compra_administrador.html servicos_admin.html

Mudanças futuras:

	Estilo:
		-Alterar o estilo de todos os selectors utilizando JavaScripts;
		-Alterar o estilo da seleção de fotos para produtos (compra_administrador.html);
		-Aprimorar o estilo da página de pets e da pagina de serviços.
	
	Funcionalidade:
		
		-Adicionar a opção de inserir foto no cadastro de administradores;
		-Adicionar uma barra de navegação lateral para telas pequenas;
		-Preenchimento automático de formulários com base nas informações salvas como dados de usuários, administradores e produtos;
		-Transformar a navegação mais interativa mudando a cor das abas do header conforme se navega pelo site, tornando mais fácil saber em qual aba 
        se está (como em um fichário);
		-Aplicar o funcionamento dos filtros (listaProdutos.html) permitindo buscas mais específicas no banco de dados conforme os gostos do usuário;
		-Alterar o texto do h4 de id navegacao_atual, contido em quase todas as paǵinas, podendo assim onde exatamente o usuário se encontra;
		-Colocação de tags específicas em todos os campos que serão alterados conforme o banco de dados muda
		-Criação de um banco de dados para salvar os dados coletados

	
Informações a serem salvas:

	Produtos:
		Nome, imagem, nome comercial, marca, categoria, departamento, preço, preço promocional, código, quantidade em estoque, lote, validade do lote, descrição, 
        número de unidades vendidas, número de visualizações da página do produto.
	
	Usuários:
		Nome completo, número de celular, número de telefone, data de nascimento, senha, email, CPF, CEP, rua, bairro, cidade, estado, dados do cartão de crédito, 
        números de acesso, tempo de cada acesso, produtos comprados, serviços agendados, produtos vistos.

	Adiministradores:
		Nome completo, número de celular, número de telefone, data de nascimento, senha, email, CPF, CEP, rua, bairro, cidade, estado.