import {Action, action} from 'easy-peasy';

export type User = {
  email: string,
  emailVerified: boolean,
  apiKey: string,
  createdAt: string
  stsTokenManager:  {
    accessToken: string,
    tenantId: number,
    uid: string,
  }
}

export interface Model {
  user: User
  isAuth: boolean;
  token: string;
  setAuthenticated: Action<Model, string>;
  logOut: Action<Model>;
  location: string;
  isDarkMode: boolean;
  articles: any[];
  addArticle: Action<Model, any>;
  isLocal: boolean;
  removeArticle: Action<Model, any>;
  removeAllArticles: Action<Model>;
  toggleTheme: Action<Model>;
  updateUser: Action<this, User>;
  updateAccessToken: Action<this, string>;
}


const model: Model = {
  /*  USER */
  user: {
    email: '',
    emailVerified: false,
    apiKey: '',
    createdAt: '',
    stsTokenManager:  {
      accessToken: '',
      tenantId: 0,
      uid: '',
    }
  },
  /* AUTHENTICATION */
  isAuth: false,
  token: '',
  setAuthenticated: action((state, payload) => {
    state.isAuth = true;
    state.token = payload;
  }),
  logOut: action(state => {
    state.isAuth = false;
    state.token = '';
  }),
  /* SETTINGS */
  location: 'Johannesburg',
  /* AUTHENTICATION */
  isDarkMode: false,
  articles: [],
  isLocal: true,
  /** Actions */
  addArticle: action((state, payload) => {
    state.articles.push(payload);
  }),
  removeArticle: action((state, payload) => {
    state.articles.forEach((article, index) => {
      if (article.id === payload) {
        state.articles.splice(index, 1);
      }
    });
  }),
  removeAllArticles: action(state => {
    state.articles = [];
  }),
  // Change The Theme
  toggleTheme: action(state => {
    state.isDarkMode = false;
  }),
  updateUser: action((state, payload) => {
    const oldState = state
    oldState.user = payload
  }),
  updateAccessToken: action((state, payload) => {
    const oldState = state
    oldState.token = payload
  })
};

export default model;
