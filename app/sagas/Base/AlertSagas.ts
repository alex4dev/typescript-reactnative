import {takeLatest, all, fork, select, call} from 'redux-saga/effects';
import {getType} from 'typesafe-actions';
import {SagaIterator} from 'redux-saga';
import {AlertNames} from 'constants/alertConstants';

import {Alert, AlertButton} from 'react-native';

import {channel} from 'redux-saga';
import {take, put} from 'redux-saga/effects';

export const alertChannel = channel();

import {AnyAction} from 'redux';
import {getAlertDataByName} from 'utils/alertUtils';
import Dbg from 'utils/dbgUtils';
import {
    alertChannelShowAction,
    alertShowAction,
    alertChannelPutAction,
    alertHideAction,
    alertChannelCallAction,
    ButtonRequestModel
} from 'actions/Base/AlertActions';
import {ChannelShowAction, ChannelPutAction, ChannelCallAction, AlertShowAction} from 'actions';
import {getActiveAlert, getAlertShowing} from 'selectors/Config/ConfigSelectors';

export function* watchAlertChannel() {
    while (true) {
        const action: AnyAction = yield take(alertChannel);
        Dbg.trace(watchAlertChannel.name, 'alertChannel - new action take', action);
        try {
            switch (action.type) {
                case getType(alertChannelShowAction):
                    const {
                        message,
                        title,
                        buttons,
                        options,
                        name
                    } = (action as ChannelShowAction).payload;
                    Alert.alert(title, message, buttons, options);
                    yield put(alertShowAction.success({name}));
                    break;

                case getType(alertChannelPutAction):
                    yield put((action as ChannelPutAction).payload);
                    yield put(alertHideAction.success(''));
                    break;

                case getType(alertChannelCallAction):
                    const {method, args} = (action as ChannelCallAction).payload;
                    yield call(method, args);
                    yield put(alertHideAction.success(''));
                    break;
            }
        } catch (err) {
            Dbg.error(watchAlertChannel.name, 'Error', err);
        }
    }
}

function _createAction(button: ButtonRequestModel) {
    // more than one side effect
    if (typeof button.actions === 'object' && Array.isArray(button.actions)) {
        const actions = button.actions.map((action) => _createAction(action));
        return () => {
            actions.forEach((action) => action());
        };
    }
    // PUT side effect action
    if (typeof button.put === 'object' && button.put !== null) {
        return () => alertChannel.put(alertChannelPutAction(button.put));
    }
    // CALL side effect action
    if (button.call !== null) {
        return () => alertChannel.put(alertChannelCallAction({method: button.call}));
    }
}

function* handleShowAlert(action: AlertShowAction): SagaIterator {
    const name = action.payload.name;
    const activeAlert: AlertNames = yield select(getActiveAlert);
    const isAlertShowing: boolean = yield select(getAlertShowing);

    // active alert is already on screen
    if (isAlertShowing && activeAlert === name) {
        yield put(alertShowAction.failure({name}));
        return;
    }

    const data = getAlertDataByName(name);
    data.buttons = data.buttons.map((b) => {
        return {
            text: b.text,
            onPress: _createAction(b)
        };
    });

    Dbg.debug(handleShowAlert.name, 'show alert with data', data);
    alertChannel.put(alertChannelShowAction(data));
}

export default function* rootSaga() {
    yield all([
        takeLatest(getType(alertShowAction.request), handleShowAlert),
        fork(watchAlertChannel)
    ]);
}
