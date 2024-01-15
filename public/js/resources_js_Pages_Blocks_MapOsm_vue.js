"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Blocks_MapOsm_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Blocks/MapOsm.vue?vue&type=script&setup=true&lang=js":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Blocks/MapOsm.vue?vue&type=script&setup=true&lang=js ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vue_leaflet_vue_leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vue-leaflet/vue-leaflet */ "./node_modules/@vue-leaflet/vue-leaflet/dist/vue-leaflet.es.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __name: 'MapOsm',
  props: {
    latitude: {
      type: [String, Number]
    },
    longitude: {
      type: [String, Number]
    },
    mapZoom: {
      type: [String, Number],
      "default": 10
    }
  },
  emits: ['update:coordinates'],
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose,
      emit = _ref.emit;
    __expose();
    var props = __props;
    var map = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)({});
    var coords = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([]);
    var updateCoords = function updateCoords(event) {
      if (event.latlng && map.value.leafletObject) {
        map.value.leafletObject.panTo([event.latlng.lat, event.latlng.lng]);
        emit('update:coordinates', [event.latlng.lat, event.latlng.lng]);
        coords.value = [event.latlng.lat, event.latlng.lng];
      }
    };
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.onMounted)(function () {
      coords = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)([props.latitude, props.longitude]);
    });
    var __returned__ = {
      get map() {
        return map;
      },
      set map(v) {
        map = v;
      },
      get coords() {
        return coords;
      },
      set coords(v) {
        coords = v;
      },
      props: props,
      emit: emit,
      updateCoords: updateCoords,
      get LMap() {
        return _vue_leaflet_vue_leaflet__WEBPACK_IMPORTED_MODULE_1__.LMap;
      },
      get LTileLayer() {
        return _vue_leaflet_vue_leaflet__WEBPACK_IMPORTED_MODULE_1__.LTileLayer;
      },
      get LMarker() {
        return _vue_leaflet_vue_leaflet__WEBPACK_IMPORTED_MODULE_1__.LMarker;
      },
      get LTooltip() {
        return _vue_leaflet_vue_leaflet__WEBPACK_IMPORTED_MODULE_1__.LTooltip;
      },
      onMounted: vue__WEBPACK_IMPORTED_MODULE_0__.onMounted,
      ref: vue__WEBPACK_IMPORTED_MODULE_0__.ref
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Blocks/MapOsm.vue?vue&type=template&id=0a9546fd":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Blocks/MapOsm.vue?vue&type=template&id=0a9546fd ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)($setup["LMap"], {
    ref: "map",
    zoom: $props.mapZoom,
    center: [$props.latitude, $props.longitude],
    onClick: $setup.updateCoords
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["LTileLayer"], {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "layer-type": "base",
        name: "OpenStreetMap"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["LMarker"], {
        "lat-lng": $setup.coords
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)($setup["LTooltip"], null, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.$t('points.point_balloon_hint')), 1 /* TEXT */)];
            }),

            _: 1 /* STABLE */
          })];
        }),

        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["lat-lng"])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["zoom", "center"]);
}

/***/ }),

/***/ "./resources/js/Pages/Blocks/MapOsm.vue":
/*!**********************************************!*\
  !*** ./resources/js/Pages/Blocks/MapOsm.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MapOsm_vue_vue_type_template_id_0a9546fd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MapOsm.vue?vue&type=template&id=0a9546fd */ "./resources/js/Pages/Blocks/MapOsm.vue?vue&type=template&id=0a9546fd");
/* harmony import */ var _MapOsm_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MapOsm.vue?vue&type=script&setup=true&lang=js */ "./resources/js/Pages/Blocks/MapOsm.vue?vue&type=script&setup=true&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_MapOsm_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_MapOsm_vue_vue_type_template_id_0a9546fd__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Pages/Blocks/MapOsm.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Pages/Blocks/MapOsm.vue?vue&type=script&setup=true&lang=js":
/*!*********************************************************************************!*\
  !*** ./resources/js/Pages/Blocks/MapOsm.vue?vue&type=script&setup=true&lang=js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MapOsm_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MapOsm_vue_vue_type_script_setup_true_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MapOsm.vue?vue&type=script&setup=true&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Blocks/MapOsm.vue?vue&type=script&setup=true&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Blocks/MapOsm.vue?vue&type=template&id=0a9546fd":
/*!****************************************************************************!*\
  !*** ./resources/js/Pages/Blocks/MapOsm.vue?vue&type=template&id=0a9546fd ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MapOsm_vue_vue_type_template_id_0a9546fd__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MapOsm_vue_vue_type_template_id_0a9546fd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MapOsm.vue?vue&type=template&id=0a9546fd */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Blocks/MapOsm.vue?vue&type=template&id=0a9546fd");


/***/ })

}]);