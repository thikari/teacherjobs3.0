import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _without from 'lodash/without';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _filter from 'lodash/filter';
import _each from 'lodash/each';

import cx from 'classnames';
import React, { Component, PropTypes } from 'react';

import { customPropTypes, getElementType, getUnhandledProps, makeDebugger, META, SUI, useKeyOnly, useWidthProp } from '../../lib';
import FormButton from './FormButton';
import FormCheckbox from './FormCheckbox';
import FormDropdown from './FormDropdown';
import FormField from './FormField';
import FormGroup from './FormGroup';
import FormInput from './FormInput';
import FormRadio from './FormRadio';
import FormSelect from './FormSelect';
import FormTextArea from './FormTextArea';

var debug = makeDebugger('form');

var getNodeName = function getNodeName(_ref) {
  var name = _ref.name;
  return name;
};
var debugSerializedResult = function debugSerializedResult() {
  return undefined;
};

if (process.NODE_ENV !== 'production') {
  // debug serialized values
  debugSerializedResult = function debugSerializedResult(json, name, node) {
    debug('serialized ' + JSON.stringify(_defineProperty({}, name, json[name])) + ' from:', node);
  };

  // warn about form nodes missing a "name"
  getNodeName = function getNodeName(node) {
    var name = node.name;

    if (!name) {
      var errorMessage = ['Encountered a form control node without a name attribute.', 'Each node in a group should have a name.', 'Otherwise, the node will serialize as { "undefined": <value> }.'].join(' ');
      console.error(errorMessage, node); // eslint-disable-line no-console
    }

    return name;
  };
}

function formSerializer(formNode) {
  debug('formSerializer()');
  var json = {};
  // handle empty formNode ref
  if (!formNode) return json;

  // ----------------------------------------
  // Checkboxes
  // Single: { name: value|bool        }
  // Group:  { name: [value|bool, ...] }

  _each(formNode.querySelectorAll('input[type="checkbox"]'), function (node, index, arr) {
    var name = getNodeName(node);
    var checkboxesByName = _filter(arr, { name: name });

    // single: (value|checked)
    if (checkboxesByName.length === 1) {
      json[name] = node.checked && node.value !== 'on' ? node.value : node.checked;
      debugSerializedResult(json, name, node);
      return;
    }

    // groups (checked): [value, ...]
    if (!Array.isArray(json[name])) json[name] = [];
    if (node.checked) json[name].push(node.value);
    debugSerializedResult(json, name, node);

    // in dev, warn about multiple checkboxes with a default browser value of "on"
    if (process.NODE_ENV !== 'production' && node.value === 'on') {
      var errorMessage = ["Encountered a checkbox in a group with the default browser value 'on'.", 'Each checkbox in a group should have a unique value.', "Otherwise, the checkbox value will serialize as ['on', ...]."].join(' ');
      console.error(errorMessage, node, formNode); // eslint-disable-line no-console
    }
  });

  // ----------------------------------------
  // Radios
  // checked: { name: checked value }
  // none:    { name: null }

  _each(formNode.querySelectorAll('input[type="radio"]'), function (node, index, arr) {
    var name = getNodeName(node);
    var checkedRadio = _find(arr, { name: name, checked: true });

    if (checkedRadio) {
      json[name] = checkedRadio.value;
    } else {
      json[name] = null;
    }

    debugSerializedResult(json, name, node);

    // in dev, warn about radios with a default browser value of "on"
    if (process.NODE_ENV !== 'production' && node.value === 'on') {
      var errorMessage = ["Encountered a radio with the default browser value 'on'.", 'Each radio should have a unique value.', "Otherwise, the radio value will serialize as { [name]: 'on' }."].join(' ');
      console.error(errorMessage, node, formNode); // eslint-disable-line no-console
    }
  });

  // ----------------------------------------
  // Other inputs
  // { name: value }

  _each(formNode.querySelectorAll('input:not([type="radio"]):not([type="checkbox"])'), function (node) {
    var name = getNodeName(node);
    json[name] = node.value;
    debugSerializedResult(json, name, node);
  });

  // ----------------------------------------
  // Other inputs and text areas
  // { name: value }

  _each(formNode.querySelectorAll('textarea'), function (node) {
    var name = getNodeName(node);
    json[name] = node.value;
    debugSerializedResult(json, name, node);
  });

  // ----------------------------------------
  // Selects
  // single:   { name: value }
  // multiple: { name: [value, ...] }

  _each(formNode.querySelectorAll('select'), function (node) {
    var name = getNodeName(node);

    if (node.multiple) {
      json[name] = _map(_filter(node.querySelectorAll('option'), 'selected'), 'value');
    } else {
      json[name] = node.value;
    }

    debugSerializedResult(json, name, node);
  });

  return json;
}

