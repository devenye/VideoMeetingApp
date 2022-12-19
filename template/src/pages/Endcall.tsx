import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Dimensions, Platform} from 'react-native';
import PrimaryButton from '../atoms/PrimaryButton';
import TertiaryButton from '../atoms/TertiaryButton';
import Spacer from '../atoms/Spacer';
import {Logo} from '../components/common';
import {useHistory} from '../components/Router';
import StorageContext from '../components/StorageContext';
import ThemeConfig from '../theme';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';

const Timer = () => {
  const [seconds, setSeconds] = useState(60);
  const history = useHistory();

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => {
      clearInterval(timerInterval); //when user exits, clear this interval.
    };
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      history.push('/');
      StopForegroundService();
    }
  }, [seconds]);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: $config.PRIMARY_ACTION_BRAND_COLOR,
        borderWidth: 3,
        borderRadius: 30,
        minHeight: 40,
        minWidth: 40,
      }}>
      <Text
        style={{
          padding: 12,
          minHeight: 40,
          minWidth: 40,
          fontFamily: ThemeConfig.FontFamily.sansPro,
          fontWeight: '700',
          fontSize: 14,
          lineHeight: 18,
          textAlign: 'center',
          color: $config.FONT_COLOR,
        }}>
        {seconds}
      </Text>
    </View>
  );
};

/* For android only, bg audio */
const StopForegroundService = () => {
  if (Platform.OS === 'android') {
    ReactNativeForegroundService.stop();
    console.log('stopping foreground service');
  }
};

const Endcall = () => {
  const leftMeetingLabel = 'You have left the meeting.';
  const rejoinBtnLabel = 'REJOIN';
  const createMeetingLabel = 'START NEW MEETING';
  const returnToHomeLabel = 'Returning to the home screen';
  const {store} = useContext(StorageContext);
  const history = useHistory();

  const [dim, setDim] = useState<[number, number]>([
    Dimensions.get('window').width,
    Dimensions.get('window').height,
  ]);
  const onLayout = (e: any) => {
    setDim([e.nativeEvent.layout.width, e.nativeEvent.layout.height]);
  };
  const isDesktop = dim[0] > dim[1] + 150;

  const reJoin = () => {
    history.push(store.lastMeetingPhrase);
    StopForegroundService();
  };
  const goToCreate = () => {
    history.push('/');
    StopForegroundService();
  };
  return (
    <View style={styles.main} onLayout={onLayout}>
      <View
        style={[styles.contentContainer, isDesktop && {alignItems: 'center'}]}>
        <View style={{alignSelf: 'center'}}>
          <Logo />
        </View>
        <Spacer size={20} />
        <Text
          style={[
            styles.heading,
            !isDesktop && {fontSize: 20, lineHeight: 25},
          ]}>
          {leftMeetingLabel}
        </Text>
        <Spacer size={40} />
        <View
          style={isDesktop ? styles.btnContainer : styles.btnContainerMobile}>
          <TertiaryButton
            containerStyle={{
              paddingVertical: 17,
              minWidth: isDesktop ? 'auto' : '100%',
              marginRight: isDesktop ? 12 : 0,
            }}
            textStyle={styles.btnText}
            text={rejoinBtnLabel}
            onPress={() => {
              reJoin();
            }}
          />

          <PrimaryButton
            containerStyle={{
              paddingVertical: 17,
              minWidth: isDesktop ? 'auto' : '100%',
              marginBottom: isDesktop ? 0 : 20,
            }}
            text={createMeetingLabel}
            textStyle={styles.btnText}
            onPress={() => {
              goToCreate();
            }}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Timer />
        <Spacer size={10} />
        <Text style={styles.returnHomeText}>{returnToHomeLabel}</Text>
      </View>
    </View>
  );
};

export default Endcall;

const styles = StyleSheet.create({
  returnHomeText: {
    fontFamily: ThemeConfig.FontFamily.sansPro,
    fontWeight: '400',
    fontSize: ThemeConfig.FontSize.small,
    lineHeight: 18,
    color: $config.FONT_COLOR,
    textAlign: 'center',
  },
  bottomContainer: {
    marginBottom: 28,
  },
  main: {
    flex: 1,
    paddingHorizontal: 40,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  btnContainerMobile: {
    flexDirection: 'column-reverse',
  },
  heading: {
    fontFamily: ThemeConfig.FontFamily.sansPro,
    fontWeight: '600',
    fontSize: 40,
    lineHeight: 40,
    color: $config.FONT_COLOR,
    alignSelf: 'center',
  },
});
