import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Platform,
    TextInput,
    Text,
    TouchableOpacity,
    FlatList,
    View
} from 'react-native';

import AddView from './components/AddView';
import Counter from './components/Counter';
import TaskFlatList from './components/TaskFlatList';
import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import CounterContainer from './containers/CounterContainer';
import TaskFlatListContainer from './containers/TaskFlatListContainer';
import AddViewContainer from './containers/AddNewContainer';


//state (has only one)
// let appState = {
//     number: 1,
//     histories: [1],
//     errorMsg: ''
// }

//action (can have many)

// const add = {
//     type: 'ADD',
//     value: 1
// }

// const sub = {
//     type: 'SUB',
//     value: 1
// }


//reducer (can have many)

// const numberReducer = (state = appState, action) => {
//     switch (action.type) {
//         case 'ADD': {
//             const newValue = state.number + action.value;
//             state = {
//                 ...state,
//                 number: newValue,
//                 histories: [...state.histories, newValue]
//             }
//             break;
//         }
//         case 'SUB': {
//             const newValue = state.number - action.value;
//             state = {
//                 ...state,
//                 number: newValue,
//                 histories: [...state.histories, newValue]
//             }
//             break;
//         }
//     }
//     return state;
// }


// const errorReducer = (state = appState, action) => {
//     switch (action.type) {
//         case 'LESS_THAN_ZERO': {
//             state = {
//                 ...state,
//                 errorMsg: 'Number can not be less than zero'
//             }
//             break;
//         }
//     }
//     return state;
// }

// middleware

// const logger = store => next => action => {
//     console.log('State :', store.getState());
//     next(action);
//     console.log('State Updated: ', store.getState());
// }

// const checkIsZero = store => next => action => {
//     const currentNumber = store.getState().number.number;
//     if (currentNumber == 0) {
//         next({ type: 'LESS_THAN_ZERO' });
//     } else {
//         next(action);
//     }
//     console.log('Current Number: ', currentNumber);
// }

// //store
// const reducers = combineReducers({
//     number: numberReducer,
//     error: errorReducer
// });
// const store = createStore(reducers, applyMiddleware(logger, checkIsZero, thunk));

// store.dispatch(add);
// store.dispatch(sub);
// store.dispatch(sub);
// store.dispatch(sub);
// const addAfter3s = () => {
//     return dispatch => {
//         setTimeout(() => {
//             dispatch(add)
//         }, 3000);
//     }
// }

// store.dispatch(addAfter3s());


//state
let appState = {
    data: [
        { title: 'Go to the office', isFinished: true },
        { title: 'Prepare tasks for today', isFinished: false },
        { title: 'Team meeting', isFinished: false },
        { title: 'Commit tasks changed', isFinished: false },
    ]
}

//action


//reducer

const taskListReducer = (state = appState, action) => {
    let newTaskList = state.data;

    switch (action.type) {
        case 'ADD': {
            const newTask = { title: action.taskName, isFinished: false }
            return {
                ...state,
                data: [...state.data, newTask]
            }
        }
        case 'FINISH': {
            newTaskList[action.atIndex].isFinished = true
            console.log(newTaskList[action.atIndex]);
            return {
                ...state,
                data: newTaskList
            }
        }
        case 'DELETE': {
            newTaskList = newTaskList.filter((item, index) => index !== action.atIndex);
            return {
                ...state,
                data: newTaskList
            }
        }
    }
    return state;
}

const numberReducer = (state = { number: 1 }, action) => {
    switch (action.type) {
        case 'ADD_NUMBER': {
            return state = {
                ...state,
                number: state.number + action.value
            }
        }
        case 'SUB_NUMBER': {
            return state = {
                ...state,
                number: state.number - action.value
            }
        }
    }
    return state;
}


//store
const reducers = combineReducers({
    number: numberReducer,
    task: taskListReducer
});
const store = createStore(reducers);


export default class Application extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <AddViewContainer />
                    <CounterContainer />
                    <TaskFlatListContainer />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1F5FE'
    }
});