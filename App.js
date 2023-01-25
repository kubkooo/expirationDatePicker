import moment from 'moment';
import { ColorSet } from './assets/colorSet';
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

const datesCount = 29;

export default function App() {
  const [dates, setDates] = useState(getInitialDates());
  const [isJustInput, setIsJustInput] = useState(false);
  const [dateValue, setDateValue] = useState(undefined);

  function getInitialDates() {
    return getDates(
      undefined,
      datesCount - 1,
      { label: '...', date: null, style: styles.LastItem },
      { label: 'Del', date: moment().subtract(1, 'days'), style: styles.DeleteItem }
    );
  }

  function getMonthColor(date) {
    return (date.month() - moment().month()) % 2
      ? styles.OddMonth
      : styles.EvenMonth;
  }

  function getDates(start, count, lastElementLabel, firstItem = null) {
    const ret = firstItem ? [firstItem] : [];

    for (let i = 0; i < count; i++) {
      const date = moment(start).add(i, 'days');
      ret.push({
        label: date.format('DD.M.'),
        date: date,
        style: getMonthColor(date),
      });
    }

    ret.push(lastElementLabel);
    return ret;
  }

  function GetGridViewItem(item) {
    if (item.label === '...') {
      setDates(
        getDates(moment().add(datesCount - 1, 'days'), datesCount, {
          label: '?',
          date: undefined,
          style: styles.LastItem,
        })
      );
      return;
    }

    if (item.label === '?') {
      setIsJustInput(true);
      return;
    }
    setDateValue(item?.date);
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
        <View style={styles.MainWrapper}>
          <Text style={styles.Item}>Item: Fresh Milk 1L</Text>
          <Text style={styles.Barcode}>[ 316543154983125 ]</Text>
          <View style={styles.MainContainer}>
            <FlatList
              data={dates}
              renderItem={({ item }) => {
                return (
                  <View
                    style={[
                      styles.GridViewBlockStyle,
                      { backgroundColor: item?.style?.backgroundColor },
                    ]}>
                    <Text
                      style={styles.GridViewInsideTextItemStyle}
                      onPress={() => GetGridViewItem(item)}>
                      {item.label}
                    </Text>
                  </View>
                );
              }}
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
            color={Colors.dateTimePickerColor}
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
  MainWrapper: {
    flex: 1,
  },
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
    borderRadius: 10,
  },
  GridViewInsideTextItemStyle: {
    color: ColorSet.gridTextColor,
    padding: 5,
    fontSize: 14,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  Item: {
    marginTop: 20,
    color: ColorSet.itemColor,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // <-- the magic
  },
  Barcode: {
    marginVertical: 10,
    color: ColorSet.barcode,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // <-- the magic
  },
  DateValue: {
    marginTop: 250,
    color: ColorSet.dateValueColor,
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
    backgroundColor: ColorSet.resetButtonBackground,
    margin: 30,
  },
  ResetText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: ColorSet.resetButtonText,
  },
  LastItem: {
    backgroundColor: ColorSet.lastItemBackground,
  },
  DeleteItem: {
    backgroundColor: ColorSet.deleteItemBackground,
  },
  OddMonth: {
    backgroundColor: ColorSet.oddMonth,
  },
  EvenMonth: {
    backgroundColor: ColorSet.evenMonth,
  },
});
