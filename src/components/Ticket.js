import React from 'react';

const Ticket = (props) => {
    const {title, description, status} = props;
    return (
        <div className="card">
            <div className="card-header">
                Ticket header: {title}
            </div>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <h6 className="card-text">Description:</h6>
                        <p className="card-text">
                            {description}
                        </p>
                    </li>
                    <li className="list-group-item">
                        <h5 className="card-title">Project Name:</h5>
                    </li>
                    <li className="list-group-item">
                        <h4 className="card-text">Status: {status}</h4>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Ticket;