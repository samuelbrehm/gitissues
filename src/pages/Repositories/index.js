import React from 'react';

import { View } from 'react-native';

import Header from '~/components/Header';

import styles from './styles';

const Repositories = () => (
  <View style={styles.container}>
    <Header title="GitIssues" />
  </View>
);

export default Repositories;
