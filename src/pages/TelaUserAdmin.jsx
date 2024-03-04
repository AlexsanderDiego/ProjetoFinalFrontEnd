import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TelaUserAdmin = ({idLogado}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
            const response = await axios.get(`https://fs01backend.onrender.com/usuarios/${idLogado}`);
                const userId = response.data.id;
                setUsers(response.data);
                console.log("ID do usuário logado:", userId);
                // setUsers(response.data);
                // Use the userId as needed
            } catch (error) {
                console.error("Erro ao obter ID do usuário logado:", error);
                message.error(
                    "Erro ao obter ID do usuário logado. Por favor, tente novamente."
                );
            }
        };

        fetchUserId();
        
      }, []);

    return (
        <div>
            <h1>User Admin Page</h1>
            <h2>Detalhes do usuário</h2>
            <div>
                <h1>{users.nome}</h1>
                    <h3>{users.id}</h3>
                    <p>Email: {users.email}</p>
                    </div>
        </div>
    );
};

export default TelaUserAdmin;