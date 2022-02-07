import React from "react";
import'./statusCard.css';

const StatusCard = (props) => {
    return(
        <div className="status-card">
            <div className="status-card_icon">
                <div>{props.icon}</div>
            </div>
            <div className="status-card_info">
                <h4>{props.count}</h4>
                <span>{props.title}</span>
            </div>
        </div>
    )
}

export default StatusCard