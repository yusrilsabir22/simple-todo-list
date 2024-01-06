import React, { useEffect, useState } from 'react';
import { Button, Card, Checkbox, Col, Layout, Row, theme } from 'antd';
import { FolderViewOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { AddTodo, updateTodo } from '../features/todo/action';

const { Header, Content, Footer } = Layout;

const BasicContent: React.FC = () => {
    const [activeBoard, setActiveBoard] = useState<INITIAL_BOARD>({
        active: '',
        boards: []
    })

    const [isViewAll, setIsViewAll] = useState(false)
    
    const boards = useAppSelector(state => state.BoardReducers)
    const dispatch = useAppDispatch()
    
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        setActiveBoard(boards)
    }, [boards])

    return (
        <Layout style={{ marginLeft: 200 }}>
            <Header style={{ padding: 0, background: colorBgContainer }}>
                <Button
                    type="text"
                    block
                    icon={<PlusSquareOutlined />}
                    onClick={() => {
                        if(boards.active != '') {
                            dispatch(AddTodo({
                                boardTitle: boards.active,
                                todo: {
                                    title: new Date().getTime().toString(),
                                    description: "test 113322 " + new Date().getTime().toString(),
                                    completed: false,
                                    startDate: new Date().toDateString(),
                                    endDate: new Date().toDateString()
                                }
                            }))
                        } else {
                            alert("no board activated")
                        }
                    }}
                    style={{
                        fontSize: '16px',
                        height: 64,
                        width: 180
                    }}
                >Add todo</Button>

                <Button
                    type="text"
                    block
                    icon={<FolderViewOutlined />}
                    onClick={() => {
                        if (boards.active != '') {
                            setIsViewAll((state) => !state)
                        } else {
                            alert("no board activated")
                        }
                    }}
                    style={{
                        fontSize: '16px',
                        height: 64,
                        width: 180
                    }}
                >View All</Button>
            </Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div
                    style={{
                        padding: 24,
                        textAlign: 'center',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >   
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {
                        activeBoard.boards.length > 0 &&
                        Array.from(activeBoard.boards).map((board) => {
                            if(board.title == activeBoard.active) {
                                if(board.todos.length <= 0) {
                                    return <>No data</>
                                }
                                return Array.from(board.todos).map((todo, idx) => {
                                    if(isViewAll) {
                                        return (
                                            <Col className="gutter-row" span={6} key={idx}>
                                                <Card
                                                    title={todo.title}
                                                    bordered={false}
                                                    style={{ width: 300 }}
                                                    extra={<Checkbox checked={todo.completed} value={todo.completed} onChange={(e) => {
                                                        console.log(e.target.checked)
                                                        dispatch(updateTodo({
                                                            todo: {
                                                                ...todo,
                                                                completed: e.target.checked
                                                            },
                                                            boardTitle: board.title
                                                        }))
                                                    }}>Done</Checkbox>}>
                                                    <p>{todo.description}</p>
                                                </Card>
                                            </Col>
                                        )
                                    } else if(!isViewAll && !todo.completed) {
                                        return (
                                            <Col className="gutter-row" span={6} key={idx}>
                                                <Card 
                                                    title={todo.title} 
                                                    bordered={false} 
                                                    style={{ width: 300 }}
                                                    extra={<Checkbox checked={todo.completed} value={todo.completed} onChange={(e) => {
                                                        dispatch(updateTodo({
                                                            todo: {
                                                                ...todo,
                                                                completed: e.target.checked
                                                            },
                                                            boardTitle: board.title
                                                        }))
                                                    }}>Done</Checkbox>}>
                                                    <p>{todo.description}</p>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                })
                            }
                        }) || <>No data</>
                    }
                    </Row>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    )
}

export default BasicContent