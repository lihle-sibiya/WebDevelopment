import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';


const Login = props => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");

    const onChangeName = e => {//binds the field value to the name state variables
        const name = e.target.value;
        setName(name);
    };

    const onChangeId = e => {///binds the field value to the id state variables
        const id = e.target.value;
        setId(id);
    };

    const login = () => {//called by Submit button
        props.login({ name: name, id: id });//passed by login route on App.js
        props.history.push('/');//redirected after loggin in
    };

    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={name}
                        onChange={onChangeName}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter id"
                        value={id}
                        onChange={onChangeId}
                    />
                </Form.Group>
                <Button variant="primary" onClick={login}>
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Login;