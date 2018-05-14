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

export default class Counter extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { number, onAddPress, onSubPress } = this.props;
        return (
            <View style={styles.counterView} >
                <Button onPress={() => onSubPress(1)} title="Sub" />
                <Text>Counter: {number}</Text>
                <Button onPress={() => onAddPress(1)} title="Add" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    counterView: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
