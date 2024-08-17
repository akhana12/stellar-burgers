/// <reference types="./index" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /* Мокирование запроса списка ингредиентов */
    mockIngredients(): Chainable<void>;
    /* Мокирование запроса данных пользователя */
    mockUser(): Chainable<void>;
    /* Мокирование пост запроса создания нового заказа*/
    mockNewOrder(): Chainable<void>;
    /* Находит элемент по data-testid и возвращает его */
    getByTestid(testId: string): Chainable<JQuery<HTMLElement>>;
    /* Ищет ингредиент по его типу в моковых данных */
    findIngredientByType(type: string): Chainable<any>;
    /* Добавление ингредиента в конструктор по имени*/
    addIngredientToConstructor(type: string): Chainable<any>;
    /* Поиск ингредиента в тестовых данных */
  }
}
