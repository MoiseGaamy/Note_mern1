import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { login } from '../../actions/userActions.js'
import ErrorMessage from '../../components/ErrorMessage.js'
import Loading from '../../components/Loading.js'
import MainScreen from '../../components/MainScreen.js'

const LoginScreen = () =>
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const dispatch = useDispatch();

    const history = useHistory()


    const userLogin = useSelector(state => state.userLogin);
    const {loading, error, userInfo} = userLogin


    useEffect(() =>
    {
        if (userInfo)
        {
            history.push("/mynotes");
         }
     },[history,userInfo])

    const submitHandler = async (e) =>
    {
        e.preventDefault();

        dispatch(login(email, password));
  
    }

    return (
        <MainScreen title="LOGIN">
            <div className='loginContainer'>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} placeholder="email@example.com" onChange={(e)=> setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} placeholder="password@example.com" onChange={(e)=> setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                   Submit
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                  don't have an Account? <Link to="/register">Register Here</Link>
                </Col>
             </Row>
             </div>
        </MainScreen>
    )
}

export default LoginScreen
