import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import CounterItemStyle from 'Components/CounterItem/CounterItem.style';
import useStyle from 'Components/ThemeProvider/useStyle';

type Props = {
  count?: 1 | 2 | 3;
};

const CounterItem = ({ count }: Props): JSX.Element => {
  const [tally, setTally] = useState(0);
  const counterCountCollapsed =
    count === undefined || count < 0 || count > 3 ? 1 : count;

  const onTap = useCallback(() => setTally(tally + 1), [tally, setTally]);

  const style = useStyle(CounterItemStyle);

  return (
    <TouchableOpacity
      onPress={onTap}
      style={style.background[counterCountCollapsed]}
    >
      <Text style={style.text}>{tally}</Text>
    </TouchableOpacity>
  );
};

CounterItem.defaultProps = {
  count: 1,
};

export default CounterItem;
