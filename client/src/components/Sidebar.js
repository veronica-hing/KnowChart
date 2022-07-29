import React from 'react';

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div>
      <div className="description">You can drag a node to the other pane and edit text</div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'textNode')} draggable>
        texty node
      </div>
      <div className="description">You need to double click the node after typing to save the text...</div>
    </div>
  );
};

export default Sidebar;