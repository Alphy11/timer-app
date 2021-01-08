import React, { useState } from 'react';
import { confirmAction } from './confirmAction';
import { useUsers } from './firebase';

export function AddUserModal({ closeModal }: { closeModal: () => void }) {
    const [userName, setUserName] = useState<string>('');
    const [, { addUser, resetUserTimers, clearUsers }] = useUsers();
    return (
        <div className='addUserModal'>
            <div className='flexBox'>
                <div className='flexItem'></div>
                <div className='closeButton' onClick={closeModal}>
                    X
                </div>
            </div>
            <div className='optionsMenu'>
                <div className='manageModalRow'>
                    <input
                        className='newUserInput'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder='User name'
                    ></input>
                    <br />
                    <button
                        onClick={
                            userName
                                ? () => {
                                      addUser(userName);
                                      closeModal();
                                  }
                                : undefined
                        }
                        disabled={!userName}
                    >
                        Add user
                    </button>
                </div>
                <div className='manageModalRow'>
                    <button
                        onClick={() => {
                            resetUserTimers();
                            closeModal();
                        }}
                    >
                        Reset Timers
                    </button>
                </div>
                <div className='manageModalRow'>
                    <button
                        onClick={confirmAction(() => {
                            clearUsers();
                            closeModal();
                        })}
                    >
                        Clear all users
                    </button>
                </div>
            </div>
        </div>
    );
}
