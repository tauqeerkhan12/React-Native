
import ActionTypes from './ActionTypes';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux'
import { Alert } from 'react-native';

export function NewStoreData(createStores) {
    return dispatch => {
        // console.log(createStores);
        var user = firebase.auth().currentUser;
        // console.log(user.uid, '----------------------')
        createStores.uId = user.uid;
        createStores.emailId = user.email;
        firebase.database().ref('InventoryStore/').push(createStores)
            .then(() => {
                dispatch(CreateNewStores());
                Alert.alert(
                    'Confirm Message',
                    'Store Created',
                    [

                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                )
            })
            .catch(() => {
                // dispatch(LoaderDispatch());
                Alert.alert(
                    'Error Message',
                    'Check your email and password',
                    [

                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                )
            })
    }
}

function CreateNewStores(payload) {
    return {
        type: ActionTypes.CreateNewStoresData,
        payload
    }
}