import React, { FC } from 'react';
import { Card, } from 'antd';
import styled from 'styled-components';
import { CgProfile } from "react-icons/cg";

const icon = styled.span`
    background_image: "src/assets/react.svg";
`;

export default function JobPost() {
    return <>
        <div className="container">
            <div className="row">
                <div className="col-md-1 col-4">
                    <CgProfile />
                </div>
            </div>
        </div>
    </>
};
