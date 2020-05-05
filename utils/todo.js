import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Switch,
} from 'react-native';

export default class Todo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Switch
          value={this.props.todo.checked}
          onValueChange={this.props.toggleTodo}
        />
        <Text>{this.props.todo.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
