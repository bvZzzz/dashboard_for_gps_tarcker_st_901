"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_Blocks_Map_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Blocks/Map.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Blocks/Map.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_yandex_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-yandex-maps */ "./node_modules/vue-yandex-maps/dist/vue-yandex-maps.esm.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Map",
  components: {
    yandexMap: vue_yandex_maps__WEBPACK_IMPORTED_MODULE_0__.yandexMap,
    ymapMarker: vue_yandex_maps__WEBPACK_IMPORTED_MODULE_0__.ymapMarker
  },
  emits: ['update:coordinates'],
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
  data: function data() {
    return {
      coords: [this.latitude, this.longitude],
      zoom: this.mapZoom
    };
  },
  setup: function setup() {
    var controls = ['geolocationControl'];
    var detailedControls = {
      zoomControl: {
        position: {
          right: 10,
          top: 50
        }
      }
    };
    return {
      controls: controls,
      detailedControls: detailedControls
    };
  },
  methods: {
    updateCoords: function updateCoords(e) {
      if (e.constructor.name === "r") {
        this.coords = e.get('coords');
        this.$emit('update:coordinates', e.get('coords'));
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Blocks/Map.vue?vue&type=template&id=dd2f4bc8":
/*!***************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Blocks/Map.vue?vue&type=template&id=dd2f4bc8 ***!
  \***************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_ymap_marker = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ymap-marker");
  var _component_yandex_map = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("yandex-map");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_yandex_map, {
    coords: $data.coords,
    zoom: $props.mapZoom,
    controls: $setup.controls,
    "detailed-controls": $setup.detailedControls,
    onClick: $options.updateCoords
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ymap_marker, {
        coords: $data.coords,
        "marker-id": 1,
        "hint-content": _ctx.$t('points.point_balloon_hint')
      }, null, 8 /* PROPS */, ["coords", "hint-content"])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["coords", "zoom", "controls", "detailed-controls", "onClick"]);
}

/***/ }),

/***/ "./resources/js/Pages/Blocks/Map.vue":
/*!*******************************************!*\
  !*** ./resources/js/Pages/Blocks/Map.vue ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Map_vue_vue_type_template_id_dd2f4bc8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Map.vue?vue&type=template&id=dd2f4bc8 */ "./resources/js/Pages/Blocks/Map.vue?vue&type=template&id=dd2f4bc8");
/* harmony import */ var _Map_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Map.vue?vue&type=script&lang=js */ "./resources/js/Pages/Blocks/Map.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Map_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Map_vue_vue_type_template_id_dd2f4bc8__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/Pages/Blocks/Map.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Pages/Blocks/Map.vue?vue&type=script&lang=js":
/*!*******************************************************************!*\
  !*** ./resources/js/Pages/Blocks/Map.vue?vue&type=script&lang=js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Map_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Map_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Map.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Blocks/Map.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/Blocks/Map.vue?vue&type=template&id=dd2f4bc8":
/*!*************************************************************************!*\
  !*** ./resources/js/Pages/Blocks/Map.vue?vue&type=template&id=dd2f4bc8 ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Map_vue_vue_type_template_id_dd2f4bc8__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Map_vue_vue_type_template_id_dd2f4bc8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Map.vue?vue&type=template&id=dd2f4bc8 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/Blocks/Map.vue?vue&type=template&id=dd2f4bc8");


/***/ })

}]);