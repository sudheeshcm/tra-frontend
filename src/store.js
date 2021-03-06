import { init } from '@rematch/core';
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';
import { createBrowserHistory as createHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createLoadingPlugin from '@rematch/loading';
import models from '@Root/models';
import routerReducer from '@Root/routerReducer';

const middlewares = [];
export const history = createHistory();
const isProduction = process.env.NODE_ENV === 'production';

middlewares.push(routerMiddleware(history));

if (!isProduction) {
  middlewares.push(
    immutableStateInvariantMiddleware({
      ignore: [
        'loading',
        'document.file',
        'document.currentDocument',
        'multiDocuments.files',
        'multiDocuments.documents',
      ],
    }),
  );
}

const store = init({
  models,
  plugins: [createLoadingPlugin({})],
  redux: {
    reducers: {
      router: routerReducer(history),
    },
    devtoolOptions: {
      disabled: isProduction,
    },
    middlewares,
  },
});

export const { dispatch } = store;
export default store;
