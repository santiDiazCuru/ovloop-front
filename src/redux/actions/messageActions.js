import axios from 'axios';
import { SET_MESSAGE, SET_CHANNELS, SET_ORIGINS } from '../../constants';

export const receiveMessages = (messages) => ({
    type: SET_MESSAGE,
    messages,
});

export const setChannels = (channels) => ({
    type: SET_CHANNELS,
    channels
})
export const setOrigins = (origins) => ({
    type: SET_ORIGINS,
    origins
})

export const fetchMessages = () => dispatch => {
    return axios.post('/stats', {})
        .then(res => res.data)
        .then(messages => {
            const messagesToReducer = sortMessages(messages)
            console.log(messagesToReducer)
            dispatch(receiveMessages(messagesToReducer))
        })
};

export const fetchMessagesByDate = (from, to, filter) => dispatch => {
    return axios.post('/stats', { from: from, to: to, filter: filter })
        .then(res => res.data)
        .then(messages => {
           const messagesToReducer = sortMessages(messages)
            dispatch(receiveMessages(messagesToReducer))
        })
};

export const fetchMessagesByChannel = (channel) => dispatch => {
    return axios.post('/stats', { channel: channel })
        .then(res => res.data)
        .then(messages => {
            const messagesToReducer = sortMessages(messages)
            dispatch(receiveMessages(messagesToReducer))
        })
}

export const fetchMessagesByOrigin = (origin) => dispatch => {
    return axios.post('/stats', { origin: origin })
        .then(res => res.data)
        .then(messages => {
            const messagesToReducer = sortMessages(messages)
            dispatch(receiveMessages(messagesToReducer))
        })
}

export const fetchOriginList = () => dispatch => {
    return axios.get('/stats/getorigins')
        .then(origins => origins.data)
        .then(origins => {
            dispatch(setOrigins(origins))
        })
}

export const fetchChannelsList = () => dispatch => {
    return axios.get('/stats/getchannels')
        .then(channels => channels.data)
        .then(channels => {
            dispatch(setChannels(channels))
        })
}

const sortMessages = (messages) =>{
    const total = messages.length;
    var origins = {};
    var channels = {};
    let messagesToReducer = { success: [], failed: [], list: messages, channels: [], origins: [] };
    messages.map((message => {
        origins[message.origin] = origins[message.origin] || {total: 0, percentage: '', success: 0, failed: 0, list: []};
        origins[message.origin].total = origins[message.origin].total +1
        origins[message.origin].list.push(message)
        channels[message.channel] = channels[message.channel] || {total: 0, percentage: '', success: 0, failed: 0, list: []};
        channels[message.channel].total = channels[message.channel].total +1
        channels[message.channel].list.push(message)
        message.status === 'success' ? origins[message.origin].success += 1 : origins[message.origin].failed += 1
        message.status === 'success' ? channels[message.channel].success += 1 : channels[message.channel].failed += 1
        message.status == 'success' ? messagesToReducer.success.push(message) : messagesToReducer.failed.push(message);        
    }))
    for (const key in origins){
        origins[key]['name'] = `${key}`
        origins[key].percentage = `: ${Math.round((origins[key].total/total)*100)}%` 
        messagesToReducer.origins.push(origins[key])
    }
    for (const key in channels){
        channels[key]['name'] = `${key}`
        channels[key].percentage = `: ${Math.round((channels[key].total/total)*100)}%` 
        messagesToReducer.channels.push(channels[key])
    }        
    return messagesToReducer
}