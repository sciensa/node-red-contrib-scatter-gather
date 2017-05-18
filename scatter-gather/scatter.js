module.exports = (RED) => {
  function ScatterNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    node.total = Number(config.total || 1);

    node.on('input', (message) => {
      const context = node.context();
      context.flow.set('data', {});
      context.flow.set('total', node.wires[0].length);

      node.send(message);
    });
  }
  RED.nodes.registerType('Scatter', ScatterNode);
};
