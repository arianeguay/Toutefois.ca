/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/projects-category-row/block.json":
/*!**********************************************!*\
  !*** ./src/projects-category-row/block.json ***!
  \**********************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"toutefois/projects-category-row","version":"0.1.0","title":"Projects Category Row","category":"widgets","icon":"grid-view","description":"Displays a row of projects by category.","editorScript":"file:./index.js","render":"file:./render.php","attributes":{"category":{"type":"string","default":""},"title":{"type":"string","default":""}}}');

/***/ }),

/***/ "./src/projects-category-row/edit.js":
/*!*******************************************!*\
  !*** ./src/projects-category-row/edit.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);







// --- CONFIG ---
const CPT_SLUG = "projet"; // your CPT slug
const TAXONOMY = "category"; // or 'project_category'
const TAX_REST_BASE = TAXONOMY === "category" ? "categories" : "project_category";
const PREVIEW_LIMIT = 6; // keep small to reduce load

// helper for hierarchical labels
const labelWithDepth = (name, depth) => `${"— ".repeat(depth)}${name}`;
function Edit({
  attributes,
  setAttributes
}) {
  const {
    category: attrCategory,
    title: attrTitle
  } = attributes; // store ID as string
  const [includeChildren, setIncludeChildren] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(true);
  const categoryId = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    const n = Number(attrCategory);
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [attrCategory]);

  // -------- Load taxonomy terms (light payload) --------
  const {
    terms,
    termsIsResolving,
    termsError
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    var _core$getLastEntityRe;
    const core = select("core");
    const query = {
      per_page: -1,
      _fields: "id,name,parent,slug",
      context: "view"
    };
    const isResolving = select("core/data").isResolving("core", "getEntityRecords", ["taxonomy", TAXONOMY, query]);
    return {
      terms: core.getEntityRecords("taxonomy", TAXONOMY, query),
      termsIsResolving: isResolving,
      termsError: (_core$getLastEntityRe = core.getLastEntityRecordsError?.("taxonomy", TAXONOMY, query)) !== null && _core$getLastEntityRe !== void 0 ? _core$getLastEntityRe : null
    };
  }, [] // stable
  );

  // Build options + descendants map once terms are in
  const {
    options,
    descendantsById
  } = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    if (!Array.isArray(terms)) {
      return {
        options: [{
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("All", "toutefois"),
          value: ""
        }],
        descendantsById: new Map()
      };
    }
    const byParent = new Map();
    terms.forEach(t => {
      const list = byParent.get(t.parent || 0) || [];
      list.push(t);
      byParent.set(t.parent || 0, list);
    });
    const out = [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("All", "toutefois"),
      value: ""
    }];
    const descendants = new Map();
    const walk = (parentId = 0, depth = 0) => {
      const kids = (byParent.get(parentId) || []).sort((a, b) => a.name.localeCompare(b.name, undefined, {
        sensitivity: "base"
      }));
      kids.forEach(t => {
        out.push({
          label: labelWithDepth(t.name, depth),
          value: String(t.id)
        });
        // precompute descendants (t + all its children)
        const stack = [t.id];
        const acc = new Set([t.id]);
        while (stack.length) {
          const cur = stack.pop();
          const curKids = byParent.get(cur) || [];
          curKids.forEach(k => {
            if (!acc.has(k.id)) {
              acc.add(k.id);
              stack.push(k.id);
            }
          });
        }
        descendants.set(t.id, Array.from(acc));
        walk(t.id, depth + 1);
      });
    };
    walk(0, 0);
    return {
      options: out,
      descendantsById: descendants
    };
  }, [terms]);

  // -------- Build post query (very light) --------
  const categoriesFilter = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    if (!categoryId) return undefined;
    if (!includeChildren) return [categoryId];
    return descendantsById.get(categoryId) || [categoryId];
  }, [categoryId, includeChildren, descendantsById]);
  const postsQuery = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    const q = {
      per_page: PREVIEW_LIMIT,
      // Keep _embed but restrict fields to minimize payload size
      _embed: true,
      _fields: "id,slug,title.rendered,featured_media,_embedded.wp:featuredmedia.media_details.sizes",
      orderby: "date",
      order: "desc",
      status: "publish",
      context: "view"
    };
    if (categoriesFilter) {
      q[TAX_REST_BASE] = categoriesFilter;
    }
    return q;
  }, [categoriesFilter]);

  // -------- Fetch posts with error/loading handling --------
  const {
    posts,
    postsIsResolving,
    postsError
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    var _core$getLastEntityRe2;
    const core = select("core");
    const isResolving = select("core/data").isResolving("core", "getEntityRecords", ["postType", CPT_SLUG, postsQuery]);
    return {
      posts: core.getEntityRecords("postType", CPT_SLUG, postsQuery),
      postsIsResolving: isResolving,
      postsError: (_core$getLastEntityRe2 = core.getLastEntityRecordsError?.("postType", CPT_SLUG, postsQuery)) !== null && _core$getLastEntityRe2 !== void 0 ? _core$getLastEntityRe2 : null
    };
  }, [postsQuery]);
  const getThumb = post => {
    const sizes = post?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes || null;
    return sizes?.medium_large?.source_url || sizes?.medium?.source_url || sizes?.thumbnail?.source_url || null;
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Projects Row Settings", "toutefois"),
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Category", "toutefois"),
    value: attrCategory || "",
    options: options,
    onChange: val => setAttributes({
      category: val
    }),
    help: TAXONOMY === "category" ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Filters by WordPress “Categories”.", "toutefois") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Filters by custom taxonomy.", "toutefois")
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Include child categories in preview", "toutefois"),
    checked: includeChildren,
    onChange: setIncludeChildren
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Title", "toutefois"),
    value: attrTitle || "",
    onChange: val => setAttributes({
      title: val
    })
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "toutefois-projects-row__preview",
    style: {
      display: "grid",
      gap: 12,
      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))"
    }
  }, (termsIsResolving || postsIsResolving) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null), termsError && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
    status: "error",
    isDismissible: false
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Failed to load categories.", "toutefois")), postsError && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
    status: "error",
    isDismissible: false
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Failed to load projects.", "toutefois")), !termsIsResolving && !postsIsResolving && Array.isArray(posts) && posts.length === 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
    status: "info",
    isDismissible: false
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("No projects found for this selection.", "toutefois")), !postsIsResolving && Array.isArray(posts) && posts.map(p => {
    const thumb = getThumb(p);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: p.id,
      style: {
        border: "1px solid #ddd",
        borderRadius: 8,
        overflow: "hidden",
        background: "#fff"
      }
    }, thumb ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: thumb,
      alt: "",
      style: {
        width: "100%",
        display: "block",
        aspectRatio: "16 / 9",
        objectFit: "cover"
      },
      loading: "lazy",
      decoding: "async"
    }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        background: "#f2f2f2",
        width: "100%",
        aspectRatio: "16 / 9"
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      style: {
        padding: 10
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", {
      style: {
        display: "block",
        marginBottom: 6
      }
    }, p.title?.rendered || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("(No title)", "toutefois"))));
  })));
}

/***/ }),

/***/ "./src/projects-category-row/save.js":
/*!*******************************************!*\
  !*** ./src/projects-category-row/save.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
function save() {
  return null; // Content is rendered dynamically via PHP.
}

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************************************!*\
  !*** ./src/projects-category-row/index.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/projects-category-row/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./save */ "./src/projects-category-row/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/projects-category-row/block.json");




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_2__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map