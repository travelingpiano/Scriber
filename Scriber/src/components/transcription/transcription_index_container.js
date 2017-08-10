import merge from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import {selectAllTranscriptions} from '../../reducers/selectors';
import { fetchTranscriptions } from '../../actions/transcription_actions';
import TranscriptionIndexItem from './transcription_index_item';
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
    console.log(this.props);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ transcriptions }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(transcriptions);
  }

  renderRow(transcription) {
    return <TranscriptionIndexItem transcription={transcription} />;
  }

  render() {
    console.log(this.state.items);
    return (
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={'2017-08-09'}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          monthFormat={'yyyy'}
          renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        />
    );
  }

  loadItems(day) {
  setTimeout(() => {
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      if (!this.state.items[strTime]) {
        this.state.items[strTime] = [];
        for (let j = 0; j < this.props.transcriptions.length; j++) {
          if (strTime === this.props.transcriptions[j].created_date) {
            this.state.items[strTime].push({
              name: this.props.transcriptions[j].title,
              transcription: this.props.transcriptions[j],
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
    }
    console.log(this.state.items);
    const newItems = {};
    Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
  // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  onRowPress(transcription) {
    Actions.TranscriptionShow({ transcription: transcription });
  }

  renderItem(item) {
    return (
      <TouchableWithoutFeedback transcription={item.transcription} onPress={() => this.onRowPress(item.transcription)}>
        <View style={[styles.item, {height: item.height}]}>
          <Text>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
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
  }
});

const mapStateToProps = state => ({
  transcriptions: selectAllTranscriptions(state)
});

export default connect(mapStateToProps, {fetchTranscriptions})(TranscriptionIndex);
