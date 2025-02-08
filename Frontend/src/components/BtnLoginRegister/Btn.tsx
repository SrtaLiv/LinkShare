import { Button } from '@mui/material';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const BtnLogin = () => {
    const [signedIn, setSignedIn] = useState(false);

    return (
        <Button onClick={()=> setSignedIn(!signedIn)} >
            {signedIn ? 'Cerrar sesión' : 'Iniciar sesión'}
        </Button>
    );
};

export default BtnLogin;
