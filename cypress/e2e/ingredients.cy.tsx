/// <reference types="cypress" />

import ingredients from '../fixtures/ingredients.json';
import { SELECTORS } from '../support/SELECTORS';

describe('Проверка добавления ингредиентов в конструктор', () => {
  beforeEach(() => {
    // мокирование запроса списка ингредиентов
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Добавление булки в конструктор', () => {
    // находим булку в тестовых данных
    const bun = ingredients.data.find((item) => item.type === 'bun');
    if (!bun) {
      throw new Error('Булка не найдена в тестовых данных');
    }

    // добавляем булку
    cy.get(`[data-testid=${SELECTORS.INGREDIENT}]`)
      .contains(bun.name)
      .parents('li')
      .within(() => {
        cy.get(`button`).click({
          force: true
        });
      });

    // проверяем, что булка добавлена в верхнюю и нижнюю части конструктора
    cy.get('.constructor-element_pos_top').should('contain', bun.name);
    cy.get('.constructor-element_pos_bottom').should('contain', bun.name);
  });

  it('Замена булки в конструкторе', () => {
    // находим две булки в тестовых данных
    const initialBun = ingredients.data.find((item) => item.type === 'bun');

    const newBun = ingredients.data.find(
      (item) => item.type === 'bun' && item.name !== initialBun?.name
    );

    if (!initialBun || !newBun) {
      throw new Error('Не удалось найти булку в тестовых данных');
    }

    // добавляем исходную булку
    cy.get(`[data-testid=${SELECTORS.INGREDIENT}]`)
      .contains(initialBun.name)
      .parents('li')
      .within(() => {
        cy.get(`button`).click({ force: true });
      });

    // проверяем, что исходная булка добавлена
    cy.get('.constructor-element_pos_top').should('contain', initialBun.name);
    cy.get('.constructor-element_pos_bottom').should(
      'contain',
      initialBun.name
    );

    // добавляем новую булку
    cy.get(`[data-testid=${SELECTORS.INGREDIENT}]`)
      .contains(newBun.name)
      .parents('li')
      .within(() => {
        cy.get(`button`).click({ force: true });
      });

    // проверяем, что новая булка заменила старую
    cy.get('.constructor-element_pos_top').should('contain', newBun.name);
    cy.get('.constructor-element_pos_bottom').should('contain', newBun.name);
  });

  it('Добавление начинки в конструктор', () => {
    // находим ингредиент начинки в тестовых данных
    const filling = ingredients.data.find((item) => item.type === 'main');

    if (!filling) {
      throw new Error('Ингредиент начинки не найден в тестовых данных');
    }

    // добавляем начинку
    cy.get(`[data-testid=${SELECTORS.INGREDIENT}]`)
      .contains(filling.name)
      .parents('li')
      .within(() => {
        cy.get(`button`).click({ force: true });
      });

    // проверяем, что начинка добавлена в конструктор
    cy.get('.constructor-element__row').should('contain', filling.name);
  });
});
