import firebase from 'firebase/app';
import 'firebase/database';
import { useEffect, useReducer } from 'react';
var firebaseConfig = {
    apiKey: 'AIzaSyCwXyge90tOlHAdTeZpsfDnuU-zgeANVgg',
    authDomain: 'timer-app-8b2ae.firebaseapp.com',
    databaseURL: 'https://timer-app-8b2ae-default-rtdb.firebaseio.com',
    projectId: 'timer-app-8b2ae',
    storageBucket: 'timer-app-8b2ae.appspot.com',
    messagingSenderId: '236519982495',
    appId: '1:236519982495:web:5789f2fb6a9a3f1d1029aa',
};
const windowRef = window as any;
if (!windowRef.firebaseInitialized) {
    firebase.initializeApp(firebaseConfig);
    windowRef.firebaseInitialized = true;
}

// Get a reference to the database service
export const database = firebase.database();

export const usersRef = database.ref('users');
// eslint-disable-next-line no-restricted-globals
if (location.href.match('clear')) {
    usersRef.set(null);
}

type User = {
    name: string;
    id: string;
    timerStart: number | null;
    timeTotal: number;
};

type UserActions = {
    addUser(userName: string): void;
    startUserTimer(userId: string): void;
    stopUserTimer(userId: string): void;
    resetUserTimers(): void;
    clearUsers(): void;
};
function update(userIds: string[], updates: Partial<Omit<User, 'id'>>) {
    return usersRef.update(
        userIds.reduce(
            (totalUpdates, userId) => ({
                ...totalUpdates,
                ...Object.entries(updates).reduce(
                    (updater, [key, newValue]) => ({
                        ...updater,
                        [`${userId}/${key}`]: newValue,
                    }),
                    {}
                ),
            }),
            {}
        )
    );
}
let isResolved = false;
let usersCache: Record<string, User> = {};

const resolvedPromise = new Promise<void>((done) => {
    usersRef.once('value', (snapShot) => {
        usersCache = snapShot.val();
        done();
    });
}).then(() => {
    isResolved = true;
});

export const useUsers = (): [User[], UserActions] => {
    const [, forceUpdate] = useReducer((x) => (x + 1) % 50, 0);
    const [usersMap, setUsers] = [
        usersCache,
        (nextUsers: Record<string, User>) => {
            usersCache = nextUsers;
            forceUpdate();
        },
    ];

    useEffect(() => {
        const callback = (snapShot: firebase.database.DataSnapshot) => {
            setUsers(snapShot.val() || {});
        };
        usersRef.on('value', callback);

        return () => usersRef.off('value', callback);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addUser = (userName: string): void => {
        const trimmedUserName = userName.trim();
        if (
            Object.values(usersMap).find(
                (user) => user.name === trimmedUserName
            )
        ) {
            return;
        }
        usersRef.push({
            name: trimmedUserName,
            timerStart: null,
            timeTotal: 0,
        });
    };

    const startUserTimer = (userId: string) => {
        update([userId], {
            timerStart: Date.now(),
        });
    };

    const clearUsers = () => {
        usersRef.set(null);
    };
    const stopUserTimer = (userId: string) => {
        const currentUser = usersMap[userId];
        update([userId], {
            timerStart: null,
            timeTotal:
                currentUser.timeTotal + (Date.now() - currentUser.timerStart!),
        });
    };

    const resetUserTimers = () => {
        update(Object.keys(usersMap), {
            timerStart: null,
            timeTotal: 0,
        });
    };
    const users = Object.entries(usersMap).map(([id, user]) => ({
        ...user,
        id,
    }));

    if (!isResolved) {
        throw resolvedPromise;
    }

    return [
        users,
        { addUser, startUserTimer, stopUserTimer, resetUserTimers, clearUsers },
    ];
};
