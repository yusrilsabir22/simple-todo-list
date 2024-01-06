import { FloatButton, Layout, Menu } from "antd"
import Sider from "antd/es/layout/Sider"
import { useAppDispatch, useAppSelector } from "../app/hook"
import type { MenuProps } from 'antd';
import BasicContent from "../components/content";
import { DiffOutlined } from "@ant-design/icons";
import { AddBoard, SelectBoard } from "../features/board/action";
import BasicModal from "../components/modal";
import { useState } from "react";


const MainPage: React.FC = () => {

    const [isOpen, setOpen] = useState(false)

    const boards: MenuProps['items'] = useAppSelector(state => Array.from(state.BoardReducers.boards).map((item) => {
        return {
            key: item.title,
            label: item.title
        }
    }))
    const dispatch = useAppDispatch()
    
    const handleOk = (text: string) => {
        if(text != '') {
            dispatch(AddBoard({
                title: text,
                active: true,
                todos: []
            }))
        }

        setOpen(false)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    return (
        <Layout hasSider>

            <Sider
                style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
            >
                <div className="demo-logo-vertical" />
                <Menu 
                    theme="dark" 
                    mode="inline" 
                    items={boards} 
                    onSelect={(prop) => {
                        dispatch(SelectBoard({
                            key: prop.key
                        }))
                    }}
                />
                <FloatButton 
                    icon={<DiffOutlined/>} 
                    tooltip="Add new board"
                    type="primary"
                    shape="circle"
                    style={{ left: 77, bottom: 20 }}
                    onClick={() => {
                        setOpen((state) => !state)
                    }}
                />
            </Sider>
            <BasicContent />
            <BasicModal showModal={isOpen} handleOk={handleOk} handleCancel={handleCancel} />
        </Layout>
    )
}

export default MainPage