// mockData.ts

// отдельные объекты для каждого типа ингредиента
export const bun = {
  _id: '643d69a5c3f7b9001cfa093c',
  id: 'bun-1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

export const filling = {
  _id: '643d69a5c3f7b9001cfa0941',
  id: 'main-1',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
};

export const sauce = {
  _id: '643d69a5c3f7b9001cfa0942',
  id: 'sauce-1',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
  __v: 0
};

// общий моковый ответ, включающий все ингредиенты
export const mockIngredientsResponse = {
  success: true,
  data: [bun, filling, sauce]
};

export const mockFeedResponse = {
  success: true,
  orders: [
    {
      _id: '1',
      status: 'done',
      name: 'Test Order',
      createdAt: '2024-08-16T00:00:00Z',
      updatedAt: '2024-08-16T00:00:00Z',
      number: 1,
      ingredients: ['ingredient1', 'ingredient2']
    }
  ],
  total: 100,
  totalToday: 10
};

export const mockOrders = [
  {
    _id: 1,
    status: 'done',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 1,
    ingredients: []
  },
  {
    _id: 2,
    status: 'done',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 2,
    ingredients: []
  }
];

export const mockNewOrderResponse = {
  success: true,
  name: 'Краторный био-марсианский бургер',
  order: {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      }
    ],
    _id: '66bf423e119d45001b500111',
    owner: {
      name: 'Жак-Ив Кусто',
      email: 'akhana12@yandex.ru',
      createdAt: '2024-07-30T17:38:21.495Z',
      updatedAt: '2024-08-16T05:42:16.080Z'
    },
    status: 'done',
    name: 'Краторный био-марсианский бургер',
    createdAt: '2024-08-16T12:12:46.027Z',
    updatedAt: '2024-08-16T12:12:46.600Z',
    number: 50000,
    price: 1679
  }
};

export const mockUser = {
  user: {
    email: 'akhana12@yandex.ru',
    name: 'Жак-Ив Кусто'
  }
};
