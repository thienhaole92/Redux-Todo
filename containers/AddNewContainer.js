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
import { connect } from 'react-redux';
import AddView from '../components/AddView';

class AddViewContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { onAddNewTask } = this.props;
        return (
            <AddView onAddNewTask={onAddNewTask} />
        );
    }
}


//Action

const addTask = (name) => {
    return {
        type: 'ADD',
        taskName: name
    }
}

export default connect(
    state => {
        return {

        }
    },
    dispatch => {
        return {
            onAddNewTask: (name) => dispatch(addTask(name))
        }
    }
)(AddViewContainer);