var _meta = {
  name: 'Form',
  type: META.TYPES.COLLECTION,
  props: {
    widths: ['equal'],
    size: _without(SUI.SIZES, 'medium')
  }
};

/**
 * A Form displays a set of related user input fields in a structured way.
 * @see Button
 * @see Checkbox
 * @see Dropdown
 * @see Input
 * @see Message
 * @see Radio
 * @see Select
 * @see TextArea
 */

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref2, [this].concat(args))), _this), _this._form = null, _this.handleRef = function (c) {
      return _this._form = _this._form || c;
    }, _this.handleSubmit = function (e) {
      var _this$props = _this.props,
          onSubmit = _this$props.onSubmit,
          serializer = _this$props.serializer;


      if (onSubmit) onSubmit(e, _extends({}, _this.props, { formData: serializer(_this._form) }));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Form, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          error = _props.error,
          inverted = _props.inverted,
          loading = _props.loading,
          reply = _props.reply,
          size = _props.size,
          success = _props.success,
          warning = _props.warning,
          widths = _props.widths;


      var classes = cx('ui', size, useKeyOnly(error, 'error'), useKeyOnly(inverted, 'inverted'), useKeyOnly(loading, 'loading'), useKeyOnly(reply, 'reply'), useKeyOnly(success, 'success'), useKeyOnly(warning, 'warning'), useWidthProp(widths, null, true), 'form', className);
      var rest = getUnhandledProps(Form, this.props);
      var ElementType = getElementType(Form, this.props);

      return React.createElement(
        ElementType,
        _extends({}, rest, { className: classes, ref: this.handleRef, onSubmit: this.handleSubmit }),
        children
      );
    }
  }]);

  return Form;
}(Component);

Form.defaultProps = {
  as: 'form',
  serializer: formSerializer
};
Form._meta = _meta;
Form.Field = FormField;
Form.Button = FormButton;
Form.Checkbox = FormCheckbox;
Form.Dropdown = FormDropdown;
Form.Group = FormGroup;
Form.Input = FormInput;
Form.Radio = FormRadio;
Form.Select = FormSelect;
Form.TextArea = FormTextArea;
export default Form;
process.env.NODE_ENV !== "production" ? Form.propTypes = {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Automatically show any error Message children */
  error: PropTypes.bool,

  /** A form can have its color inverted for contrast */
  inverted: PropTypes.bool,

  /** Automatically show a loading indicator */
  loading: PropTypes.bool,

  /**
   * Called on submit
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and the form's serialized values.
   */
  onSubmit: PropTypes.func,

  /** A comment can contain a form to reply to a comment. This may have arbitrary content. */
  reply: PropTypes.bool,

  /** Called onSubmit with the form node that returns the serialized form object */
  serializer: PropTypes.func,

  /** A form can vary in size */
  size: PropTypes.oneOf(_meta.props.size),

  /** Automatically show any success Message children */
  success: PropTypes.bool,

  /** Automatically show any warning Message children */
  warning: PropTypes.bool,

  /** Forms can automatically divide fields to be equal width */
  widths: PropTypes.oneOf(_meta.props.widths)
} : void 0;
Form.handledProps = ['as', 'children', 'className', 'error', 'inverted', 'loading', 'onSubmit', 'reply', 'serializer', 'size', 'success', 'warning', 'widths'];