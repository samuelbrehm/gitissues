import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Button,
  AsyncStorage,
  ActivityIndicator,
  Text,
} from 'react-native';

import api from '~/services/api';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

export default class Repositories extends Component {
  static navigationOptions = {
    title: 'GitIssues',
  };

  state = {
    repositoryInput: '',
    repositories: [],
    loadingList: false,
    loadingButton: false,
    error: '',
    refreshing: false,
  };

  addRepository = async () => {
    const {
      repositoryInput, repositories, loadingList, loadingButton, error,
    } = this.state;

    if (loadingList) return;

    this.setState({ loadingButton: true });

    if (!repositoryInput) {
      this.setState({ error: 'Preencha o repositório para continuar', loadingButton: false });
      return;
    }

    try {
      const { data } = await api.get(`/repos/${repositoryInput}`);

      this.setState({ repositoryInput: '', error: '', repositories: [...repositories, data] });

      await AsyncStorage.setItem(
        '@GitIssues:repositories',
        JSON.stringify([...repositories, data]),
      );
    } catch (err) {
      this.setState({ error: 'Repositório inexistente', repositoryInput: '' });
    } finally {
      this.setState({ loadingButton: false });
    }
  };

  render() {
    const { repositoryInput, loadingButton, error } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.formInput}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Adicionar novo repositório"
              value={repositoryInput}
              onChangeText={text => this.setState({ repositoryInput: text })}
            />
            <TouchableOpacity onPress={this.addRepository}>
              {loadingButton ? (
                <ActivityIndicator size="small" />
              ) : (
                <Icon name="plus" size={20} style={styles.formIcon} />
              )}
            </TouchableOpacity>
          </View>
          {!!error && <Text style={styles.error}>{error}</Text>}
        </View>
        {/* <Button title="Issues" onPress={() => this.props.navigation.navigate('Issues')} /> */}
      </View>
    );
  }
}
