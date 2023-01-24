import moment from 'moment';
import { Colors } from './assets/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Platform,
  Pressable,
} from 'react-native';

const today = undefined;
const datesCount = 29;
const currentMonth = moment().month();

export default function App() {
  const [dates, setDates] = useState(getInitialDates());
  const [isJustInput, setIsJustInput] = useState(false);
  const [dateValue, setDateValue] = useState(undefined);

  function getInitialDates() {
    return getDates(
      today,
      datesCount - 1,
      ['...', undefined, Colors.grey],
      ['DEL', moment().subtract(1, 'days'), Colors.grey]
    );
  }

  function getMonthColor(date) {
    return (date.month() - currentMonth) % 2
      ? Colors.darkerRed
      : Colors.darkRed;
  }

  function getDates(start, count, lastElementLabel, firstItem = null) {
    const ret = firstItem ? [firstItem] : [];

    for (let i = 0; i < count; i++) {
      const date = moment(start).add(i, 'days');
      ret.push([date.format('DD.M.'), date, getMonthColor(date)]);
    }

    ret.push(lastElementLabel);
    return ret;
  }

  function GetGridViewItem(item) {
    if (item[0] === '...') {
      setDates(
        getDates(moment(today).add(datesCount - 1, 'days'), datesCount, [
          '?',
          undefined,
          Colors.grey,
        ])
      );
      return;
    }

    if (item[0] === '?') {
      setIsJustInput(true);
      // DateTimePickerAndroid.open({
      //   value: this.state.dateValue,
      //   onChange: ((_date) => {this.setState({dateValue: _date})}),
      //   mode: 'date',
      // });
      return;
    }
    setDateValue(item[1]);
    // Alert.alert(item[0]);
  }

  if (dateValue !== undefined) {
    return (
      <View>
        <Text style={styles.DateValue}>
          {`SELECTED DATE: ${moment(dateValue).format('DD.MM.YYYY')}`}
        </Text>
        <Pressable
          onPress={() => {
            setDateValue(undefined);
            setIsJustInput(false);
            setDates(getInitialDates());
          }}
          style={styles.ResetButton}>
          <Text style={styles.ResetText}>Reset</Text>
        </Pressable>
      </View>
    );
  } else {
    if (!isJustInput) {
      return (
        <View style={{ flex: 1 }}>
          <Text style={styles.Item}>Item: Fresh Milk 1L</Text>
          <Text style={styles.Barcode}>[ 316543154983125 ]</Text>
          <View style={styles.MainContainer}>
            <FlatList
              data={dates}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.GridViewBlockStyle,
                    { backgroundColor: item[2] },
                  ]}>
                  <Text
                    style={styles.GridViewInsideTextItemStyle}
                    onPress={() => GetGridViewItem(item)}>
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

    if (isJustInput) {
      return (
        <View style={styles.MainContainer}>
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(moment().add(datesCount * 2))}
            mode={'date'}
            color={Colors.darkRed}
            onChange={(_date) => {
              setDateValue(new Date(_date.nativeEvent.timestamp));
            }}
          />
        </View>
      );
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
    backgroundColor: Colors.dimgray,
    borderRadius: 10,
  },
  GridViewInsideTextItemStyle: {
    color: Colors.white,
    padding: 5,
    fontSize: 14,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  Item: {
    marginTop: 20,
    color: Colors.black,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // <-- the magic
  },
  Barcode: {
    marginVertical: 10,
    color: Colors.black,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // <-- the magic
  },
  DateValue: {
    marginTop: 250,
    color: Colors.black,
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
    backgroundColor: Colors.darkRed,
    margin: 30,
  },
  ResetText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: Colors.white,
  },
});
