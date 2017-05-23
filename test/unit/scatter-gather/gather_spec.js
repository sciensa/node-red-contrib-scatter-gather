/* eslint-env mocha */
/* eslint strict: [2, "global"], no-unused-expressions: [0]*/

import sinon from 'sinon';
import helper from '../helpers';
import Flow from '../utils/flow';
import node from '../../../scatter-gather/gather';

describe('gather node', () => {
  beforeEach((done) => {
    helper.startServer(done);
  });

  afterEach((done) => {
    helper.unload().then(() => {
      helper.stopServer(done);
    });
  });

  const gatherNode = {
    id: 'gather-node',
    type: 'Gather',
    name: 'gatherNode',
    wires: [],
  };

  const flow = [
    gatherNode,
  ];

  it('loads defaults currectly', (done) => {
    helper.load(node, flow, () => {
      const gather = helper.getNode('gather-node');
      expect(gather.name).to.equal('gatherNode');
      done();
    });
  });

  describe('on', () => {
    describe('input', () => {
      context('when data size is != from total', () => {
        const mockedFlow = new Flow({ data: {}, total: 3 });

        it('does not return the message', (done) => {
          helper.load(node, flow, () => {
            const gather = helper.getNode('gather-node');
            gather.context = () => ({ flow: mockedFlow });
            const send = sinon.spy(gather, 'send');

            gather.emit('input', { payload: {} });

            expect(send).to.have.not.been.called;

            done();
          });
        });
      });

      context('when data size is == total', () => {
        const mockedFlow = new Flow({ data: { 0: { ninja: 'naruto' } }, total: 2 });

        it('returns a message payload gathering all received values', (done) => {
          helper.load(node, flow, () => {
            const gather = helper.getNode('gather-node');
            gather.context = () => ({ flow: mockedFlow });
            const send = sinon.spy(gather, 'send');

            gather.emit('input', { payload: { pokemon: 'charmander' } });

            expect(send).to.have.been.calledWith({
              payload: {
                0: { ninja: 'naruto' },
                1: { pokemon: 'charmander' },
              },
            });

            done();
          });
        });
      });

      context('when a message.source is given', () => {
        const mockedFlowWithSource = new Flow({ data: { ninjas: { ninja: 'naruto' } }, total: 2 });

        it('returns a message payload using the `message.source` as key', (done) => {
          helper.load(node, flow, () => {
            const gather = helper.getNode('gather-node');
            gather.context = () => ({ flow: mockedFlowWithSource });
            const send = sinon.spy(gather, 'send');

            gather.emit('input', { source: 'pokemons', payload: { pokemon: 'charmander' } });

            expect(send).to.have.been.calledWith({
              payload: {
                ninjas: { ninja: 'naruto' },
                pokemons: { pokemon: 'charmander' },
              },
            });

            done();
          });
        });
      });

      context('when a duplicated message.source is given', () => {
        const mockedFlowWithDuplicatedSource = new Flow({ data: { ninjas: { ninja: 'naruto' } }, total: 2 });

        it('shows an error and does not return the message', (done) => {
          helper.load(node, flow, () => {
            const gather = helper.getNode('gather-node');
            gather.context = () => ({ flow: mockedFlowWithDuplicatedSource });
            const error = sinon.spy(gather, 'error');

            gather.emit('input', { source: 'ninjas', payload: { ninja: 'sasuke' } });

            expect(error).to.have.been.calledWith('Scatter-Gather Error: msg.source must be unique and \'ninjas\' has been taken! Current: \'ninjas\'');

            done();
          });
        });
      });
    });
  });
});
