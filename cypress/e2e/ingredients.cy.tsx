/// <reference types="cypress" />

import { SELECTORS } from '../support/SELECTORS';
import { findIngredientByType } from '../support/commands';

describe('Проверка добавления ингредиентов в конструктор', () => {
  beforeEach(() => {
    // мокирование запроса списка ингредиентов
    cy.mockIngredients();

    cy.visit('/');

    cy.wait('@getIngredients');
  });

  it('Добавление булки в конструктор', () => {
    // находим булку в тестовых данных
    const bun = findIngredientByType('bun');

    // добавляем булку
    cy.addIngredientToConstructor(bun.name);

    // проверяем, что булка добавлена в верхнюю и нижнюю части конструктора
    cy.get(SELECTORS.CONSTRUCTOR_ELEMENT_TOP).should('contain', bun.name);
    cy.get(SELECTORS.CONSTRUCTOR_ELEMENT_BOTTOM).should('contain', bun.name);
  });

  it('Замена булки в конструкторе', () => {
    // находим две булки в тестовых данных
    const initialBun = findIngredientByType('bun');

    const newBun = findIngredientByType('bun', initialBun.name);

    // добавляем исходную булку
    cy.addIngredientToConstructor(initialBun.name);

    // проверяем, что исходная булка добавлена
    cy.get(SELECTORS.CONSTRUCTOR_ELEMENT_TOP).should(
      'contain',
      initialBun.name
    );
    cy.get(SELECTORS.CONSTRUCTOR_ELEMENT_BOTTOM).should(
      'contain',
      initialBun.name
    );

    // добавляем новую булку
    cy.addIngredientToConstructor(newBun.name);

    // проверяем, что новая булка заменила старую
    cy.get(SELECTORS.CONSTRUCTOR_ELEMENT_TOP).should('contain', newBun.name);
    cy.get(SELECTORS.CONSTRUCTOR_ELEMENT_BOTTOM).should('contain', newBun.name);
  });

  it('Добавление начинки в конструктор', () => {
    // находим ингредиент начинки в тестовых данных
    const filling = findIngredientByType('main');

    // добавляем начинку
    cy.addIngredientToConstructor(filling.name);

    // проверяем, что начинка добавлена в конструктор
    cy.get(SELECTORS.CONSTRUCTOR_ELEMENT_ROW).should('contain', filling.name);
  });
});
