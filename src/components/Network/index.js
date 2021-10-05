import React, { Component, useEffect, useState } from 'react';
import { Network as VisNetwork, Node, Edge } from 'react-vis-network';
import { Network as Vis } from 'react-vis-network';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const VisNet = styled(Vis)`
    border: 1px solid ${(props) => props.theme.DIVIDER_COLOR};
    border-radius: 10px;
    cursor: grab;
`;

const Network = (props) => {

    const [network, setNetwork] = useState(null);
    const [graphData, setGraphData] = useState(null);
    const [events, setEvents] = useState(null);

    useEffect(() => {
        console.log("Network", network);
        console.log("edges", props.edges);
        console.log("nodes", props.nodes);
    }, [network, props.edges, props.nodes]);

    return (
        <VisNet 
            getNetwork={network => console.log("Network2", network)}
            graph={graphData}
            events
            onClick={props.onClick}>
            {/* {
                props.nodes.map((node, index) => {
                    return <Node key={index} id={node.id} label={node.label} />
                })
            }
            {
                props.edges.map((edge, index) => {
                    return <Edge key={index} id={edge.id} from={edge.from} to={edge.to} />
                })
            } */}
        </VisNet>
    )

}

Network.propTypes = {
    nodes: PropTypes.array,
    edges: PropTypes.array,
    onClick: PropTypes.func,
}

export default Network;
