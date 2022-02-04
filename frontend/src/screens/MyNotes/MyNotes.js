import React, { useEffect} from 'react'
import { Accordion, Badge, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MainScreen from '../../components/MainScreen.js'
import { useDispatch, useSelector } from 'react-redux';
import { listNotes, deleteNoteAction } from '../../actions/noteActions.js';
import Loading from '../../components/Loading.js';
import ErrorMessage from '../../components/ErrorMessage.js';

const MyNotes = ({history,search}) =>
{
    const dispatch = useDispatch();

    const noteList = useSelector((state) => state.noteList);
    const { loading, error, notes } = noteList;
    
     const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const noteCreate = useSelector((state) => state.noteCreate);
    const { success: successCreate } = noteCreate;
    
    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { success: successUpdate } = noteUpdate;

    const noteDelete = useSelector((state) => state.noteDelete);
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = noteDelete;
    

    const deleteHandler = (id) =>
    {
        if (window.confirm("are you sure?"))
        {
            dispatch(deleteNoteAction(id))
        }
    }
    
    // console.log(notes);
    // const history = useHistory();

    useEffect(() =>
    {
        dispatch(listNotes());
        if (!userInfo)
        {
            history.push("/");
        }
    }, [dispatch, history, userInfo, successCreate, successUpdate, successDelete]);

    return (
        <MainScreen title={`welcome Back ${userInfo && userInfo.name}...`}>
            <Link to="/createnote">
                <Button style={{marginLeft:10, marginBottom:6}} size="lg">
                    Create New Note
                </Button>
            </Link>
                {errorDelete && (
                    <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
                )}
                {loadingDelete && <Loading />}
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {loading && <Loading />}
            {notes?.reverse().filter(filteredNote => (
                    filteredNote.title.toLowerCase().includes(search.toLowerCase())
                )).map(note =>
                (
                    <Accordion key={note._id}>
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
                                <footer variant="primary">Created On{" "}
                                 <cite title="Source Title">
                                     {note.createdAt.substring(0,10)}
                                 </cite>
                                </footer>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
             ))}
        </MainScreen>
    )
}

export default MyNotes
