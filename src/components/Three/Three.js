import React, {useState} from 'react';
import Node from '../Node/Node';
import DefaultButton from '../DefaultButton/DefaultButton';
import './style.css';
import AddNodeModal from "../Modals/AddNodeModal/AddNodeModal";
import EditNodeModal from "../Modals/EditNodeModal/EditNodeModal";
import DeleteNodeModal from "../Modals/DeleteNodeModal/DeleteNodeModal";

const Three = () => {
    const [nodes, setNodes] = useState([
        {id: 1, name: 'Root Node', children: []},
    ]);
    const [isEditModalOpen, setisEditModalOpen] = useState(false);
    const [isAddNodeModalOpen, setIsAddNodeModalOpen] = useState(false);
    const [isDeleteNodeModalOpen, setIsDeleteNodeModalOpen] = useState(false);
    const [currentNode, setCurrentNode] = useState(null);
    const [parentNodeId, setParentNodeId] = useState(null);
    const [deleteNodeId, setDeleteNodeId] = useState(null);

    const handleAddNode = (newNode) => {
        setNodes((prevNodes) =>
            prevNodes.map((node) =>
                node.id === parentNodeId
                    ? {...node, children: [...node.children, newNode.id]}
                    : node
            ).concat(newNode)
        );
        setIsAddNodeModalOpen(false);
    };

    const handleEditNode = (node) => {
        setCurrentNode(node);
        setisEditModalOpen(true);
    };

    const handleDeleteNodeClick = (id) => {
        setDeleteNodeId(id);
        setIsDeleteNodeModalOpen(true);
    };

    const deleteNodeAndChildren = (nodeId) => {
        const nodeToDelete = nodes.find((node) => node.id === nodeId);
        if (nodeToDelete) {
            nodeToDelete.children.forEach(deleteNodeAndChildren);
        }
        setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
    };

    const handleDeleteNode = (id) => {
        deleteNodeAndChildren(id);
        setNodes((prevNodes) =>
            prevNodes.map((node) => ({
                ...node,
                children: node.children.filter((childId) => childId !== id),
            }))
        );
        setIsDeleteNodeModalOpen(false);
    };

    const handleSaveNode = (newName) => {
        setNodes(
            nodes.map((node) =>
                node.id === currentNode.id ? {...node, name: newName} : node
            )
        );
        setisEditModalOpen(false);
    };

    const handleCancel = () => {
        setisEditModalOpen(false);
        setIsAddNodeModalOpen(false);
        setIsDeleteNodeModalOpen(false);
    };

    const handleAddNewNodeClick = (parentId) => {
        setParentNodeId(parentId);
        setIsAddNodeModalOpen(true);
    };

    const handleResetThree = () => {
        setNodes([{id: 1, name: 'Root Node', children: []}]);
    };

    const renderNodeTree = (nodeId) => {
        const node = nodes.find((node) => node.id === nodeId);
        if (!node) return null;

        return (
            <div className="node-wrapper" key={node.id}>
                <Node
                    nodeInformation={node}
                    addNode={() => handleAddNewNodeClick(node.id)}
                    editNode={() => handleEditNode(node)}
                    deleteNode={() => handleDeleteNodeClick(node.id)}
                />
                <div className="level-container">
                    {node.children.map((childId) => renderNodeTree(childId))}
                </div>
            </div>
        );
    };

    return (
        <div className="tree-container">
            <DefaultButton action={handleResetThree} actionName="Сброс"/>
            {renderNodeTree(1)}
            {isAddNodeModalOpen && (
                <AddNodeModal
                    onSave={(newNode) =>
                        handleAddNode({...newNode, children: []})
                    }
                    onCancel={handleCancel}
                    parentId={parentNodeId}
                />
            )}
            {isEditModalOpen && (
                <EditNodeModal
                    node={currentNode}
                    onSave={handleSaveNode}
                    onCancel={handleCancel}
                />
            )}
            {isDeleteNodeModalOpen && (
                <DeleteNodeModal
                    onConfirm={()=>handleDeleteNode(deleteNodeId)}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default Three;
