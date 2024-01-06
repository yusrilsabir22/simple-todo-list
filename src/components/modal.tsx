import React, { useState } from 'react';
import { Input, Modal } from 'antd';

type ModalProps = {
    showModal: boolean
    handleOk: (text: string) => void
    handleCancel: () => void
}

const BasicModal: React.FC<ModalProps> = (props) => {
    const [text, setText] = useState("")
    return (
        <>
            <Modal title="Basic Modal" open={props.showModal} onOk={() => {
                props.handleOk(text)
                setText("")
            }} onCancel={props.handleCancel}>
                <Input
                    placeholder='Board title'
                    onChange={ev => {
                        setText(ev.target.value)
                    }}
                    value={text}
                />
            </Modal>
        </>
    );
};

export default BasicModal;