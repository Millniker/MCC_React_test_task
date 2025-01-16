import DefaultButton from "../../DefaultButton/DefaultButton";
import './style.css';

const DeleteNodeModal = ({ onConfirm, onCancel}) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Вы точно хотите удалить узел и все его дочерние узлы?</h2>
                <div className="modal-buttons">
                    <DefaultButton action={onConfirm} actionName="Удалить" />
                    <DefaultButton action={onCancel} actionName="Отмена" />
                </div>
            </div>
        </div>
    );
};

export default DeleteNodeModal;
