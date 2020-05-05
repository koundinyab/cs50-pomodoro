import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { vibrate, Todo, CommonModal } from './utils/index';
let id = 0;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      displayMins: 'mm',
      displaySecs: 'ss',
      count: 0,
      todos: [
      ],
      modalVisible: false,
      modalText: '',
      modalButtonText: ''
    }
    this.interval;
  }

  closeModal = () => {
    this.setState({
      modalVisible: false,
      modalButtonText: '',
      modalText: ''
    })
  }

  addTodo = () => {
    if (this.state.todos.length < 4) {
      const todoText = `task ${id}`;
      this.setState({
        todos: [
          ...this.state.todos,
          {
            id: id++,
            text: todoText,
            checked: false,
          },
        ],
      });
    } else {
      this.setState({
        modalVisible: true,
        modalText: 'complete the four tasks fist to add more!!',
        modalButtonText: 'Lets do it'
      })
    }
  }

  /**
   * Function to toggle todo
   */
  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo;
        else {
          return {
            id: todo.id,
            text: todo.text,
            checked: !todo.checked,
          };
        }
      }),
    });
  }

  clearAllTodos = () => {
    this.setState({
      todos: []
    });
  }

  checkTodoStatus () {
    if (this.state.todos.every((todo)=> todo.checked)) {
      this.clearAllTodos();
      vibrate();
      return 'Time for a long break';
    } else {
      vibrate();
      return  'Time for a short break';
    }
  }

  timer = () => {
    if (this.state.todos.length < 4) {
      this.setState({
        modalVisible: true,
        modalText: 'Need to enter tasks to start the timer',
        modalButtonText: 'Lets do it'
      })
    } else {
      this.interval = setInterval(() => {
        this.setState(prevState => ({
          count: prevState.count + 1,
        }));
        const calcSeconds = () => {
          if (this.state.count < 10) return `0${this.state.count.toString()}`;
          if (this.state.count > 60) {
            if ((this.state.count % 60) < 10) return `0${(this.state.count % 60).toString()}`;
            else return (this.state.count % 60).toString();
          } else return this.state.count.toString();
        };
        let secs = calcSeconds();
        const calcMinutes = () => {
          const mins = Math.floor(this.state.count / 60);
          if (mins < 10) return `0${mins}`
          else return mins.toString();
        }
        let mins = calcMinutes();
        if (parseInt(mins, 10) === 1) {
          this.resetTimer();
          secs = 'ss'; mins = 'mm';
          const modalText = this.checkTodoStatus();     
          this.setState({
            count: 0,
            modalVisible: true,
            modalText: modalText,
            modalButtonText: 'Back to task page'
          })
        }
        this.setState({
          displaySecs: secs,
          displayMins: mins
        })
      }, 1000)
    }
  }

  resetTimer = () => {
    clearInterval(this.interval);
  }

  render() {
    return (
      <View style={styles.container}>
        <CommonModal
          modalVisible={this.state.modalVisible}
          modalText={this.state.modalText}
          modalButtonText={this.state.modalButtonText}
          closeModal= {this.closeModal} 
        ></CommonModal>
        <View style={styles.scrollView}>
          <Button title={'Add todo'} onPress={this.addTodo} />
          <ScrollView>
            {this.state.todos.map(todo => {
              return (
                <Todo
                  key= {todo.id}
                  todo={todo}
                  toggleTodo={() => this.toggleTodo(todo.id)}
                />
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.timer}>
          <Button onPress={this.timer} title="Start timer"></Button>
          <Text>{this.state.displayMins}:{this.state.displaySecs}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    flexDirection: 'row',
  },
  timer: {
    flex: 1,
    alignItems: 'center'
  }
});
