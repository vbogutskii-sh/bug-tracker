import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import BoardList from "../boards/BoardList";
import ProjectModal from "../modals/ProjectModal";
import DeleteModal from "../modals/DeleteModal";


const Project = (props) => {
    const {projects, boards} = props

    const params = useParams();
    const [modal, setModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false)

    const deleteToggle = () => setDeleteModal(!deleteModal);

    const toggle = () => setModal(!modal);

    const projectId = params.projectId;

    const projName = projects?.find(project => project.id === projectId)?.projectName


    return (
        <div>
            <div className="d-flex flex-row m-3 justify-content-around">
                {!modal && <div></div>}
                {modal && <ProjectModal
                    modal={modal}
                    toggle={toggle}
                    title={"Edit Project"}
                    projname={projName}
                    projectId={projectId}
                />}
                <h1 className="ms-5">
                    Project: {projName}
                </h1>

                <button className="btn btn-outline-success m-0 btn-md" onClick={toggle}>Edit</button>

            </div>

            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" href="" id="navbarDropdownMenuLink"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Boards
                </button>
                <BoardList projectId={projectId} boards={boards}/>
            </div>
            <div className="input-group-btn position-fixed fixed-bottom d-flex justify-content-end me-5">
                <button
                    className=" btn btn-danger text-light rounded-2 mb-3"
                    onClick={deleteToggle}
                >
                    Delete
                </button>
            </div>
            {deleteModal === true && <DeleteModal
                modal={deleteModal}
                toggle={deleteToggle}
                title={projName}
                projectid={projectId}
            />}
        </div>
    )
        ;
};

export default Project;
