'use babel';

import PyDemo2View from './py-demo2-view';
import { CompositeDisposable } from 'atom';

export default {

  pyDemo2View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.pyDemo2View = new PyDemo2View(state.pyDemo2ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pyDemo2View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'py-demo2:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pyDemo2View.destroy();
  },

  serialize() {
    return {
      pyDemo2ViewState: this.pyDemo2View.serialize()
    };
  },

  toggle() {
    console.log('PyDemo2 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
