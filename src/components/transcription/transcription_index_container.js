import merge from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import {selectAllTranscriptions} from '../../reducers/selectors';
import { fetchTranscriptions } from '../../actions/transcription_actions';
import {Agenda} from 'react-native-calendars';
import {Actions} from 'react-native-router-flux';


class TranscriptionIndex extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      items: {}
    };
  }

  componentWillMount() {
    this.props.fetchTranscriptions();
  }

  render() {
    return (
        <Agenda
          style={styles.agenda}
          items={this.state.items}
          selected={this.fiveDaysAgo()}
          loadItemsForMonth={this.loadItems.bind(this)}
          renderItem={this.renderItem.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          renderEmptyDate={() => {return (<View />);}}
        />
    );
  }

  loadItems(day) {
  setTimeout(() => {
    for (let i = -50; i < 20; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      if (!this.state.items[strTime]) {
        this.state.items[strTime] = [];
        for (let j = 0; j < this.props.transcriptions.length; j++) {
          if (strTime === this.props.transcriptions[j].created_date) {
            this.state.items[strTime].push({
              name: this.props.transcriptions[j].title,
              transcription: this.props.transcriptions[j],
              height: 100
            });
          }
        }
      }
    }
    const newItems = {};
    Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  onRowPress(transcriptionPk) {
    Actions.TranscriptionShow({ transcriptionPk: transcriptionPk });
  }

  renderItem(item) {
    return (
      <TouchableWithoutFeedback transcriptionPk={item.transcription.pk} onPress={() => this.onRowPress(item.transcription.pk)}>
        <View style={[styles.item, {height: item.height}]}>
          <Text>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  fiveDaysAgo() {
    let d = new Date();
    d.setDate(d.getDate()-5);
    return d.toISOString().split('T')[0];
  }

}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },

});

const mapStateToProps = state => ({
  transcriptions: selectAllTranscriptions(state)
});

export default connect(mapStateToProps, {fetchTranscriptions})(TranscriptionIndex);
