import React from 'react';
import { View, Text } from 'react-native';
import initials from 'initials';

class TextAvatar extends React.Component {
  constructor(props) {
    super(props);
  }

  getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  render() {
    const { children, size = 60, textColor = '#fff', type, style } = this.props;

    if (typeof children !== 'string') throw new Error('Children must be only a string');
    const abbr = initials(children).toUpperCase();

    if (typeof size !== 'number') throw new Error('Size must be an integer');

    const containerStyle = {
      width: size * 1.5, 
      height: size,
      backgroundColor: this.getRandomColor(),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: type === 'circle' ? size / 2 : 0,
    };

    const textStyle = {
      color: textColor,
      fontSize: size / 3.14,
      fontWeight: 'bold',
      letterSpacing: 1,
    };

    return (
      <View style={[style, containerStyle]}>
        <Text style={textStyle} adjustsFontSizeToFit={true}>
          {abbr}
        </Text>
      </View>
    );
  }
}

export default TextAvatar;
