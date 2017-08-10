import React from 'react';
import { StyleSheet,
         ListView,
         Button,
         Text,
         TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Attendees extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  componentWillMount() {
    this.createDataSource(this.props);
  }

  createData({ users }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(users);
  }

  renderRow(user) {
    // return
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={ this.dataSource }
        renderRow={ this.renderRow }
      />
    );
  }
}

const styles = StyleSheet.create({

});
