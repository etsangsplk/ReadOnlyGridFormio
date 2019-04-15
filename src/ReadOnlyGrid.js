import _ from 'lodash';
import formiojs from 'formiojs';
var NestedComponent = formiojs.Components.components.nested;
var BaseComponent = formiojs.Components.components.base;
var Components = formiojs.Components;

class ReadOnlyNestedComponent extends NestedComponent {
  constructor(component, options, data) {
    super(component, options, data);
  }

  addComponent(component, element, data, before, noAdd, state) {
    console.log(component);
    super.addComponent(component, element, data,before,noAdd,state);
  }
}

export default class ReadOnlyGridComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      type: 'readonlygrid',
      label: 'Read Only Grid',
      key: 'readOnlyGrid',
      clearOnHide: true,
      input: false,
      tree: true,
      defaultOpen: false,
      removeRow: '',
      components: [],
      inlineEdit: false,
      templates: {
        header: this.defaultHeaderTemplate,
        row: this.defaultRowTemplate,
        footer: ''
      }
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Read Only Grid',
      icon: 'fa fa-tasks',
      group: 'data',
      documentation: 'http://help.form.io/userguide',
      weight: 40,
      schema: ReadOnlyGridComponent.schema()
    };
  }

  addComponent(component, element, data, before, noAdd, state) {
    if(!component.internal)
      component.disabled = true;
    return super.addComponent(component, element, data,before,noAdd,state);
  }

  static get defaultHeaderTemplate() {
    return `<div class="row">
  {% util.eachComponent(components, function(component) { %}
    <div class="col-sm-2"><strong>{{ component.label }}</strong></div>
  {% }) %}
</div>`;
  }

  static get defaultRowTemplate() {
    return `<div class="row">
  {% util.eachComponent(components, function(component) { %}
    <div class="col-sm-2">
      {{ getView(component, row[component.key]) }}
    </div>
  {% }) %}
  </div>`;
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.type = 'datagrid';
    this.rows = [];
  }

  get defaultSchema() {
    return ReadOnlyGridComponent.schema();
  }

  get emptyValue() {
    return [];
  }

  build(state) {
    if (this.options.builder) {
      return super.build(state, true);
    }
    this.createElement();
    this.createLabel(this.element);
    const dataValue = this.dataValue;
    if (Array.isArray(dataValue)) {
      // Ensure we always have rows for each dataValue available.
      dataValue.forEach((row, rowIndex) => {
        if (this.rows[rowIndex]) {
          this.rows[rowIndex].data = row;
        } else {
          this.rows[rowIndex] = {
            components: [],
            isOpen: !!this.options.defaultOpen,
            data: row
          };
        }
      });
    }

    this.buildTable();
    this.createDescription(this.element);
    this.element.appendChild(this.errorContainer = this.ce('div', { class: 'has-error' }));
    this.attachLogic();
  }

  buildTable(fromBuild) {
    // Do not show the table when in builder mode.
    if (this.options.builder) {
      return;
    }
    let tableClass = 'editgrid-listgroup list-group ';
    ['striped', 'bordered', 'hover', 'condensed'].forEach(prop => {
      if (this.component[prop]) {
        tableClass += `table-${prop} `;
      }
    });
    const tableElement = this.ce('ul', { class: tableClass }, [this.headerElement = this.createHeader(), this.rowElements = this.rows.map(this.createRow.bind(this)), this.footerElement = this.createFooter()]);

    if (this.tableElement && this.element.contains(this.tableElement)) {
      this.element.replaceChild(tableElement, this.tableElement);
    } else {
      this.element.appendChild(tableElement);
    }
    //add open class to the element if any edit grid row is open
    const isAnyRowOpen = this.rows.some(row => row.isOpen);
    if (isAnyRowOpen) {
      this.addClass(this.element, `formio-component-${this.component.type}-row-open`);
    } else {
      this.removeClass(this.element, `formio-component-${this.component.type}-row-open`);
    }
    this.tableElement = tableElement;
    if (this.allowReorder) {
      this.addDraggable([this.tableElement]);
    }
  }

  getRowDragulaOptions() {
    const superOptions = super.getRowDragulaOptions();
    superOptions.accepts = function (draggedElement, newParent, oldParent, nextSibling) {
      //disallow dragging above Edit Grid header
      return !nextSibling || !nextSibling.classList.contains('formio-edit-grid-header');
    };
    return superOptions;
  }

  createHeader() {
    const templateHeader = _.get(this.component, 'templates.header');
    if (!templateHeader) {
      return this.text('');
    }
    const headerMarkup = this.renderTemplate(templateHeader, {
      components: this.component.components,
      value: this.dataValue
    });
    let headerElement;
    if (this.allowReorder) {
      headerElement = this.ce('div', {
        class: 'row'
      }, [this.ce('div', {
        class: 'col-xs-1'
      }), this.ce('div', {
        class: 'col-xs-11'
      }, headerMarkup)]);
    } else {
      headerElement = headerMarkup;
    }
    return this.ce('li', {
      class: 'list-group-item list-group-header formio-edit-grid-header'
    }, headerElement);
  }

  createRow(row, rowIndex) {
    const wrapper = this.ce('li', { class: 'list-group-item' });
    const rowTemplate = _.get(this.component, 'templates.row', ReadOnlyGridComponent.defaultRowTemplate);

    // Store info so we can detect changes later.
    wrapper.rowData = row.data;
    wrapper.rowIndex = rowIndex;
    row.components = [];

    const rowMarkup = this.renderTemplate(rowTemplate, {
      row: row.data,
      data: this.data,
      rowIndex,
      components: this.component.components,
      getView: (component, data) => Components.create(component, this.options, data, true).getView(data)
    });
    let rowElement;
    rowElement = rowMarkup;

    wrapper.appendChild(rowElement);
    wrapper.appendChild(row.errorContainer = this.ce('div', { class: 'has-error' }));
    return wrapper;
  }

  createFooter() {
    const footerTemplate = _.get(this.component, 'templates.footer');
    if (!footerTemplate) {
      return this.text('');
    }
    return this.ce('li', {
      class: 'list-group-item list-group-footer'
    }, this.renderTemplate(footerTemplate, {
      components: this.component.components,
      value: this.dataValue
    }));
  }

  updateGrid() {
    this.updateValue();
    this.triggerChange();
    this.buildTable();
  }

  get defaultValue() {
    const value = super.defaultValue;
    return Array.isArray(value) ? value : [];
  }

  updateValue(flags, value) {
    // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
    return BaseComponent.prototype.updateValue.call(this, flags, value);
  }

  setValue(value) {
    if (!value) {
      this.rows = this.defaultValue;
      this.buildTable();
      return;
    }
    if (!Array.isArray(value)) {
      if (typeof value === 'object') {
        value = [value];
      } else {
        return;
      }
    }

    const changed = this.hasChanged(value, this.dataValue);
    this.dataValue = value;
    const dataValue = this.dataValue;
    if (Array.isArray(dataValue)) {
      // Refresh editRow data when data changes.
      dataValue.forEach((row, rowIndex) => {
        if (this.rows[rowIndex]) {
          this.rows[rowIndex].data = row;
        } else {
          this.rows[rowIndex] = {
            components: [],
            isOpen: !!this.options.defaultOpen,
            data: row
          };
        }
      });

      // Remove any extra edit rows.
      if (dataValue.length < this.rows.length) {
        for (let rowIndex = this.rows.length - 1; rowIndex >= dataValue.length; rowIndex--) {
          this.removeChildFrom(this.rows[rowIndex].element, this.tableElement);
          this.rows.splice(rowIndex, 1);
        }
      }
    }

    this.buildTable();
    return changed;
  }

  /**
   * Get the value of this component.
   *
   * @returns {*}
   */
  getValue() {
    return this.dataValue;
  }

  clearOnHide(show) {
    super.clearOnHide(show);
    if (!this.component.clearOnHide) {
      // If some components set to clearOnHide we need to clear them.
      this.buildTable();
    }
  }

  restoreComponentsContext() {
    return;
  }
}