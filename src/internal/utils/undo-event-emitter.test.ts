import { undoEventEmitter, eventEmitter } from './undo-event-emitter';

jest.mock('eventemitter3', () => {
  return jest.fn().mockImplementation(() => {
    return {
      once: jest.fn(),
      emit: jest.fn(),
    };
  });
});

describe('undoEventEmitter', () => {
  it('should call once on the EventEmitter with correct arguments', () => {
    const callback = jest.fn();
    undoEventEmitter.once('end', callback);

    expect(eventEmitter.once).toHaveBeenCalled();
    expect(eventEmitter.once).toHaveBeenCalledWith('end', callback);
  });

  it('should call emit on the EventEmitter with correct arguments', () => {
    const isUndo = true;
    undoEventEmitter.emit('end', isUndo);

    expect(eventEmitter.emit).toHaveBeenCalledWith('end', isUndo);
  });
});

