import React, { useState } from 'react';
import { AddUserModal } from './AddUserModal';

import './App.css';
import { UserRow } from './UserRow';
import { useUsers } from './firebase';

function App() {
    const [userList, { startUserTimer, stopUserTimer }] = useUsers();
    const [addUserShowing, setAddUserShowing] = useState(false);
    return (
        <div className='App'>
            {addUserShowing && (
                <AddUserModal closeModal={() => setAddUserShowing(false)} />
            )}
            {userList.map(({ name: userName, timeTotal, timerStart, id }) => (
                <UserRow
                    key={userName}
                    userName={userName}
                    timerStart={timerStart}
                    totalTimer={timeTotal}
                    startTimer={() => startUserTimer(id)}
                    stopTimer={() => stopUserTimer(id)}
                />
            ))}
            <button
                className='addUserButton'
                onClick={() => setAddUserShowing(true)}
            >
                Manage
            </button>
        </div>
    );
}

export default App;
