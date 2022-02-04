import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteNoteAction, updateNoteAction } from '../../actions/noteActions.js';
import ErrorMessage from '../../components/ErrorMessage.js';
import Loading from '../../components/Loading.js';
import MainScreen from '../../components/MainScreen.js'

const SingleNote = ({match}) =>
{
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [category, setCategory] = useState();
    const [date, setDate] = useState("");

    const dispatch = useDispatch();

    const noteUpdate = useSelector(state => state.noteUpdate)
    const { loading, error } = noteUpdate;

    const noteDelete = useSelector(state => state.noteDelete)
    const { loading: loadingDelete, error: errorDelete } = noteDelete;
    

    // const history = useHistory();
    const deleteHandler = (id) =>
    {
        if (window.confirm("Are you sure?"))
        {
            dispatch(deleteNoteAction(id));
        }
        history.push("/mynotes");
    };
    const history = useHistory();

     const updateHandler = (e) =>
    {
        e.preventDefault();
        if (!title || !content || !category) return;
        dispatch(updateNoteAction(match.params.id, title, content, category));

        resetHandler();
        history.push("/mynotes");
    }
    const resetHandler = () =>
    {
        setTitle("");
        setContent("");
        setCategory("");
        setDate("");
    }
   
    useEffect(() =>
    {
         const fetching = async () =>
        {
            const { data } = await axios.get(`/api/notes/${match.params.id}`);

            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setDate(data.updatedAt);
        };
        console.log(fetching());
    }, [match.params.id, date]);

   
    return (
        <MainScreen title="Edit Note"> 
            <Card>
                <Card.Header>Edit Your Note</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>
                        { loadingDelete && <Loading />}
                        { errorDelete && (
                            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
                        )}
                         {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="title"
                                placeholder="Enter the title"
                                value={title}
                                onChange={(e)=> setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter the content"
                                value={content}
                                onChange={(e)=> setContent(e.target.value)}
                            />
                        </Form.Group>
                        {content && (
                            <Card>
                                <Card.Header>Note Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}

                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the category"
                                value={category}
                                onChange={(e)=> setCategory(e.target.value)}
                            />
                        </Form.Group>
                        {loading && <Loading size={50} />}
                        <Button variant="primary" type="submit">Update Note</Button>
                        <Button className="mx-2" variant="danger"
                            onClick={() => deleteHandler(match.params.id)}
                        >Delete Note</Button>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-muted">
                    Update on - {date.substring(0,10)}
                </Card.Footer>
            </Card>
        </MainScreen>
    )
}

export default SingleNote
