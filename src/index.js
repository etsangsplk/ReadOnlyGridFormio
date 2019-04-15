import ReadOnlyGridComponent from './ReadOnlyGrid';
import formiojs from 'formiojs';
var Components = formiojs.Components;
Components.addComponent('readonlygrid', ReadOnlyGridComponent);

export default {ReadOnlyGridComponent};