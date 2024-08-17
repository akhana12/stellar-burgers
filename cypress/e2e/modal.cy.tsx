/// <reference types="cypress" />

import { SELECTORS } from '../support/SELECTORS';
import { findIngredientByType } from '../support/commands';
import { getIngredients } from '../../src/services/slices/ingredientsSlice';

describe('Проверка открытия,закрытия и содержимого модального окна ингредиента', () => {
  beforeEach(() => {
    // мокирование запроса списка ингредиентов
    cy.mockIngredients();

    cy.visit('/');

    cy.wait('@getIngredients');

    // находим ингредиент типа "main" в тестовых данных
    const ingredient = findIngredientByType('main');

    // кликаем по ингредиенту для открытия модального окна
    cy.getByTestid(SELECTORS.INGREDIENT).contains(ingredient.name).click();

    // проверяем, что модальное окно открылось и содержит имя ингредиента
    cy.getByTestid(SELECTORS.MODAL)
      .should('be.visible')
      .and('contain', ingredient.name);
  });

  it('Закрытие модального окна по нажатию клавиши Escape', () => {
    // нажимаем клавишу Escape
    cy.get(SELECTORS.BODY).type('{esc}');

    // проверяем, что модальное окно закрылось
    cy.getByTestid(SELECTORS.MODAL).should('not.exist');
  });

  it('Закрытие модального окна по кнопке', () => {
    // нажимаем кнопку закрытия
    cy.getByTestid(SELECTORS.MODAL_CLOSE_BUTTON).click();

    // проверяем, что модальное окно закрылось
    cy.getByTestid(SELECTORS.MODAL).should('not.exist');
  });

  it('Закрытие модального окна при клике на оверлей', () => {
    // кликаем по области вне модального окна
    cy.get(SELECTORS.BODY).click('topLeft');
    // проверяем, что модальное окно закрылось
    cy.get(SELECTORS.MODALS).find(SELECTORS.MODAL).should('not.exist');
  });
});
