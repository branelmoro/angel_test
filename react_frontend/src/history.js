import { createBrowserHistory, createMemoryHistory } from 'history';

const history = __isBrowser__ ? createBrowserHistory() : createMemoryHistory(); // eslint-disable-line

export default history;
