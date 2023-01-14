import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import BoardModal from "../modals/BoardModal";
import BoardList from "./BoardList";


const Board = (props) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const {boards} = props

    const params = useParams();
    const boardId = params.boardId;

    const currentBoard = boards.filter(board => board.id === params.boardId)[0]


    return (
        <div>
            {modal && <BoardModal
                modal={modal}
                toggle={toggle}
                title={"Edit Project"}
                boardId={boardId}
                currentBoard={currentBoard}
            />}
            <h1>Board: {boards?.find(board => board.id === params.boardId)?.boardName}</h1>

            <button className="btn btn-warning" type="button"  onClick={toggle}>Update</button>

            <button className="btn btn-primary dropdown-toggle"
                    href="" id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                Boards
            </button>
            <BoardList  boardId={boardId}/>
        </div>
    );
};

export default Board;
