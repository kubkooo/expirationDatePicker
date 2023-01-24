import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Platform,
  Pressable,
} from 'react-native';
import { Component } from 'react';

import Colors from './assets/colors'

import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';

class App extends Component {
  today = undefined;
  // today = '2023-12-24';
  // today = '2021-02-01';

  datesCount = 29;

  currentMonth = moment().month();

  colors = Colors;

  getMonthColor(date) {
    return ((date.month() - this.currentMonth) % 2) ? '#7e1b1e' : '#ac252a';
  }

  getDates(start, count, lastElementLabel, firstItem = null) {
    
    const ret = (firstItem) ? [firstItem] : [];

    for (let i = 0; i < count; i++) {
      const date = moment(start).add(i, 'days');
      ret.push([date.format('DD.M.'), date, this.getMonthColor(date)]);
    }

    ret.push(lastElementLabel);

    return ret;
  }

  getInitialDates() {
    return this.getDates(this.today, this.datesCount-1, ['...', undefined, '#7d5455'], ['DEL', moment().subtract(1, 'days'), '#7d5455']);
  }

  constructor(props) {
    super(props);

    this.state = {
      dates: this.getInitialDates(),
      isJustInput: false,
      dateValue: undefined,
    };
  }

  GetGridViewItem(item) {
    if (item[0] === '...') {
      this.setState({
        dates: this.getDates(
          moment(this.today).add(this.datesCount-1, 'days'),
          this.datesCount,
          ['?', undefined, '#7d5455']
        ),
      });
      return;
    }

    if (item[0] === '?') {
      this.setState({ isJustInput: true });
      // DateTimePickerAndroid.open({
      //   value: this.state.dateValue,
      //   onChange: ((_date) => {this.setState({dateValue: _date})}),
      //   mode: 'date',
      // });
      return;
    }

    this.setState({ dateValue: item[1] });

    // Alert.alert(item[0]);
  }

  render() {
    if (this.state.dateValue !== undefined) {
      return (
        <View>
          <Text style={styles.DateValue}>
            {`SELECTED DATE: ${moment(this.state.dateValue).format('DD.MM.YYYY')}`}
          </Text>
          <Pressable 
            onPress={() => {
              this.setState({ dateValue: undefined, isJustInput: false, dates: this.getInitialDates() });
            }}
            style={styles.ResetButton}        
          ><Text style={styles.ResetText}>Reset</Text></Pressable >
        </View>
      );
    } else {
      if (!this.state.isJustInput) {
        return (
          <View style={{ flex: 1 }}>
            <Text style={styles.Item}>Item: Fresh Milk 1L</Text>
            <Text style={styles.Barcode}>[ 316543154983125 ]</Text>
            <View style={styles.MainContainer}>
              <FlatList
                data={this.state.dates}
                renderItem={({ item }) => (
                  <View style={[styles.GridViewBlockStyle, {'backgroundColor': item[2]}]}>
                    <Text
                      style={styles.GridViewInsideTextItemStyle}
                      onPress={this.GetGridViewItem.bind(this, item)}>
                      {item[0]}
                    </Text>
                  </View>
                )}
                numColumns={5}
              />
            </View>
          </View>
        );
      }

      if (this.state.isJustInput) {
        return (
          <View style={styles.MainContainer}>
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date(moment().add(this.datesCount * 2))}
              mode={'date'}
              color={"#ac252a"}
              onChange={(_date) => {
                console.log(new Date(_date.nativeEvent.timestamp));
                this.setState({
                  dateValue: new Date(_date.nativeEvent.timestamp),
                });
              }}
            />
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    margin: 5,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  GridViewBlockStyle: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: 50,
    margin: 3,
    backgroundColor: 'dimgray',
    borderRadius: 10,
  },
  GridViewInsideTextItemStyle: {
    color: '#fff',
    // color: '#000',
    padding: 5,
    fontSize: 14,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  Item: {
    marginTop: 20,
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // <-- the magic
  },
  Barcode: {
    marginVertical: 10,
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // <-- the magic
  },
  DateValue: {
    marginTop: 250,
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // <-- the magic
  },
  ResetButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#ac252a',
    margin: 30
  },
  ResetText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default App;
