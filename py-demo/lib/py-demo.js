'use babel';

import PyDemoView from './py-demo-view';
import { CompositeDisposable } from 'atom';

export default {

  pyDemoView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.pyDemoView = new PyDemoView(state.pyDemoViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pyDemoView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'py-demo:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pyDemoView.destroy();
  },

  serialize() {
    return {
      pyDemoViewState: this.pyDemoView.serialize()
    };
  },

  toggle() {
    console.log('PyDemo was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
