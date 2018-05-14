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


//state (has only one)
let appState = {
    number: 1,
    histories: [1],
    errorMsg: ''
}

//action (can have many)

const add = {
    type: 'ADD',
    value: 1
}

const sub = {
    type: 'SUB',
    value: 1
}


//reducer (can have many)

const numberReducer = (state = appState, action) => {
    switch (action.type) {
        case 'ADD': {
            const newValue = state.number + action.value;
            state = {
                ...state,
                number: newValue,
                histories: [...state.histories, newValue]
            }
            break;
        }
        case 'SUB': {
            const newValue = state.number - action.value;
            state = {
                ...state,
                number: newValue,
                histories: [...state.histories, newValue]
            }
            break;
        }
    }
    return state;
}


const errorReducer = (state = appState, action) => {
    switch (action.type) {
        case 'LESS_THAN_ZERO': {
            state = {
                ...state,
                errorMsg: 'Number can not be less than zero'
            }
            break;
        }
    }
    return state;
}

// middleware

const logger = store => next => action => {
    console.log('State :', store.getState());
    next(action);
    console.log('State Updated: ', store.getState());
}

const checkIsZero = store => next => action => {
    const currentNumber = store.getState().number.number;
    if (currentNumber == 0) {
        next({ type: 'LESS_THAN_ZERO' });
    } else {
        next(action);
    }
    console.log('Current Number: ', currentNumber);
}

//store
const reducers = combineReducers({
    number: numberReducer,
    error: errorReducer
});
const store = createStore(reducers, applyMiddleware(logger, checkIsZero));

store.dispatch(add);
store.dispatch(sub);
store.dispatch(sub);
store.dispatch(sub);





export default class Application extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [
                { title: 'Go to the office', isFinished: true },
                { title: 'Prepare tasks for today', isFinished: false },
                { title: 'Team meeting', isFinished: false },
                { title: 'Commit tasks changed', isFinished: false },
            ]
        }
    }

    onAddNewTask = (taskName) => {
        const newTask = { title: taskName, isFinished: false }
        const newTaskList = [...this.state.data, newTask]

        this.setState({ data: newTaskList });
    }

    onFinishedItem = (index) => {
        let newTaskList = this.state.data;
        newTaskList[index].isFinished = true;
        this.setState({ data: newTaskList });
    }

    onDeleteItem = (index) => {
        let newTaskList = this.state.data.filter((item, i) => i != index);
        this.setState({ data: newTaskList });
    }

    render() {
        return (
            <View style={styles.container}>
                <AddView onAddNewTask={this.onAddNewTask} />
                <Counter />
                <TaskFlatList
                    listData={this.state.data}
                    onFinishedItem={this.onFinishedItem}
                    onDeleteItem={this.onDeleteItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1F5FE'
    }
});