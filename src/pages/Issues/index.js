import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View, StatusBar, Text, ActivityIndicator, FlatList,
} from 'react-native';

import api from '~/services/api';

import styles from './styles';

export default class Issues extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title'),
  });

  state = {
    issues: [],
    loading: true,
    error: '',
    refreshing: false,
  };

  componentDidMount() {
    this.loadIssues();
  }

  loadIssues = async () => {
    this.setState({ refreshing: true });

    const { navigation } = this.props;

    try {
      const { data } = await api.get(`/repos/${navigation.getParam('full_name')}/issues`);

      this.setState({ issues: data });
    } catch (err) {
      this.setState({ error: 'Erro ao recuperar issues' });
    } finally {
      this.setState({ loading: false, refreshing: false });
    }
  };

  renderListItem = ({ item }) => <IssueItem issue={item} />;

  renderList = () => {
    const { issues, refreshing } = this.state;

    return !issues.length ? (
      <Text style={styles.empty}>Nenhuma issue encontrada</Text>
    ) : (
      <FlatList
        data={issues}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadIssues}
        refreshing={refreshing}
        style={styles.listContainer}
      />
    );
  };

  render() {
    const { loading, error } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {!!error && <Text style={styles.error}>{error}</Text>}
        {loading ? <ActivityIndicator size="large" style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
}
