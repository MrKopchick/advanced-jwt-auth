import React, { FC, useContext, useEffect, useState } from 'react';
import LoginForm from "./components/LoginForm";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";

const App: FC = () => {
    const { store } = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    if (store.isLoading) {
        return <div>Loading...</div>;
    }

    if (!store.isAuth) {
        return (
            <div>
                <LoginForm />
                <button onClick={getUsers}>
                    View Users
                </button>
            </div>
        );
    }

    return (
        <div>
            <div>
                <h1>
                    Authenticated as: <span>{store.user.email}</span>
                </h1>
                <h2>
                    {store.user.isActivated ? 'Email confirmed' : 'Please confirm your email!'}
                </h2>
                <div>
                    <button onClick={() => store.logout()}>
                        Logout
                    </button>
                    <button onClick={getUsers}>
                        Get All Users
                    </button>
                </div>
                <div className="space-y-2">
                    {users.map(user => (
                        <div
                            key={user.email}>
                            {user.email}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default observer(App);
