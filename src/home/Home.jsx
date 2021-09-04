import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { authAtom, usersAtom } from '_state';
import { useUserActions } from '_actions';

export { Home };

function Home() {
    const auth = useRecoilValue(authAtom);
    const users = useRecoilValue(usersAtom);
    const userActions = useUserActions();

    useEffect(() => {
        userActions.getAll();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Hi {auth?.firstName}!</h1>
            <p>You're logged in with React + Recoil & JWT!!</p>
            <h3>Users from secure api end point:</h3>
            {users &&
                <ul>
                    {users.map(user =>
                        <li key={user.id}>{user.firstName} {user.lastName}</li>
                    )}
                </ul>
            }
            {!users && <div className="spinner-border spinner-border-sm"></div>}
        </div>
    );
}
