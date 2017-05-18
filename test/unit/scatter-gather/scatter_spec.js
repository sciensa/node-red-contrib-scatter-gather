import sinon from 'sinon';
import helper from '../helpers';
import Flow from '../utils/flow';
import node from '../../../scatter-gather/scatter';

describe('scatter node', () => {
  beforeEach((done) => {
    helper.startServer(done);
  });

  afterEach((done) => {
    helper.unload().then(() => {
      helper.stopServer(done);
    });
  });

  const scatterNode = {
    id: 'scatter-node',
    type: 'Scatter',
    name: 'scatterNode',
    wires: [['target-node', 'helper-node']],
  };

  const targetNode = {
    id: 'target-node',
    type: 'helper',
    name: 'targetNode',
    wires: [],
  };

  const helperNode = {
    id: 'helper-node',
    type: 'helper',
    name: 'helperNode',
    wires: [],
  };

  const flow = [
    scatterNode,
    targetNode,
    helperNode,
  ];

  it('loads defaults currectly', (done) => {
    helper.load(node, flow, () => {
      const scatter = helper.getNode('scatter-node');
      expect(scatter.name).to.equal('scatterNode');
      done();
    });
  });

  describe('on', () => {
    describe('input', () => {
      it('sets context.flow.data with a new map', (done) => {
        helper.load(node, flow, () => {
          const scatter = helper.getNode('scatter-node');
          const mockedFlow = new Flow();
          const flowSet = sinon.spy(mockedFlow, 'set');
          scatter.context = () => ({ flow: mockedFlow });

          scatter.emit('input', {});

          expect(flowSet).to.have.been.calledWith('data', {});
          done();
        });
      });

      it('sets context.flow.total with the total of nodes', (done) => {
        helper.load(node, flow, () => {
          const scatter = helper.getNode('scatter-node');
          const mockedFlow = new Flow();
          const flowSet = sinon.spy(mockedFlow, 'set');
          scatter.context = () => ({ flow: mockedFlow });

          scatter.emit('input', {});

          expect(flowSet).to.have.been.calledWith('total', scatterNode.wires[0].length);
          done();
        });
      });
    });
  });
});
