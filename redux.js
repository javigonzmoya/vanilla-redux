// Redux
const createStore = (reducer) => {
  let state;
  let listeners = [];
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    console.log({ listeners });
    console.log({ action });
    console.log({ state });
    listeners.forEach((listener) => listener());
  };
  const subscribe = (listener) => {
    listeners.push(listener);
    return {
      unsubscribe: () => {
        listeners = listeners.filter((l) => l !== listener);
      },
    };
  };
  dispatch({});
  return { getState, dispatch, subscribe };
};

//actions
const INCREASE_COUNTER = 'INCREASE_COUNTER';
const DECREASE_COUNTER = 'DECREASE_COUNTER';

function increaseCounter(amount) {
  return {
    type: INCREASE_COUNTER,
    payload: amount,
  };
}

function decreaseCounter(amount) {
  return {
    type: DECREASE_COUNTER,
    payload: amount,
  };
}

//reducers
function counterReducer(
  state = { count: 0, increaseClicks: 0, decreaseClicks: 0 },
  action
) {
  switch (action.type) {
    case INCREASE_COUNTER:
      return {
        ...state,
        count: state.count + action.payload,
        increaseClicks: state.increaseClicks + 1,
      };
    case DECREASE_COUNTER:
      return {
        ...state,
        count: state.count - action.payload,
        decreaseClicks: state.decreaseClicks + 1,
      };
    default:
      return state;
  }
}

//declare store
let store = createStore(counterReducer);

//reference UI elements
const increaseCounterButton = document.querySelector('#increaseCounterButton');
const decreaseCounterButton = document.querySelector('#decreaseCounterButton');
const unsubscribeButton = document.querySelector('#unsubscribe');
const countLabel = document.querySelector('#countLabel');

//dispatch actions on buttons click
increaseCounterButton.addEventListener('click', () => {
  store.dispatch(increaseCounter(1));
});
decreaseCounterButton.addEventListener('click', () => {
  store.dispatch(decreaseCounter(1));
});

//render cycle that gets called every time the store is modified
const render = () => {
  //get current state
  const state = store.getState();
  //update UI based on current state
  countLabel.innerHTML = state.count;
  increaseCounterButton.innerHTML = `+ (${state.increaseClicks})`;
  decreaseCounterButton.innerHTML = `+ (${state.decreaseClicks})`;
};

//const render2 = () => {};

render();
const subcription = store.subscribe(render);
//const subcription2 = store.subscribe(render2);
// console.log({ subcription });

// unsubscribeButton.addEventListener('click', () => {
//   subcription.unsubscribe();
// });
