import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Platform,
    Button,
    Text,
    TouchableOpacity,
    FlatList,
    View
} from 'react-native';
import { connect } from 'react-redux';
import Counter from '../components/Counter';

class CounterContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { onAddPress, onSubPress } = this.props;
        const { number } = this.props.state;
        return (
            // <Counter number={number}{...this.props} />
            <Counter
                number={number}
                onAddPress={onAddPress}
                onSubPress={onSubPress} />
        );
    }
}


const addNumber = (number) => {
    return {
        type: 'ADD_NUMBER',
        value: number
    }
}

const subNumber = (number) => {
    return {
        type: 'SUB_NUMBER',
        value: number
    }
}

export default connect(
    state => {
        return {
            state: state.number
        }
    },
    dispatch => {
        return {
            onAddPress: (number) => dispatch(addNumber(number)),
            onSubPress: (number) => dispatch(subNumber(number))
        }
    }
)(CounterContainer);