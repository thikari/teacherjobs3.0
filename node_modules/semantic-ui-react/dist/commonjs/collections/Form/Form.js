'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _without2 = require('lodash/without');

var _without3 = _interopRequireDefault(_without2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _find2 = require('lodash/find');

var _find3 = _interopRequireDefault(_find2);

var _filter2 = require('lodash/filter');

var _filter3 = _interopRequireDefault(_filter2);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lib = require('../../lib');

var _FormButton = require('./FormButton');

var _FormButton2 = _interopRequireDefault(_FormButton);

var _FormCheckbox = require('./FormCheckbox');

var _FormCheckbox2 = _interopRequireDefault(_FormCheckbox);

var _FormDropdown = require('./FormDropdown');

var _FormDropdown2 = _interopRequireDefault(_FormDropdown);

var _FormField = require('./FormField');

var _FormField2 = _interopRequireDefault(_FormField);

var _FormGroup = require('./FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _FormInput = require('./FormInput');

var _FormInput2 = _interopRequireDefault(_FormInput);

var _FormRadio = require('./FormRadio');

var _FormRadio2 = _interopRequireDefault(_FormRadio);

var _FormSelect = require('./FormSelect');

var _FormSelect2 = _interopRequireDefault(_FormSelect);

var _FormTextArea = require('./FormTextArea');

var _FormTextArea2 = _interopRequireDefault(_FormTextArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _lib.makeDebugger)('form');

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
    debug('serialized ' + JSON.stringify((0, _defineProperty3.default)({}, name, json[name])) + ' from:', node);
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

  (0, _each3.default)(formNode.querySelectorAll('input[type="checkbox"]'), function (node, index, arr) {
    var name = getNodeName(node);
    var checkboxesByName = (0, _filter3.default)(arr, { name: name });

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

  (0, _each3.default)(formNode.querySelectorAll('input[type="radio"]'), function (node, index, arr) {
    var name = getNodeName(node);
    var checkedRadio = (0, _find3.default)(arr, { name: name, checked: true });

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

  (0, _each3.default)(formNode.querySelectorAll('input:not([type="radio"]):not([type="checkbox"])'), function (node) {
    var name = getNodeName(node);
    json[name] = node.value;
    debugSerializedResult(json, name, node);
  });

  // ----------------------------------------
  // Other inputs and text areas
  // { name: value }

  (0, _each3.default)(formNode.querySelectorAll('textarea'), function (node) {
    var name = getNodeName(node);
    json[name] = node.value;
    debugSerializedResult(json, name, node);
  });

  // ----------------------------------------
  // Selects
  // single:   { name: value }
  // multiple: { name: [value, ...] }

  (0, _each3.default)(formNode.querySelectorAll('select'), function (node) {
    var name = getNodeName(node);

    if (node.multiple) {
      json[name] = (0, _map3.default)((0, _filter3.default)(node.querySelectorAll('option'), 'selected'), 'value');
    } else {
      json[name] = node.value;
    }

    debugSerializedResult(json, name, node);
  });

  return json;
}

var _meta = {
  name: 'Form',
  type: _lib.META.TYPES.COLLECTION,
  props: {
    widths: ['equal'],
    size: (0, _without3.default)(_lib.SUI.SIZES, 'medium')
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
  (0, _inherits3.default)(Form, _Component);

  function Form() {
    var _ref2;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Form);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref2, [this].concat(args))), _this), _this._form = null, _this.handleRef = function (c) {
      return _this._form = _this._form || c;
    }, _this.handleSubmit = function (e) {
      var _this$props = _this.props,
          onSubmit = _this$props.onSubmit,
          serializer = _this$props.serializer;


      if (onSubmit) onSubmit(e, (0, _extends3.default)({}, _this.props, { formData: serializer(_this._form) }));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Form, [{
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


      var classes = (0, _classnames2.default)('ui', size, (0, _lib.useKeyOnly)(error, 'error'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(loading, 'loading'), (0, _lib.useKeyOnly)(reply, 'reply'), (0, _lib.useKeyOnly)(success, 'success'), (0, _lib.useKeyOnly)(warning, 'warning'), (0, _lib.useWidthProp)(widths, null, true), 'form', className);
      var rest = (0, _lib.getUnhandledProps)(Form, this.props);
      var ElementType = (0, _lib.getElementType)(Form, this.props);

      return _react2.default.createElement(
        ElementType,
        (0, _extends3.default)({}, rest, { className: classes, ref: this.handleRef, onSubmit: this.handleSubmit }),
        children
      );
    }
  }]);
  return Form;
}(_react.Component);

Form.defaultProps = {
  as: 'form',
  serializer: formSerializer
};
Form._meta = _meta;
Form.Field = _FormField2.default;
Form.Button = _FormButton2.default;
Form.Checkbox = _FormCheckbox2.default;
Form.Dropdown = _FormDropdown2.default;
Form.Group = _FormGroup2.default;
Form.Input = _FormInput2.default;
Form.Radio = _FormRadio2.default;
Form.Select = _FormSelect2.default;
Form.TextArea = _FormTextArea2.default;
exports.default = Form;
process.env.NODE_ENV !== "production" ? Form.propTypes = {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _react.PropTypes.node,

  /** Additional classes. */
  className: _react.PropTypes.string,

  /** Automatically show any error Message children */
  error: _react.PropTypes.bool,

  /** A form can have its color inverted for contrast */
  inverted: _react.PropTypes.bool,

  /** Automatically show a loading indicator */
  loading: _react.PropTypes.bool,

  /**
   * Called on submit
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and the form's serialized values.
   */
  onSubmit: _react.PropTypes.func,

  /** A comment can contain a form to reply to a comment. This may have arbitrary content. */
  reply: _react.PropTypes.bool,

  /** Called onSubmit with the form node that returns the serialized form object */
  serializer: _react.PropTypes.func,

  /** A form can vary in size */
  size: _react.PropTypes.oneOf(_meta.props.size),

  /** Automatically show any success Message children */
  success: _react.PropTypes.bool,

  /** Automatically show any warning Message children */
  warning: _react.PropTypes.bool,

  /** Forms can automatically divide fields to be equal width */
  widths: _react.PropTypes.oneOf(_meta.props.widths)
} : void 0;
Form.handledProps = ['as', 'children', 'className', 'error', 'inverted', 'loading', 'onSubmit', 'reply', 'serializer', 'size', 'success', 'warning', 'widths'];