jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  const createIcon = (familyName) => (props) =>
    React.createElement(Text, { ...props, accessibilityLabel: `${familyName}-${props?.name ?? ''}` }, null);
  return {
    MaterialCommunityIcons: createIcon('MaterialCommunityIcons'),
    MaterialIcons: createIcon('MaterialIcons'),
    Ionicons: createIcon('Ionicons'),
    AntDesign: createIcon('AntDesign'),
    Entypo: createIcon('Entypo'),
    EvilIcons: createIcon('EvilIcons'),
    Feather: createIcon('Feather'),
    FontAwesome: createIcon('FontAwesome'),
    FontAwesome5: createIcon('FontAwesome5'),
    Fontisto: createIcon('Fontisto'),
    Foundation: createIcon('Foundation'),
    Octicons: createIcon('Octicons'),
    SimpleLineIcons: createIcon('SimpleLineIcons'),
    Zocial: createIcon('Zocial'),
  };
});
