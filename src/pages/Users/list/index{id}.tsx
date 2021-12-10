import React, {Fragment } from 'react';

interface UserListProps {
    items: {id: number, nome: string, telefone: string, ra: string, email:string}[];
};

const UserList: React.FC<UserListProps> = (props) => {
    return (
        <Fragment>
            <ul>
            {props.items.map(user => (
                <li key={user.id}>
                    <span>{user.nome}</span>
                    <span>{user.email}</span>
                    <span>{user.telefone}</span>
                    <span>{user.ra}</span>
                    
                    {/* not call delete function, just point to it
                    // set this to null in bind() */}
                </li>
            ))}
            </ul>
        </Fragment>
    );
};

export default UserList;