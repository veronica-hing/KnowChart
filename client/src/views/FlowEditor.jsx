import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Flow from "../components/Flow";

const FlowEditor = () => {
    return (
        <div>
            <h1>Let's create a KnowChart</h1>
            <Flow/>
        </div>
    );
}

export default FlowEditor;