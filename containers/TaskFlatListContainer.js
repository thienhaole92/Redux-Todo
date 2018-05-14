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
import TaskFlatList from '../components/TaskFlatList';

class TaskFlatListContainer extends Component {
    render() {
        console.log(this.props);
        const { data } = this.props.state;
        console.log(data);
        return (
            <TaskFlatList data={data}{...this.props} />
        );
    }
}

const finishTask = (index) => {
    return {
        type: 'FINISH',
        atIndex: index
    }
}

const deleteTask = (index) => {
    return {
        type: 'DELETE',
        atIndex: index
    }
}

export default connect(
    state => {
        return {
            state: state.task
        }
    },
    dispatch => {
        return {
            onFinishedItem: (index) => dispatch(finishTask(index)),
            onDeleteItem: (index) => dispatch(deleteTask(index))
        }
    }
)(TaskFlatListContainer);