import {
  TLoginData,
  TRegisterData,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '@api';
import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie } from '../../utils/cookie';
import { RootState } from '../store';

interface IUpdateUserApiParams {
  email: string;
  name: string;
  password: string;
}

interface IResetPasswordApiParams {
  password: string;
  token: string;
}

type TUserState = {
  isInit: boolean;
  isLoading: boolean;
  isLogout: boolean;
  error: SerializedError | null;
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
};

export const initialState: TUserState = {
  isInit: false,
  isLoading: false,
  isLogout: false,
  error: null,
  user: null,
  isAuthChecked: false,
  isAuthenticated: false
};

// получение данных о пользователе
export const getUserThunk = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

// обновление данных пользователя
export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (params: IUpdateUserApiParams) => await updateUserApi({ ...params })
);

// выход из личного кабинета
export const logoutUserThunk = createAsyncThunk(
  'user/logout',
  async () =>
    await logoutApi()
      .then(() => {
        localStorage.clear(); // очищаем refreshToken
        deleteCookie('accessToken'); // очищаем accessToken
      })
      .catch(() => {
        throw new Error('Ошибка выполнения выхода');
      })
);

// регистрация
export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async (params: TRegisterData) => {
    const { email, name, password } = params;
    return await registerUserApi({ email, name, password });
  }
);

// вход в личный кабинет
export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async (params: TLoginData) => {
    const { email, password } = params;
    const response = await loginUserApi({ email, password });
    localStorage.setItem('userName', response.user.name);
    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    },
    updateUser: (
      state,
      action: PayloadAction<{ name: string; email: string }>
    ) => {
      if (state.user) {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
      }
    },
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    isAuthCheckedSelector: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    // получение данных о пользователе
    builder.addCase(getUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserThunk.rejected, (state, action) => {
      state.isInit = true;
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.isInit = true;
      state.isLoading = false;
      state.user = action.payload.user;
    });

    // обновление данных пользователя
    builder.addCase(updateUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isLogout = false;
      state.error = action.error;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogout = false;
      state.error = null;
      state.user = action.payload.user;
    });

    // выход из личного кабинета
    builder.addCase(logoutUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isLogout = false;
      state.error = action.error;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      state.isInit = false;
      state.isLoading = false;
      state.isLogout = true;
      state.error = null;
      state.user = null;
    });

    // регистрация
    builder.addCase(registerUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.isAuthenticated = false;
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.isAuthenticated = false;
    });
    builder.addCase(registerUserThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = false;
    });

    // вход в личный кабинет
    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.isAuthenticated = false;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.isAuthenticated = false;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    });
  }
});

export const { init } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export const selectLoading = (state: RootState) => state.user.isLoading;

export default userSlice.reducer;
