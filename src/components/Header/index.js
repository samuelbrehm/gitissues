import React from 'react';
import PropTypes from 'prop-types';

import { View, Text } from 'react-native';

import styles from './styles';

const Header = ({ title }) => (
  <View style={styles.container}>
    <View style={styles.left} />
    <Text style={styles.title}>{title}</Text>
    <View style={styles.right} />
  </View>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
