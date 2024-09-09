import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();

export const undoEventEmitter = {
  /**
   * Listens for the next 'end' event and then removes the listener.
   *
   * @param type The type of event to listen for. Currently only 'end' is supported.
   * @param callback The callback function to be called when the event is emitted. The callback will receive a boolean indicating whether the event was triggered by an undo action.
   * @return A function that can be called to remove the listener.
   */
  once: (type: 'end', callback: (isUndo: boolean) => void) => {
    eventEmitter.once(type, callback);
  },
  /**
   * Emits an 'end' event, which is used to let any registered callbacks know that an undo/redo action has completed.
   *
   * @param type The type of event to emit. Currently only 'end' is supported.
   * @param isUndo A boolean indicating whether the event was triggered by an undo action.
   */
  emit: (type: 'end', isUndo: boolean) => {
    eventEmitter.emit(type, isUndo);
  },
};
