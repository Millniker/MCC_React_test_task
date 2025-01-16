import { useState } from "react";
import DefaultInput from "../../DefaultInput/DefaultInput";
import DefaultButton from "../../DefaultButton/DefaultButton";

const EditNodeModal = ({ node, onSave, onCancel }) => {
    const [newName, setNewName] = useState(node.name);
    const [error, setError] = useState(false);

    const handleSave = () => {
        if (newName.trim() === "") {
            setError(true); // Показываем ошибку, если поле пустое
            return;
        }

        onSave(newName);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Редактировать узел</h2>
                <DefaultInput
                    value={newName}
                    onChange={(value) => {
                        setNewName(value);
                        if (error && value.trim() !== "") {
                            setError(false); // Сбрасываем ошибку, если пользователь ввел текст
                        }
                    }}
                />
                {error && (
                    <div
                        style={{
                            color: "red",
                            fontSize: "12px",
                            marginBottom: "10px",
                        }}
                    >
                        Название узла не может быть пустым
                    </div>
                )}
                <div className="modal-buttons">
                    <DefaultButton action={handleSave} actionName="Сохранить" />
                    <DefaultButton action={onCancel} actionName="Отмена" />
                </div>
            </div>
        </div>
    );
};

export default EditNodeModal;
