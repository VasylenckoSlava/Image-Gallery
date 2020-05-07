// @flow
import * as React from 'react'
import { Platform, StatusBar, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'

import HomeView from '../../screens/Home'
import { fetchPictures } from './actions'
import {getToken} from "../../services/API";

export interface Props {
  navigation: any,
  fetchPictures: Function,
  pictures: Array<Object>,
  isLoading: boolean,
}

export interface State {}

class HomeContainer extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  }

  constructor (props) {
    super(props)
    StatusBar.setBarStyle('light-content')
    Platform.OS === 'android' && StatusBar.setBackgroundColor('#000')
    this.onRefresh = this.onRefresh.bind(this)
    this.onLoadNext = this.onLoadNext.bind(this)
  }

  async componentDidMount () {
    let token = await AsyncStorage.getItem("token");
    this.receiveToken();
    this.onRefresh()
  }

  receiveToken(): void {
    getToken().then(res => {
      const token = res.data.token;
      AsyncStorage.setItem("token", token);
    });
  }

  onRefresh (): void {
    this.props.fetchPictures(1)
  }

  onLoadNext (): void {
    // TODO: implement me
    // this.props.fetchPictures(page + 1);
  }

  render () {
    return <HomeView {...this.props}
      onRefresh={this.onRefresh}
      onLoadNext={this.onLoadNext} />
  }
}

function bindAction (dispatch) {
  return {
    fetchPictures: page => dispatch(fetchPictures(page)),
  }
}

const mapStateToProps = state => ({
  pictures: state.homeReducer.pictures,
  page: state.homeReducer.page,
  isLoading: state.homeReducer.isLoading,
})

export default connect(mapStateToProps, bindAction)(HomeContainer)
