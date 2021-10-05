import React, { useEffect, useState } from 'react';
import Card from '@components/Card';
import Network from '@components/Network';
import { v4 as uuidv4 } from 'uuid';
import { addItem, removeItem, updateItem } from 'utils/array';
import { Container } from '@components/Layout';
import { Icon } from '@components/Icon';
import { faCheck, faEdit, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Button from '@components/Button';
import Modal from '@components/Modal';
import Input from '@components/Input';
import Select from 'react-select';
import { Subtitle, Text } from '@components/Text';
import { Divider } from '@components/Divider';
import { isEmpty } from 'utils/validate';
import { node } from 'prop-types';


const Graph = () => {

    const [edges, setEdges] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [value, setValue] = useState('');
    const [id, setId] = useState(null);

    const [selectedNode, setSelectedNode] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const addNode = () => {
        setNodes((previous) => {
            return addItem(previous, { id: uuidv4(), label: value === '' ? `Node ${previous.length + 1}` : value })
        });
        if (nodes.length >= 1) {
            console.log("ADDING EDGE");

        }
        setValue('');
        setShowAddModal(false);
    }

    const addRandom = () => {
        //console.log("NODES LENGTH 1", nodes.length);
        const id = uuidv4();
        setId(id);
        setNodes((previous) => {

            return addItem(previous, { id, label: `Node ${previous.length + 1}` })
        });
        if (nodes.length >= 1) {
            //console.log("conditional length", nodes.length);
            setEdges((previous) => {
                return addItem(previous, {
                    id: id,
                    to: nodes[nodes.length - 1].id,
                    from: id,
                })
            });
        }
        //console.log("edges", edges)
        setShowAddModal(false);
    }

    const deleteNode = () => {
        if (!isEmpty(selectedNode)) {
            let nodeIndex = nodes.findIndex((node) => node.id === selectedNode.value);
            switch (nodeIndex) {
                case 0:
                    console.log("PIMERO");
                    setNodes((previous) => {
                        let edgeIndex = edges.findIndex((edge) => edge.from === selectedNode.value);
                        setEdges((previous) => {
                            return removeItem(previous, edges[edgeIndex]);
                        });
                        console.log(previous[nodeIndex]);
                        return removeItem(previous, previous[nodeIndex]);
                    });
                    break;
                case nodes.length - 1:
                    console.log("ULTIMO");
                    setNodes((previous) => {
                        let edgeIndex = edges.findIndex((edge) => edge.to === selectedNode.value);
                        setEdges((previous) => {
                            return removeItem(previous, edges[edgeIndex]);
                        });
                        console.log(previous[nodeIndex]);
                        return removeItem(previous, previous[nodeIndex]);
                    });
                    break;
                default:
                    console.log("NODE index", nodeIndex);
                    setNodes((previousNodes) => {
                        console.log("edges[nodeIndex]", edges[nodeIndex]);
                        setEdges(async (previousEdges) => {
                            let tmpArray = updateItem(previousEdges, edges[nodeIndex], { id: uuidv4(), to: nodes[nodeIndex + 1].id, from: selectedNode.value });
                            return tmpArray;
                        });
                        /* setEdges((previousEdges) => {
                            let tmpArray = removeItem(previousEdges, previousEdges[nodeIndex]);
                            return updateItem(tmpArray, tmpArray[nodeIndex], { id: uuidv4(), to: nodes[nodeIndex + 1].id, from: selectedNode.value })
                        }); */
                        /* const indexNode = edges.indexOf(edges[nodeIndex+1]);
                        setEdges((previous) => {
                            return removeItem(previous, edges[indexNode]);
                        }); */
                        /* console.log(previous); */
                        /* console.log("edges[nodeIndex]", edges[nodeIndex]); */
                        return removeItem(previousNodes, previousNodes[nodeIndex]);
                    });
                    break;
            }
            setShowDeleteModal(false);
        } else {
            // TODO: ALERT 
        }
    }

    const options = nodes.map((node, index) => {
        return {
            label: node.label,
            value: node.id
        }
    });

    useEffect(() => {
        //console.log("length", nodes.length);
        //console.log("edges", edges);
        console.log("*************************************************************************************");
        console.log("nodes", nodes);
        console.log("edges", edges);
        console.log("*************************************************************************************");
    }, [nodes, edges]);

    return (
        <Card height="80vh">
            <Subtitle>Nodos: </Subtitle>{JSON.stringify(nodes)}
            <Text>Cantidad: </Text>{JSON.stringify(nodes.length)}
            <Divider />
            <Subtitle>Nodos: </Subtitle>{JSON.stringify(edges)}
            <Text>Cantidad: </Text>{JSON.stringify(edges.length)}
            <Container>
                <Button text="Agregar" icon={faPlus} onClick={() => setShowAddModal(true)} />
                <Button text="Eliminar" icon={faPlus} onClick={() => setShowDeleteModal(true)} />
                <Button text="Limpiar" icon={faTrashAlt} onClick={() => { setNodes([]); setEdges([]); }} />

                <Network
                    key={edges}
                    nodes={nodes}
                    edges={edges}
                />
            </Container>
            <Modal showModal={showAddModal} setModalShow={setShowAddModal} height="100%">
                <div>
                    <Button text="Agregar nodo random" icon={faPlus} onClick={() => addRandom()} />
                    <Input
                        type="text"
                        label="Valor"
                        name="Value"
                        onChange={(e) => setValue(e.target.value)}
                        clearable
                        value={value}
                        onClearClick={() => { }}
                    />
                    <div className="mv-5">
                        <Subtitle>Conectar nodos</Subtitle>
                        <Divider />
                        <div className="row mv-5">
                            <div>
                                <Subtitle>Desde</Subtitle>
                                <Select
                                    className="mh-3"
                                    label="Desde"
                                    options={options}
                                />
                            </div>
                            <div>
                                <Subtitle>Hacia</Subtitle>
                                <Select
                                    className="mh-3"
                                    label="Hacia"
                                    options={options}
                                />
                            </div>
                        </div>
                    </div>
                    <Button text="Agregar" icon={faPlus} onClick={() => { addNode(); }} />
                </div>
            </Modal>
            <Modal showModal={showDeleteModal} setModalShow={setShowDeleteModal} height="100%">
                <Container>
                    <Subtitle>Nodo</Subtitle>
                    <Select
                        className="mh-3"
                        label="Desde"
                        options={options}
                        onChange={(e) => setSelectedNode(e)}
                    />
                    <div className="center">
                        <Button text="Eliminar" icon={faTrashAlt} onClick={() => deleteNode()} />
                    </div>
                </Container>
            </Modal>
        </Card>
    )
}

export default Graph;
