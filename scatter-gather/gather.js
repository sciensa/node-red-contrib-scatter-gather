module.exports = (RED) => {
  function GatherNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    node.on('input', (message) => {
      const context = node.context();
      const flow = context.flow;
      const data = flow.get('data');
      const total = parseInt(flow.get('total'), 10);
      const msg = message;
      const key = msg.source || Object.keys(data).length;

      if (Object.prototype.hasOwnProperty.call(data, key)) {
        node.error(`Scatter-Gather Error: msg.source must be unique and '${key}' has been taken! Current: '${Object.keys(data).join(', ')}'`, msg);
      } else {
        data[key] = msg.payload;
        if (Object.keys(data).length === total) {
          msg.payload = data;
          if (msg.source) {
            delete msg.source;
          }
          node.send(msg);
        }
      }
    });
  }
  RED.nodes.registerType('Gather', GatherNode);
};
