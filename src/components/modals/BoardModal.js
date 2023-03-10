import React, {useState} from 'react';
import {Button, Input, InputGroup, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import db from "../../dbConnection";
import {useParams} from "react-router-dom";

const BoardModal = (props) => {
    const param = useParams();
    const currentProjectId = param.projectId;

    const {modal, toggle, title, currentBoardName, boardId} = props;
    const [boardName, setBoardName] = useState(currentBoardName);

    const createBoard = (e) => {
        e.preventDefault();
        const refBoardDoc = collection(db, 'Boards');
        addDoc(refBoardDoc, {
            boardName,
            projectId: currentProjectId
        })
            .then(res => res.id)
            .catch(err => console.log(err));
        setBoardName('');
    }
    const updateBoard = (e) => {
        e.preventDefault();
        updateDoc(doc(db, 'Boards', boardId), {boardName})
            .then(r => console.log(r))
            .catch(err => console.log(err));
    }

    function okButtonHandler(e) {
        if (title === 'Create Board') {
            createBoard(e);
        } else {
            updateBoard(e);
        }
        toggle();
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} {...props}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>
                    <InputGroup>
                        <InputGroupText>
                            Board's name
                        </InputGroupText>
                        <Input
                            value={boardName}
                            onChange={(e) => setBoardName(e.target.value)}
                        />
                    </InputGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={e => okButtonHandler(e)}>
                        Ok
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default BoardModal;
