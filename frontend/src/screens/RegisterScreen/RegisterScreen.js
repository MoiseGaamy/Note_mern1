import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { register } from '../../actions/userActions.js'
import ErrorMessage from '../../components/ErrorMessage.js'
import Loading from '../../components/Loading.js'
import MainScreen from '../../components/MainScreen.js'

const RegisterScreen = () =>
{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState(
        "https://pixabay.com/fr/illustrations/masculin-personnage-homme-avatar-5768177/"
    );
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;
    
    const history = useHistory();

    useEffect(() =>
    {
        if (userInfo)
        {
            history.push("/mynotes");
    }
        
    },[history, userInfo])

    const submitHandler = async (e) =>
    {
        e.preventDefault();
        if (password !== confirm)
        {
           setMessage('passwords do not match')
        } else
        {
            dispatch(register(name, email, password, pic))
       }
       
    }
    const imageHandling = async(pics) =>
    {
        if (!pics)
        {
            return setPicMessage("please Select an Image");
        }
        setPicMessage(null);

        const data = new FormData();
        data.append('file', pics);
        data.append('upload_preset', 'NoteBook');
        data.append('cloud_name', 'gaamia');
        fetch('https://api.cloudinary.com/v1_1/gaamia/image/upload', {
            method: 'post',
            body:data
        }).then((res) => res.json())
            .then((data) =>
            {   console.log(data);
                setPic(data.url.toString());
            }).catch((err) =>
            {
              console.log(err);
          })
        //  const form = e.currentTarget;
        // const inputField = Array.from(form.elements).find(({ name }) => name === "file");

        // const formData = new FormData();

        // for (const file of inputField.files)
        // {
        //     formData.append('file', file)
        // }

        // formData.append('upload_preset','NoteBook')
       
        // const data = await fetch('https://api.cloudinary.com/v1_1/gaamia/image/upload', {
        //     method: "post",
        //     body: formData
        // }).then(r => r.json())

        // console.log("data", data)
    }

    return (
        <MainScreen title='REGISTER'>
          <div className='loginContainer'>
                 {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                 {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                 {loading && <Loading />} 
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} placeholder="Enter Name" onChange={(e)=> setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Email Address</Form.Label>
                     <Form.Control type="email" value={email} placeholder="email@example.com" onChange={(e)=> setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Password</Form.Label>
                     <Form.Control type="password" value={password} placeholder="password@example.com" onChange={(e)=> setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>confirm Password</Form.Label>
                     <Form.Control type="password" value={confirm} placeholder="ConfirmPassword@example.com" onChange={(e)=> setConfirm(e.target.value)}/>
                </Form.Group>
                    {picMessage && (<ErrorMessage variant="danger">{picMessage}</ErrorMessage>)}
              <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>profile picture</Form.Label>
                    <Form.Control   type="file" name="file" onChange={(e)=> imageHandling(e.target.files[0])}/>
              </Form.Group>
                <Button variant="primary" type="submit">
                   Submit
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                  Already have an Account? <Link to="/login">Login Here</Link>
                </Col>
             </Row>
             </div>
        </MainScreen>
    )
}

export default RegisterScreen
