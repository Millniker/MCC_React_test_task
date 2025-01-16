import React from 'react';
import DefaultButton from '../DefaultButton/DefaultButton';
import './style.css';

const Node = ({ nodeInformation, addNode, editNode, deleteNode }) => {
    return (
        <div className="node-container">
            <div className="node">{nodeInformation.name}</div>
            <div className="node-actions">
                <DefaultButton actionName="Добавить узел" action={addNode} />
                <DefaultButton actionName="Изменить узел" action={editNode} />
                {nodeInformation.id !== 1 && (
                    <DefaultButton actionName="Удалить узел" action={deleteNode} />
                )}
            </div>
        </div>
    );
};

export default Node;
