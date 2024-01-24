import React, { useState } from 'react';

const TreeNode = ({ node }) => (
  <ul>
    <li>
      {node.name}
      {node.children.length > 0 && (
        <ul>
          {node.children.map(child => (
            <TreeNode key={child.name} node={child} />
          ))}
        </ul>
      )}
    </li>
  </ul>
);

const App = () => {
  const [nodeType, setNodeType] = useState('');
  const [nodeValue, setNodeValue] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [treeData, setTreeData] = useState({
    name: "Root",
    children: [],
  });

  const addNode = (type, text) => {
    let newNode = { name: text, children: [] };

    if (type === "Single Node") {
      setTreeData(prevState => ({
        ...prevState,
        children: [...prevState.children, newNode],
      }));
    } else if (type === "Child Node" && selectedNode) {
      const newTreeData = JSON.parse(JSON.stringify(treeData)); // Deep copy

      const updateChildren = (parentNode) => {
        parentNode.children = [...parentNode.children, newNode];
      };

      const findAndUpdate = (currentNode) => {
        if (currentNode.children) {
          currentNode.children.forEach(findAndUpdate);
        }
        if (currentNode === selectedNode) {
          updateChildren(currentNode);
        }
      };

      findAndUpdate(newTreeData);
      setTreeData(newTreeData);
    } else if (type === "Parent Node") {
      const newTreeData = {
        name: text,
        children: [treeData],
      };
      setTreeData(newTreeData);
    }
  };

  return (
    <div>
      <div>
        <label>Node Type</label>
        <select value={nodeType} onChange={e => setNodeType(e.target.value)}>
          <option>Select one...</option>
          <option>Single Node</option>
          <option>Child Node</option>
          <option>Parent Node</option>
        </select>
      </div>
      <div>
        <label>Node Value</label>
        <input type="text" value={nodeValue} onChange={e => setNodeValue(e.target.value)} />
        <button onClick={() => addNode(nodeType, nodeValue)}>Add Node</button>
      </div>
      <div id="treeContainer">
        <TreeNode node={treeData} />
      </div>
    </div>
  );
};

export default App;
