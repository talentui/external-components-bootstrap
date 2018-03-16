var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import { TubState, Viewer } from "@beisen/grid-page-builder";
import { getCurPageTemplate, mergeComponents, getComponentClass } from "../../utils/index";

var Preview = function (_Component) {
    _inherits(Preview, _Component);

    function Preview(props, contents) {
        _classCallCheck(this, Preview);

        var _this = _possibleConstructorReturn(this, (Preview.__proto__ || Object.getPrototypeOf(Preview)).call(this, props));

        _this.handleChange = function (tubState) {
            _this.setState({ tubState: tubState });
        };

        var data = JSON.parse(window.localStorage._tubState);

        var _mergeComponents = mergeComponents(),
            eLementCollections = _mergeComponents.eLementCollections;

        _this.eLementCollections = eLementCollections;
        _this.curTemplate = getCurPageTemplate({
            page: data
        });
        _this.state = {
            tubState: TubState.create(data)
        };
        return _this;
    }

    _createClass(Preview, [{
        key: "render",
        value: function render() {
            return React.createElement(Viewer, {
                tubState: this.state.tubState,
                template: this.curTemplate,
                onChange: this.handleChange,
                getComponentClass: getComponentClass
            });
        }
    }]);

    return Preview;
}(Component);

export { Preview as default };