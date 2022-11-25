import notifee, {AndroidImportance} from '@notifee/react-native';

const ShowNotification = async defaultData => {
  const data = defaultData.notification;
  await notifee.requestPermission();
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: data.title,
    body: data.body,
    android: {
      channelId,
      sound: 'default',
      largeIcon: data.android.imageUrl || 'ic_launcher',
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
      },
    },
  });
};

export {ShowNotification};
