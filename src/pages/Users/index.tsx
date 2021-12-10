import React, {useEffect, useState, Fragment } from 'react';
import UserList from '../Users/list/index{id}';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  nome: string;
  senha: string;
  ra:string;
  telefone: string

}

// you can export the type TUserList to use as -
// props type in your `UserList` component
export type TUserList = User[]

const Users: React.FC = (props) => {
   // you can also use User[] as type argument
    const [users, setUserList] = useState<TUserList>();

    useEffect(() => {
        // Use [] as second argument in useEffect for not rendering each time

        
        axios.get<TUserList>('') //http://localhost:8080/admin/users
        .then((response) => {
            console.log(response.data);
            setUserList( response.data );
        });
    }, []);

    return (
        <Fragment>
            
        </Fragment>

    );
};
export default Users;