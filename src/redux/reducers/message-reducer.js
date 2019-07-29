import { SET_MESSAGE, SET_CHANNELS, SET_ORIGINS } from '../../constants';

const initialState = {
  success: [],
  failed: [],
  list: [],
  channelList: [],
  origins: [],
  originList: [],
  channels: [],
  origins: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return Object.assign({}, state, {
        success: action.messages.success,
        failed: action.messages.failed,
        list: action.messages.list,
        channels: action.messages.channels,
        origins: action.messages.origins
      });
    case SET_CHANNELS:
      return Object.assign({}, state, { channelList: action.channels });
    case SET_ORIGINS:
      return Object.assign({}, state, { originList: action.origins })
    default:
      return state;
  }
}
