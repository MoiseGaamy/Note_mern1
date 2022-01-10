import React, { useEffect, useState } from 'react'
import { Accordion, Badge, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MainScreen from '../../components/MainScreen.js'
import axios from "axios";

const MyNotes = () =>
{
    const [notes, setNotes] = useState([]);
    const deleteHandler = (id) =>
    {
        if (window.confirm("are you sure?"))
        {
            
        }
    }
    const fetchNotes = async () =>
    {
        const { data } = await axios.get('/api/notes');
        setNotes(data);
    }
    console.log(notes);

    useEffect(() =>
    {
        fetchNotes();
    },[])
    return (
        <MainScreen title="welcome Back Gaamy...">
            <Link to="createnote">
                <Button style={{marginLeft:10, marginBottom:6}} size="lg">
                    Create New Note
                </Button>
            </Link>
                {notes.map(note =>
                (
                    <Accordion key={notes._id}>
                        <Accordion.Item eventKey="0" style={{margin:10}}>
                            <Accordion.Header style={{ display: "flex" }}>
                                <span style={{
                            color: "black",
                            textDecoration: "none",
                            flex: 1,
                            cursor: "pointer",
                            alignSelf: "center",
                            fontSize: 18,
                            }}>{note.title}</span>
                               <div>
                            <Button href={`/note/${note._id}`}>Edit</Button>
                            <Button variant="danger" className="mx-2" onClick={()=> deleteHandler(note._id)}>Delete</Button>
                        </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <h4><Badge bg="success">category-{note.category}</Badge></h4>
                                {note.content}
                                 <footer variant="primary">Created On - date</footer>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
             ))}
        </MainScreen>
    )
}

export default MyNotes
