/// <reference types="cypress"/>

import {
  base_url
} from '../../src/config.json';

describe('categories', () => {
  //overbodige get requests intercepten en mocken
  before(() => {
    cy.intercept('GET', `${base_url}/directors`, {
      fixture: 'directors.json',
    });

    cy.intercept('GET', `${base_url}/movies`, {
      fixture: 'movies.json',
    });
  });

  describe('get categories', () => {
    before(() => {
      cy.intercept('GET', `${base_url}/categories`, {
        fixture: 'categories.json',
      });
    });


    it('should show the categories', () => {
      cy.visit('http://localhost:3000');
      cy.get('[data-cy=home_category_button]').click();

      cy.get('[data-cy=category_overview_cats]').children().should('have.length', 6);
      cy.get('[data-cy=category_link]').should('exist');
      cy.get('[data-cy=category_name]').should('exist');
      cy.get('[data-cy=category_description]').should('exist');
    });
  });

  describe('update categories', () => {
    beforeEach(() => {
      cy.login('remco.desmedt@student.hogent.be', 'remcodsmdt');
    });

    it('should edit the category', () => {
      cy.visit('http://localhost:3000');

      //categorieen
      cy.get('[data-cy=home_category_button]').click();

      //edit cat
      cy.get('[data-cy=category_edit_button]').eq(0).click();

      //form invullen
      cy.get('[data-cy=category_link_input]').clear().type('https://media.s-bol.com/xkqpRqQ88mLl/550x788.jpg');
      cy.get('[data-cy=category_name_input]').clear().type('Actionnameupdate');
      cy.get('[data-cy=category_description_input]').clear().type('actiondescriptionupdate');

      //submit
      cy.get('[data-cy=category_submit]').eq(0).click();

      //verwachten dat het werkt
      //afbeelding moet juist zijn
      cy.get('[data-cy=category_link]').eq(0).invoke('attr', 'src')
        .should('eq', 'https://media.s-bol.com/xkqpRqQ88mLl/550x788.jpg');

      cy.get('[data-cy=category_name]').eq(0).contains('Actionnameupdate');
      cy.get('[data-cy=category_description]').eq(0).contains('actiondescriptionupdate');
    });

    it('undo changes from updating categories', () => {
      cy.visit('http://localhost:3000');

      cy.get('[data-cy=home_category_button]').click();
      cy.get('[data-cy=category_edit_button]').eq(0).click();

      cy.get('[data-cy=category_link_input]').clear().type('https://images.unsplash.com/photo-1598389759169-4e0c192c6816?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=449&q=80');
      cy.get('[data-cy=category_name_input]').clear().type('Action');
      cy.get('[data-cy=category_description_input]').clear().type('war, martial arts, guns');

      cy.get('[data-cy=category_submit]').eq(0).click();
    });
  });

  describe('create categories', () => {});

  describe('delete categories', () => {});
});