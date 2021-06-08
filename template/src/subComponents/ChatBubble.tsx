/*
********************************************
 Copyright © 2021 Agora Lab, Inc., all rights reserved.
 AppBuilder and all associated components, source code, APIs, services, and documentation 
 (the “Materials”) are owned by Agora Lab, Inc. and its licensors. The Materials may not be 
 accessed, used, modified, or distributed for any purpose without a license from Agora Lab, Inc.  
 Use without a license or in violation of any license terms and conditions (including use for 
 any purpose competitive to Agora Lab, Inc.’s business) is strictly prohibited. For more 
 information visit https://appbuilder.agora.io. 
*********************************************
*/
import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Linkify from 'react-linkify';
import ChatContext, {channelMessage} from '../components/ChatContext';
import ColorContext from '../components/ColorContext';

const ChatBubble = (props: channelMessage) => {
  const {userList} = useContext(ChatContext);
  const {primaryColor} = useContext(ColorContext);
  let {isLocal, msg, ts, uid} = props;
  let time = new Date(ts).getHours() + ':' + new Date(ts).getMinutes();
  return (
    <View>
      <View style={isLocal ? style.chatSenderViewLocal : style.chatSenderView}>
        <Text style={isLocal ? style.timestampTextLocal : style.timestampText}>
          {userList[uid] ? userList[uid].name : 'User'} | {time + ' '}
        </Text>
      </View>
      <View
        style={
          isLocal
            ? [style.chatBubbleLocal, {backgroundColor: primaryColor}]
            : style.chatBubble
        }>
        <Text
          style={isLocal ? style.whiteText : style.blackText}
          selectable={true}>
          <Linkify properties={{target: '_blank', style: {color: 'red', fontWeight: 'bold'}}}>{msg.slice(1) + ' '}</Linkify>
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  full: {
    flex: 1,
  },
  chatSenderViewLocal: {
    flex: 2,
    marginVertical: 2,
    flexDirection: 'row',
    marginRight: 15,
    // marginLeft: 30,
    justifyContent: 'flex-end',
  },
  chatSenderView: {
    flex: 2,
    marginVertical: 2,
    flexDirection: 'row',
    marginRight: 30,
    marginLeft: 15,
  },
  timestampText: {
    color: $config.PRIMARY_FONT_COLOR + '60',
    fontWeight: '500',
    fontSize: 12,
    flex: 1,
    // textAlign: 'right',
  },
  timestampTextLocal: {
    color: $config.PRIMARY_FONT_COLOR + '60',
    fontWeight: '500',
    fontSize: 12,
    flex: 1,
    textAlign: 'right',
  },
  chatBubble: {
    backgroundColor: $config.PRIMARY_FONT_COLOR + '80',
    flex: 1,
    // width: 'max-content',
    maxWidth: '80%',
    alignSelf: 'flex-start',
    display: 'flex',
    marginVertical: 5,
    padding: 8,
    marginRight: 30,
    marginLeft: 15,
    borderRadius: 10,
  },
  chatBubbleLocal: {
    backgroundColor: $config.PRIMARY_COLOR,
    maxWidth: '80%',
    flex: 1,
    display: 'flex',
    alignSelf: 'flex-end',
    marginVertical: 5,
    padding: 8,
    marginRight: 15,
    marginLeft: 30,
    borderRadius: 10,
  },
  whiteText: {
    color: $config.SECONDARY_FONT_COLOR,
    fontWeight: '500',
  },
  blackText: {
    color: $config.PRIMARY_FONT_COLOR,
    opacity: 0.9,
    fontWeight: '500',
  },
});

export default ChatBubble;
