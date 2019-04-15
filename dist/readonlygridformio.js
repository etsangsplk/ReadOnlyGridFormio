/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ReadOnlyGrid.js":
/*!*****************************!*\
  !*** ./src/ReadOnlyGrid.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ReadOnlyGridComponent; });\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var formiojs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! formiojs */ \"formiojs\");\n/* harmony import */ var formiojs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(formiojs__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar NestedComponent = formiojs__WEBPACK_IMPORTED_MODULE_1___default.a.Components.components.nested;\nvar BaseComponent = formiojs__WEBPACK_IMPORTED_MODULE_1___default.a.Components.components.base;\nvar Components = formiojs__WEBPACK_IMPORTED_MODULE_1___default.a.Components;\n\nclass ReadOnlyNestedComponent extends NestedComponent {\n  constructor(component, options, data) {\n    super(component, options, data);\n  }\n\n  addComponent(component, element, data, before, noAdd, state) {\n    console.log(component);\n    super.addComponent(component, element, data, before, noAdd, state);\n  }\n\n}\n\nclass ReadOnlyGridComponent extends NestedComponent {\n  static schema(...extend) {\n    return NestedComponent.schema({\n      type: 'readonlygrid',\n      label: 'Read Only Grid',\n      key: 'readOnlyGrid',\n      clearOnHide: true,\n      input: false,\n      tree: true,\n      defaultOpen: false,\n      removeRow: '',\n      components: [],\n      inlineEdit: false,\n      templates: {\n        header: this.defaultHeaderTemplate,\n        row: this.defaultRowTemplate,\n        footer: ''\n      }\n    }, ...extend);\n  }\n\n  static get builderInfo() {\n    return {\n      title: 'Read Only Grid',\n      icon: 'fa fa-tasks',\n      group: 'data',\n      documentation: 'http://help.form.io/userguide',\n      weight: 40,\n      schema: ReadOnlyGridComponent.schema()\n    };\n  }\n\n  addComponent(component, element, data, before, noAdd, state) {\n    if (!component.internal) component.disabled = true;\n    return super.addComponent(component, element, data, before, noAdd, state);\n  }\n\n  static get defaultHeaderTemplate() {\n    return `<div class=\"row\">\n  {% util.eachComponent(components, function(component) { %}\n    <div class=\"col-sm-2\"><strong>{{ component.label }}</strong></div>\n  {% }) %}\n</div>`;\n  }\n\n  static get defaultRowTemplate() {\n    return `<div class=\"row\">\n  {% util.eachComponent(components, function(component) { %}\n    <div class=\"col-sm-2\">\n      {{ getView(component, row[component.key]) }}\n    </div>\n  {% }) %}\n  </div>`;\n  }\n\n  constructor(component, options, data) {\n    super(component, options, data);\n    this.type = 'datagrid';\n    this.rows = [];\n  }\n\n  get defaultSchema() {\n    return ReadOnlyGridComponent.schema();\n  }\n\n  get emptyValue() {\n    return [];\n  }\n\n  build(state) {\n    if (this.options.builder) {\n      return super.build(state, true);\n    }\n\n    this.createElement();\n    this.createLabel(this.element);\n    const dataValue = this.dataValue;\n\n    if (Array.isArray(dataValue)) {\n      // Ensure we always have rows for each dataValue available.\n      dataValue.forEach((row, rowIndex) => {\n        if (this.rows[rowIndex]) {\n          this.rows[rowIndex].data = row;\n        } else {\n          this.rows[rowIndex] = {\n            components: [],\n            isOpen: !!this.options.defaultOpen,\n            data: row\n          };\n        }\n      });\n    }\n\n    this.buildTable();\n    this.createDescription(this.element);\n    this.element.appendChild(this.errorContainer = this.ce('div', {\n      class: 'has-error'\n    }));\n    this.attachLogic();\n  }\n\n  buildTable(fromBuild) {\n    // Do not show the table when in builder mode.\n    if (this.options.builder) {\n      return;\n    }\n\n    let tableClass = 'editgrid-listgroup list-group ';\n    ['striped', 'bordered', 'hover', 'condensed'].forEach(prop => {\n      if (this.component[prop]) {\n        tableClass += `table-${prop} `;\n      }\n    });\n    const tableElement = this.ce('ul', {\n      class: tableClass\n    }, [this.headerElement = this.createHeader(), this.rowElements = this.rows.map(this.createRow.bind(this)), this.footerElement = this.createFooter()]);\n\n    if (this.tableElement && this.element.contains(this.tableElement)) {\n      this.element.replaceChild(tableElement, this.tableElement);\n    } else {\n      this.element.appendChild(tableElement);\n    } //add open class to the element if any edit grid row is open\n\n\n    const isAnyRowOpen = this.rows.some(row => row.isOpen);\n\n    if (isAnyRowOpen) {\n      this.addClass(this.element, `formio-component-${this.component.type}-row-open`);\n    } else {\n      this.removeClass(this.element, `formio-component-${this.component.type}-row-open`);\n    }\n\n    this.tableElement = tableElement;\n\n    if (this.allowReorder) {\n      this.addDraggable([this.tableElement]);\n    }\n  }\n\n  getRowDragulaOptions() {\n    const superOptions = super.getRowDragulaOptions();\n\n    superOptions.accepts = function (draggedElement, newParent, oldParent, nextSibling) {\n      //disallow dragging above Edit Grid header\n      return !nextSibling || !nextSibling.classList.contains('formio-edit-grid-header');\n    };\n\n    return superOptions;\n  }\n\n  createHeader() {\n    const templateHeader = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(this.component, 'templates.header');\n\n    if (!templateHeader) {\n      return this.text('');\n    }\n\n    const headerMarkup = this.renderTemplate(templateHeader, {\n      components: this.component.components,\n      value: this.dataValue\n    });\n    let headerElement;\n\n    if (this.allowReorder) {\n      headerElement = this.ce('div', {\n        class: 'row'\n      }, [this.ce('div', {\n        class: 'col-xs-1'\n      }), this.ce('div', {\n        class: 'col-xs-11'\n      }, headerMarkup)]);\n    } else {\n      headerElement = headerMarkup;\n    }\n\n    return this.ce('li', {\n      class: 'list-group-item list-group-header formio-edit-grid-header'\n    }, headerElement);\n  }\n\n  createRow(row, rowIndex) {\n    const wrapper = this.ce('li', {\n      class: 'list-group-item'\n    });\n\n    const rowTemplate = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(this.component, 'templates.row', ReadOnlyGridComponent.defaultRowTemplate); // Store info so we can detect changes later.\n\n\n    wrapper.rowData = row.data;\n    wrapper.rowIndex = rowIndex;\n    row.components = [];\n    const rowMarkup = this.renderTemplate(rowTemplate, {\n      row: row.data,\n      data: this.data,\n      rowIndex,\n      components: this.component.components,\n      getView: (component, data) => Components.create(component, this.options, data, true).getView(data)\n    });\n    let rowElement;\n    rowElement = rowMarkup;\n    wrapper.appendChild(rowElement);\n    wrapper.appendChild(row.errorContainer = this.ce('div', {\n      class: 'has-error'\n    }));\n    return wrapper;\n  }\n\n  createFooter() {\n    const footerTemplate = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(this.component, 'templates.footer');\n\n    if (!footerTemplate) {\n      return this.text('');\n    }\n\n    return this.ce('li', {\n      class: 'list-group-item list-group-footer'\n    }, this.renderTemplate(footerTemplate, {\n      components: this.component.components,\n      value: this.dataValue\n    }));\n  }\n\n  updateGrid() {\n    this.updateValue();\n    this.triggerChange();\n    this.buildTable();\n  }\n\n  get defaultValue() {\n    const value = super.defaultValue;\n    return Array.isArray(value) ? value : [];\n  }\n\n  updateValue(flags, value) {\n    // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.\n    return BaseComponent.prototype.updateValue.call(this, flags, value);\n  }\n\n  setValue(value) {\n    if (!value) {\n      this.rows = this.defaultValue;\n      this.buildTable();\n      return;\n    }\n\n    if (!Array.isArray(value)) {\n      if (typeof value === 'object') {\n        value = [value];\n      } else {\n        return;\n      }\n    }\n\n    const changed = this.hasChanged(value, this.dataValue);\n    this.dataValue = value;\n    const dataValue = this.dataValue;\n\n    if (Array.isArray(dataValue)) {\n      // Refresh editRow data when data changes.\n      dataValue.forEach((row, rowIndex) => {\n        if (this.rows[rowIndex]) {\n          this.rows[rowIndex].data = row;\n        } else {\n          this.rows[rowIndex] = {\n            components: [],\n            isOpen: !!this.options.defaultOpen,\n            data: row\n          };\n        }\n      }); // Remove any extra edit rows.\n\n      if (dataValue.length < this.rows.length) {\n        for (let rowIndex = this.rows.length - 1; rowIndex >= dataValue.length; rowIndex--) {\n          this.removeChildFrom(this.rows[rowIndex].element, this.tableElement);\n          this.rows.splice(rowIndex, 1);\n        }\n      }\n    }\n\n    this.buildTable();\n    return changed;\n  }\n  /**\n   * Get the value of this component.\n   *\n   * @returns {*}\n   */\n\n\n  getValue() {\n    return this.dataValue;\n  }\n\n  clearOnHide(show) {\n    super.clearOnHide(show);\n\n    if (!this.component.clearOnHide) {\n      // If some components set to clearOnHide we need to clear them.\n      this.buildTable();\n    }\n  }\n\n  restoreComponentsContext() {\n    return;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/ReadOnlyGrid.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ReadOnlyGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReadOnlyGrid */ \"./src/ReadOnlyGrid.js\");\n/* harmony import */ var formiojs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! formiojs */ \"formiojs\");\n/* harmony import */ var formiojs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(formiojs__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar Components = formiojs__WEBPACK_IMPORTED_MODULE_1___default.a.Components;\nComponents.addComponent('readonlygrid', _ReadOnlyGrid__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  ReadOnlyGridComponent: _ReadOnlyGrid__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "formiojs":
/*!*************************!*\
  !*** external "Formio" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = Formio;\n\n//# sourceURL=webpack:///external_%22Formio%22?");

/***/ }),

/***/ "lodash":
/*!********************!*\
  !*** external "_" ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = _;\n\n//# sourceURL=webpack:///external_%22_%22?");

/***/ })

/******/ });