/// <reference types="cypress" />
import produtos from "../support/page_objects/produtos"
import dadosprodutos from "../fixtures/produtos.json"


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {

    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */
        

    beforeEach(() => {
        cy.visit('minha-conta')
        cy.fixture('perfil').then(dados => {
            cy.login(dados.usuario, dados.senha)

        })
        cy.visit('produtos')

    })



    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.addprodutos('Abominable Hoodie', 'S', 'Blue', '4')
        cy.get('.woocommerce-message').should('contain', '“Abominable Hoodie”')
    });



    it('Deve preencher o checkout com sucesso', () => {
        produtos.preencherCheckout(
            dadosprodutos[1].nome,
            dadosprodutos[1].sobrenome, 
            dadosprodutos[1].empresa, 
            dadosprodutos[1].pais, 
            dadosprodutos[1].endereco, 
            dadosprodutos[1].complemento, 
            dadosprodutos[1].cidade, 
            dadosprodutos[1].estado, 
            dadosprodutos[1].cep, 
            dadosprodutos[1].telefone, 
            dadosprodutos[1].email

        )

        cy.get('.woocommerce-notice').should('contain' , 'Obrigado. Seu pedido foi recebido.')

        
    });

});

