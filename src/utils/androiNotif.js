import PushNotification from 'react-native-push-notification';

export default androidNotif = {
  getToken: () => {
    return new Pormise((resolve, reject) => {
      PushNotification.configure({
        onRegister: (token) => { (token) ? resolve(token.token) : reject(new Error(token)); }
        onNotification: (notification) => { console.log("New notification: " + notification); },
        // Change if using a new GCM
        senderID: "562572090701",
        popInitialNotification: true,
        requestPermissions: true
      });
    });
  },
}
