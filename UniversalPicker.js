import React, { Component } from "react";
import ReactNative, {
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActionSheetIOS
} from "react-native";

export default class Picker extends Component {
  static Item = ReactNative.Picker.Item;

  handlePress() {
    const { children, onValueChange } = this.props;
    const labels = children.map(child => child.props.label);
    const values = children.map(child => child.props.value);
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...labels, "Cancel"],
        cancelButtonIndex: labels.length
      },
      index => {
        if (index < labels.length) {
          onValueChange(values[index]);
        }
      }
    );
  }

  render() {
    const { children, style } = this.props;
    const labels = children.map(child => child.props.label);
    const values = children.map(child => child.props.value);

    if (Platform.OS === "ios") {
      const { selectedValue } = this.props;
      let textData = labels[0];
      if (selectedValue) {
        textData = labels[values.indexOf(selectedValue)];
      }
      return (
        <TouchableOpacity
          onPress={this.handlePress.bind(this)}
          style={{
            alignSelf: "stretch",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            paddingHorizontal: 6,
            height: 33
          }}
        >
          <Text style={{ flex: 1 }}>
            {textData}
          </Text>
          <Text style={{ color: "black" }}>▼</Text>
        </TouchableOpacity>
      );
    } else {
      return <ReactNative.Picker {...this.props} />;
    }
  }
}
