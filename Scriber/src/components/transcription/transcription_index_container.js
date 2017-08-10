import merge from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import {selectAllTranscriptions} from '../../reducers/selectors';
import { fetchTranscriptions } from '../../actions/transcription_actions';
import TranscriptionIndexItem from './transcription_index_item';

class TranscriptionIndex extends Component {

  componentWillMount() {
    this.props.fetchTranscriptions();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ transcriptions }) {
    console.log(transcriptions);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(transcriptions);
  }

  renderRow(transcription) {
    return <TranscriptionIndexItem transcription={transcription} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => ({
  transcriptions: selectAllTranscriptions(state)
});

export default connect(mapStateToProps, {fetchTranscriptions})(TranscriptionIndex);
