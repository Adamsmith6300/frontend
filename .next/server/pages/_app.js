module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../next-server/lib/utils":
/*!*****************************************************!*\
  !*** external "next/dist/next-server/lib/utils.js" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next/dist/next-server/lib/utils.js\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3V0aWxzLmpzXCI/MzI2ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiIuLi9uZXh0LXNlcnZlci9saWIvdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3QvbmV4dC1zZXJ2ZXIvbGliL3V0aWxzLmpzXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///../next-server/lib/utils\n");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    \"default\": obj\n  };\n}\n\nmodule.exports = _interopRequireDefault;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanM/NGVhNCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdDsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/@babel/runtime/helpers/interopRequireDefault.js\n");

/***/ }),

/***/ "./node_modules/next/app.js":
/*!**********************************!*\
  !*** ./node_modules/next/app.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./dist/pages/_app */ \"./node_modules/next/dist/pages/_app.js\")\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9hcHAuanM/ZjAxNiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpQkFBaUIsbUJBQU8sQ0FBQyxpRUFBbUIiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9hcHAuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9wYWdlcy9fYXBwJylcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/next/app.js\n");

/***/ }),

/***/ "./node_modules/next/dist/pages/_app.js":
/*!**********************************************!*\
  !*** ./node_modules/next/dist/pages/_app.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports.Container = Container;\nexports.createUrl = createUrl;\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"react\"));\n\nvar _utils = __webpack_require__(/*! ../next-server/lib/utils */ \"../next-server/lib/utils\");\n\nexports.AppInitialProps = _utils.AppInitialProps;\nexports.NextWebVitalsMetric = _utils.NextWebVitalsMetric;\n/**\n* `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.\n* This allows for keeping state between navigation, custom error handling, injecting additional data.\n*/\n\nasync function appGetInitialProps({\n  Component,\n  ctx\n}) {\n  const pageProps = await (0, _utils.loadGetInitialProps)(Component, ctx);\n  return {\n    pageProps\n  };\n}\n\nclass App extends _react.default.Component {\n  // Kept here for backwards compatibility.\n  // When someone ended App they could call `super.componentDidCatch`.\n  // @deprecated This method is no longer needed. Errors are caught at the top level\n  componentDidCatch(error, _errorInfo) {\n    throw error;\n  }\n\n  render() {\n    const {\n      router,\n      Component,\n      pageProps,\n      __N_SSG,\n      __N_SSP\n    } = this.props;\n    return /*#__PURE__*/_react.default.createElement(Component, Object.assign({}, pageProps, // we don't add the legacy URL prop if it's using non-legacy\n    // methods like getStaticProps and getServerSideProps\n    !(__N_SSG || __N_SSP) ? {\n      url: createUrl(router)\n    } : {}));\n  }\n\n}\n\nexports.default = App;\nApp.origGetInitialProps = appGetInitialProps;\nApp.getInitialProps = appGetInitialProps;\nlet warnContainer;\nlet warnUrl;\n\nif (true) {\n  warnContainer = (0, _utils.execOnce)(() => {\n    console.warn(`Warning: the \\`Container\\` in \\`_app\\` has been deprecated and should be removed. https://err.sh/vercel/next.js/app-container-deprecated`);\n  });\n  warnUrl = (0, _utils.execOnce)(() => {\n    console.error(`Warning: the 'url' property is deprecated. https://err.sh/vercel/next.js/url-deprecated`);\n  });\n} // @deprecated noop for now until removal\n\n\nfunction Container(p) {\n  if (true) warnContainer();\n  return p.children;\n}\n\nfunction createUrl(router) {\n  // This is to make sure we don't references the router object at call time\n  const {\n    pathname,\n    asPath,\n    query\n  } = router;\n  return {\n    get query() {\n      if (true) warnUrl();\n      return query;\n    },\n\n    get pathname() {\n      if (true) warnUrl();\n      return pathname;\n    },\n\n    get asPath() {\n      if (true) warnUrl();\n      return asPath;\n    },\n\n    back: () => {\n      if (true) warnUrl();\n      router.back();\n    },\n    push: (url, as) => {\n      if (true) warnUrl();\n      return router.push(url, as);\n    },\n    pushTo: (href, as) => {\n      if (true) warnUrl();\n      const pushRoute = as ? href : '';\n      const pushUrl = as || href;\n      return router.push(pushRoute, pushUrl);\n    },\n    replace: (url, as) => {\n      if (true) warnUrl();\n      return router.replace(url, as);\n    },\n    replaceTo: (href, as) => {\n      if (true) warnUrl();\n      const replaceRoute = as ? href : '';\n      const replaceUrl = as || href;\n      return router.replace(replaceRoute, replaceUrl);\n    }\n  };\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vLi4vcGFnZXMvX2FwcC50c3g/MmMzNSJdLCJuYW1lcyI6WyJwYWdlUHJvcHMiLCJSZWFjdCIsIkNvbXBvbmVudCIsImNvbXBvbmVudERpZENhdGNoIiwicmVuZGVyIiwiX19OX1NTRyIsInVybCIsImNyZWF0ZVVybCIsIkFwcCIsIm9yaWdHZXRJbml0aWFsUHJvcHMiLCJhcHBHZXRJbml0aWFsUHJvcHMiLCJnZXRJbml0aWFsUHJvcHMiLCJ3YXJuQ29udGFpbmVyIiwiY29uc29sZSIsIndhcm5VcmwiLCJwIiwiYmFjayIsInJvdXRlciIsInB1c2giLCJwdXNoVG8iLCJwdXNoUm91dGUiLCJhcyIsInB1c2hVcmwiLCJyZXBsYWNlIiwicmVwbGFjZVRvIiwicmVwbGFjZVJvdXRlIiwicmVwbGFjZVVybCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFrQkE7Ozs7O0FBSUEsa0NBQWtDO0FBQUE7QUFBbEM7QUFBa0MsQ0FBbEMsRUFHeUM7QUFDdkMsUUFBTUEsU0FBUyxHQUFHLE1BQU0sMkNBQXhCLEdBQXdCLENBQXhCO0FBQ0EsU0FBTztBQUFQO0FBQU8sR0FBUDtBQUdhOztBQUFBLGtCQUEyQ0MsZUFBTUMsU0FBakQsQ0FHYjtBQUlBO0FBQ0E7QUFDQTtBQUNBQyxtQkFBaUIsb0JBQTRDO0FBQzNEO0FBR0ZDOztBQUFBQSxRQUFNLEdBQUc7QUFDUCxVQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBQXFELEtBQTNEO0FBR0Esd0JBQ0UscUVBR0k7QUFDQTtBQUNJLE1BQUVDLE9BQU8sSUFBVCxXQUF3QjtBQUFFQyxTQUFHLEVBQUVDLFNBQVMsQ0FBeEMsTUFBd0M7QUFBaEIsS0FBeEIsR0FOVixFQUNFLEVBREY7QUFmRjs7QUFBQTs7O0FBSG1CQyxHLENBSVpDLG1CQUpZRCxHQUlVRSxrQkFKVkY7QUFBQUEsRyxDQUtaRyxlQUxZSCxHQUtNRSxrQkFMTkY7QUErQnJCO0FBQ0E7O0FBRUEsVUFBMkM7QUFDekNJLGVBQWEsR0FBRyxxQkFBUyxNQUFNO0FBQzdCQyxXQUFPLENBQVBBO0FBREZELEdBQWdCLENBQWhCQTtBQU1BRSxTQUFPLEdBQUcscUJBQVMsTUFBTTtBQUN2QkQsV0FBTyxDQUFQQTtBQURGQyxHQUFVLENBQVZBO0FBT0YsQyxDQUFBOzs7QUFDTyxzQkFBMkI7QUFDaEMsWUFBMkNGLGFBQWE7QUFDeEQsU0FBT0csQ0FBQyxDQUFSO0FBR0s7O0FBQUEsMkJBQW1DO0FBQ3hDO0FBQ0EsUUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQU47QUFDQSxTQUFPO0FBQ0wsZ0JBQVk7QUFDVixnQkFBMkNELE9BQU87QUFDbEQ7QUFIRzs7QUFLTCxtQkFBZTtBQUNiLGdCQUEyQ0EsT0FBTztBQUNsRDtBQVBHOztBQVNMLGlCQUFhO0FBQ1gsZ0JBQTJDQSxPQUFPO0FBQ2xEO0FBWEc7O0FBYUxFLFFBQUksRUFBRSxNQUFNO0FBQ1YsZ0JBQTJDRixPQUFPO0FBQ2xERyxZQUFNLENBQU5BO0FBZkc7QUFpQkxDLFFBQUksRUFBRSxhQUE4QjtBQUNsQyxnQkFBMkNKLE9BQU87QUFDbEQsYUFBT0csTUFBTSxDQUFOQSxVQUFQLEVBQU9BLENBQVA7QUFuQkc7QUFxQkxFLFVBQU0sRUFBRSxjQUErQjtBQUNyQyxnQkFBMkNMLE9BQU87QUFDbEQsWUFBTU0sU0FBUyxHQUFHQyxFQUFFLFVBQXBCO0FBQ0EsWUFBTUMsT0FBTyxHQUFHRCxFQUFFLElBQWxCO0FBRUEsYUFBT0osTUFBTSxDQUFOQSxnQkFBUCxPQUFPQSxDQUFQO0FBMUJHO0FBNEJMTSxXQUFPLEVBQUUsYUFBOEI7QUFDckMsZ0JBQTJDVCxPQUFPO0FBQ2xELGFBQU9HLE1BQU0sQ0FBTkEsYUFBUCxFQUFPQSxDQUFQO0FBOUJHO0FBZ0NMTyxhQUFTLEVBQUUsY0FBK0I7QUFDeEMsZ0JBQTJDVixPQUFPO0FBQ2xELFlBQU1XLFlBQVksR0FBR0osRUFBRSxVQUF2QjtBQUNBLFlBQU1LLFVBQVUsR0FBR0wsRUFBRSxJQUFyQjtBQUVBLGFBQU9KLE1BQU0sQ0FBTkEsc0JBQVAsVUFBT0EsQ0FBUDtBQXJDSjtBQUFPLEdBQVA7QUF3Q0QiLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L3BhZ2VzL19hcHAuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgRXJyb3JJbmZvIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1xuICBleGVjT25jZSxcbiAgbG9hZEdldEluaXRpYWxQcm9wcyxcbiAgQXBwQ29udGV4dFR5cGUsXG4gIEFwcEluaXRpYWxQcm9wcyxcbiAgQXBwUHJvcHNUeXBlLFxuICBOZXh0V2ViVml0YWxzTWV0cmljLFxufSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvdXRpbHMnXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICcuLi9jbGllbnQvcm91dGVyJ1xuXG5leHBvcnQgeyBBcHBJbml0aWFsUHJvcHMgfVxuXG5leHBvcnQgeyBOZXh0V2ViVml0YWxzTWV0cmljIH1cblxuZXhwb3J0IHR5cGUgQXBwQ29udGV4dCA9IEFwcENvbnRleHRUeXBlPFJvdXRlcj5cblxuZXhwb3J0IHR5cGUgQXBwUHJvcHM8UCA9IHt9PiA9IEFwcFByb3BzVHlwZTxSb3V0ZXIsIFA+XG5cbi8qKlxuICogYEFwcGAgY29tcG9uZW50IGlzIHVzZWQgZm9yIGluaXRpYWxpemUgb2YgcGFnZXMuIEl0IGFsbG93cyBmb3Igb3ZlcndyaXRpbmcgYW5kIGZ1bGwgY29udHJvbCBvZiB0aGUgYHBhZ2VgIGluaXRpYWxpemF0aW9uLlxuICogVGhpcyBhbGxvd3MgZm9yIGtlZXBpbmcgc3RhdGUgYmV0d2VlbiBuYXZpZ2F0aW9uLCBjdXN0b20gZXJyb3IgaGFuZGxpbmcsIGluamVjdGluZyBhZGRpdGlvbmFsIGRhdGEuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGFwcEdldEluaXRpYWxQcm9wcyh7XG4gIENvbXBvbmVudCxcbiAgY3R4LFxufTogQXBwQ29udGV4dCk6IFByb21pc2U8QXBwSW5pdGlhbFByb3BzPiB7XG4gIGNvbnN0IHBhZ2VQcm9wcyA9IGF3YWl0IGxvYWRHZXRJbml0aWFsUHJvcHMoQ29tcG9uZW50LCBjdHgpXG4gIHJldHVybiB7IHBhZ2VQcm9wcyB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcDxQID0ge30sIENQID0ge30sIFMgPSB7fT4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8XG4gIFAgJiBBcHBQcm9wczxDUD4sXG4gIFNcbj4ge1xuICBzdGF0aWMgb3JpZ0dldEluaXRpYWxQcm9wcyA9IGFwcEdldEluaXRpYWxQcm9wc1xuICBzdGF0aWMgZ2V0SW5pdGlhbFByb3BzID0gYXBwR2V0SW5pdGlhbFByb3BzXG5cbiAgLy8gS2VwdCBoZXJlIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAgLy8gV2hlbiBzb21lb25lIGVuZGVkIEFwcCB0aGV5IGNvdWxkIGNhbGwgYHN1cGVyLmNvbXBvbmVudERpZENhdGNoYC5cbiAgLy8gQGRlcHJlY2F0ZWQgVGhpcyBtZXRob2QgaXMgbm8gbG9uZ2VyIG5lZWRlZC4gRXJyb3JzIGFyZSBjYXVnaHQgYXQgdGhlIHRvcCBsZXZlbFxuICBjb21wb25lbnREaWRDYXRjaChlcnJvcjogRXJyb3IsIF9lcnJvckluZm86IEVycm9ySW5mbyk6IHZvaWQge1xuICAgIHRocm93IGVycm9yXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyByb3V0ZXIsIENvbXBvbmVudCwgcGFnZVByb3BzLCBfX05fU1NHLCBfX05fU1NQIH0gPSB0aGlzXG4gICAgICAucHJvcHMgYXMgQXBwUHJvcHM8Q1A+XG5cbiAgICByZXR1cm4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICB7Li4ucGFnZVByb3BzfVxuICAgICAgICB7XG4gICAgICAgICAgLy8gd2UgZG9uJ3QgYWRkIHRoZSBsZWdhY3kgVVJMIHByb3AgaWYgaXQncyB1c2luZyBub24tbGVnYWN5XG4gICAgICAgICAgLy8gbWV0aG9kcyBsaWtlIGdldFN0YXRpY1Byb3BzIGFuZCBnZXRTZXJ2ZXJTaWRlUHJvcHNcbiAgICAgICAgICAuLi4oIShfX05fU1NHIHx8IF9fTl9TU1ApID8geyB1cmw6IGNyZWF0ZVVybChyb3V0ZXIpIH0gOiB7fSlcbiAgICAgICAgfVxuICAgICAgLz5cbiAgICApXG4gIH1cbn1cblxubGV0IHdhcm5Db250YWluZXI6ICgpID0+IHZvaWRcbmxldCB3YXJuVXJsOiAoKSA9PiB2b2lkXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHdhcm5Db250YWluZXIgPSBleGVjT25jZSgoKSA9PiB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgYFdhcm5pbmc6IHRoZSBcXGBDb250YWluZXJcXGAgaW4gXFxgX2FwcFxcYCBoYXMgYmVlbiBkZXByZWNhdGVkIGFuZCBzaG91bGQgYmUgcmVtb3ZlZC4gaHR0cHM6Ly9lcnIuc2gvdmVyY2VsL25leHQuanMvYXBwLWNvbnRhaW5lci1kZXByZWNhdGVkYFxuICAgIClcbiAgfSlcblxuICB3YXJuVXJsID0gZXhlY09uY2UoKCkgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBgV2FybmluZzogdGhlICd1cmwnIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQuIGh0dHBzOi8vZXJyLnNoL3ZlcmNlbC9uZXh0LmpzL3VybC1kZXByZWNhdGVkYFxuICAgIClcbiAgfSlcbn1cblxuLy8gQGRlcHJlY2F0ZWQgbm9vcCBmb3Igbm93IHVudGlsIHJlbW92YWxcbmV4cG9ydCBmdW5jdGlvbiBDb250YWluZXIocDogYW55KSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuQ29udGFpbmVyKClcbiAgcmV0dXJuIHAuY2hpbGRyZW5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVVybChyb3V0ZXI6IFJvdXRlcikge1xuICAvLyBUaGlzIGlzIHRvIG1ha2Ugc3VyZSB3ZSBkb24ndCByZWZlcmVuY2VzIHRoZSByb3V0ZXIgb2JqZWN0IGF0IGNhbGwgdGltZVxuICBjb25zdCB7IHBhdGhuYW1lLCBhc1BhdGgsIHF1ZXJ5IH0gPSByb3V0ZXJcbiAgcmV0dXJuIHtcbiAgICBnZXQgcXVlcnkoKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FyblVybCgpXG4gICAgICByZXR1cm4gcXVlcnlcbiAgICB9LFxuICAgIGdldCBwYXRobmFtZSgpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIHJldHVybiBwYXRobmFtZVxuICAgIH0sXG4gICAgZ2V0IGFzUGF0aCgpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIHJldHVybiBhc1BhdGhcbiAgICB9LFxuICAgIGJhY2s6ICgpID0+IHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIHJvdXRlci5iYWNrKClcbiAgICB9LFxuICAgIHB1c2g6ICh1cmw6IHN0cmluZywgYXM/OiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIHJldHVybiByb3V0ZXIucHVzaCh1cmwsIGFzKVxuICAgIH0sXG4gICAgcHVzaFRvOiAoaHJlZjogc3RyaW5nLCBhcz86IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHdhcm5VcmwoKVxuICAgICAgY29uc3QgcHVzaFJvdXRlID0gYXMgPyBocmVmIDogJydcbiAgICAgIGNvbnN0IHB1c2hVcmwgPSBhcyB8fCBocmVmXG5cbiAgICAgIHJldHVybiByb3V0ZXIucHVzaChwdXNoUm91dGUsIHB1c2hVcmwpXG4gICAgfSxcbiAgICByZXBsYWNlOiAodXJsOiBzdHJpbmcsIGFzPzogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgd2FyblVybCgpXG4gICAgICByZXR1cm4gcm91dGVyLnJlcGxhY2UodXJsLCBhcylcbiAgICB9LFxuICAgIHJlcGxhY2VUbzogKGhyZWY6IHN0cmluZywgYXM/OiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB3YXJuVXJsKClcbiAgICAgIGNvbnN0IHJlcGxhY2VSb3V0ZSA9IGFzID8gaHJlZiA6ICcnXG4gICAgICBjb25zdCByZXBsYWNlVXJsID0gYXMgfHwgaHJlZlxuXG4gICAgICByZXR1cm4gcm91dGVyLnJlcGxhY2UocmVwbGFjZVJvdXRlLCByZXBsYWNlVXJsKVxuICAgIH0sXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/next/dist/pages/_app.js\n");

/***/ }),

/***/ "./node_modules/semantic-ui-css/semantic.min.css":
/*!*******************************************************!*\
  !*** ./node_modules/semantic-ui-css/semantic.min.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9zZW1hbnRpYy11aS1jc3Mvc2VtYW50aWMubWluLmNzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/semantic-ui-css/semantic.min.css\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/app */ \"./node_modules/next/app.js\");\n/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! semantic-ui-css/semantic.min.css */ \"./node_modules/semantic-ui-css/semantic.min.css\");\n/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store */ \"./store/index.js\");\n/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/index.css */ \"./styles/index.css\");\n/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_index_css__WEBPACK_IMPORTED_MODULE_4__);\nvar _jsxFileName = \"/home/adam/loma/frontend/pages/_app.js\";\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\nclass MyApp extends next_app__WEBPACK_IMPORTED_MODULE_1___default.a {\n  constructor(...args) {\n    super(...args);\n\n    _defineProperty(this, \"getInitialProps\", async ({\n      Component,\n      ctx\n    }) => {\n      // ctx.store.dispatch({ type: \"TOE\", payload: \"was set in _app\" });\n      return {\n        pageProps: _objectSpread(_objectSpread({}, Component.getInitialProps ? await Component.getInitialProps(ctx) : {}), {}, {\n          // Some custom thing for all pages\n          pathname: ctx.pathname\n        })\n      };\n    });\n  }\n\n  render() {\n    const {\n      Component,\n      pageProps\n    } = this.props;\n    return __jsx(Component, _extends({}, pageProps, {\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 24,\n        columnNumber: 12\n      }\n    }));\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_store__WEBPACK_IMPORTED_MODULE_3__[\"wrapper\"].withRedux(MyApp));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9fYXBwLmpzP2Q1MzAiXSwibmFtZXMiOlsiTXlBcHAiLCJBcHAiLCJDb21wb25lbnQiLCJjdHgiLCJwYWdlUHJvcHMiLCJnZXRJbml0aWFsUHJvcHMiLCJwYXRobmFtZSIsInJlbmRlciIsInByb3BzIiwid3JhcHBlciIsIndpdGhSZWR1eCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNQSxLQUFOLFNBQW9CQywrQ0FBcEIsQ0FBd0I7QUFBQTtBQUFBOztBQUFBLDZDQUNKLE9BQU87QUFBRUMsZUFBRjtBQUFhQztBQUFiLEtBQVAsS0FBOEI7QUFDOUM7QUFDQSxhQUFPO0FBQ0xDLGlCQUFTLGtDQUVIRixTQUFTLENBQUNHLGVBQVYsR0FDQSxNQUFNSCxTQUFTLENBQUNHLGVBQVYsQ0FBMEJGLEdBQTFCLENBRE4sR0FFQSxFQUpHO0FBS1A7QUFDQUcsa0JBQVEsRUFBRUgsR0FBRyxDQUFDRztBQU5QO0FBREosT0FBUDtBQVVELEtBYnFCO0FBQUE7O0FBZXRCQyxRQUFNLEdBQUc7QUFDUCxVQUFNO0FBQUVMLGVBQUY7QUFBYUU7QUFBYixRQUEyQixLQUFLSSxLQUF0QztBQUNBLFdBQU8sTUFBQyxTQUFELGVBQWVKLFNBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFQO0FBQ0Q7O0FBbEJxQjs7QUFxQlRLLDZHQUFPLENBQUNDLFNBQVIsQ0FBa0JWLEtBQWxCLENBQWYiLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEFwcCBmcm9tIFwibmV4dC9hcHBcIjtcbmltcG9ydCBcInNlbWFudGljLXVpLWNzcy9zZW1hbnRpYy5taW4uY3NzXCI7XG5pbXBvcnQgeyB3cmFwcGVyIH0gZnJvbSBcIi4uL3N0b3JlXCI7XG5pbXBvcnQgXCIuLi9zdHlsZXMvaW5kZXguY3NzXCI7XG5cbmNsYXNzIE15QXBwIGV4dGVuZHMgQXBwIHtcbiAgZ2V0SW5pdGlhbFByb3BzID0gYXN5bmMgKHsgQ29tcG9uZW50LCBjdHggfSkgPT4ge1xuICAgIC8vIGN0eC5zdG9yZS5kaXNwYXRjaCh7IHR5cGU6IFwiVE9FXCIsIHBheWxvYWQ6IFwid2FzIHNldCBpbiBfYXBwXCIgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhZ2VQcm9wczoge1xuICAgICAgICAvLyBDYWxsIHBhZ2UtbGV2ZWwgZ2V0SW5pdGlhbFByb3BzXG4gICAgICAgIC4uLihDb21wb25lbnQuZ2V0SW5pdGlhbFByb3BzXG4gICAgICAgICAgPyBhd2FpdCBDb21wb25lbnQuZ2V0SW5pdGlhbFByb3BzKGN0eClcbiAgICAgICAgICA6IHt9KSxcbiAgICAgICAgLy8gU29tZSBjdXN0b20gdGhpbmcgZm9yIGFsbCBwYWdlc1xuICAgICAgICBwYXRobmFtZTogY3R4LnBhdGhuYW1lLFxuICAgICAgfSxcbiAgICB9O1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IENvbXBvbmVudCwgcGFnZVByb3BzIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdyYXBwZXIud2l0aFJlZHV4KE15QXBwKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./store/actions.js":
/*!**************************!*\
  !*** ./store/actions.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ \"./store/helpers.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nconst actionTypes = {\n  TEST: \"TEST\",\n  SIGNUP_SUCCESS: \"SIGNUP_SUCCESS\",\n  VERIFY_SUCCESS: \"VERIFY_SUCCESS\",\n  VERIFY_FAILED: \"VERIFY_FAILED\",\n  LOGIN_SUCCESS: \"LOGIN_SUCCESS\",\n  ERROR_SUBMIT_FORM_DATA: \"ERROR_SUBMIT_FORM_DATA\",\n  RESEND_SUCCESS: \"RESEND_SUCCESS\"\n};\nconst actions = {\n  setTest: val => {\n    return {\n      type: actionTypes.TEST,\n      payload: val\n    };\n  },\n  submitSignup: formData => {\n    delete formData[\"RePassword\"];\n    return async dispatch => {\n      let resp = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${\"https://api.shoploma.ca\"}/people/signup`, formData).then(function (response) {\n        console.log(response);\n        dispatch({\n          type: actionTypes.SIGNUP_SUCCESS\n        });\n      }).catch(function (error) {\n        console.log(error.response);\n\n        if (error.response.data.includes(\"UsernameExistsException\")) {\n          dispatch({\n            type: actionTypes.ERROR_SUBMIT_FORM_DATA,\n            payload: \"Username exists!\"\n          });\n        }\n      });\n    };\n  },\n  verifyUser: data => {\n    console.log(data);\n    return async dispatch => {\n      const resp = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${\"https://api.shoploma.ca\"}/people/signup/verify`, data).then(function (response) {\n        console.log(response);\n        dispatch({\n          type: actionTypes.VERIFY_SUCCESS\n        });\n      }).catch(function (error) {\n        console.log(error.response);\n\n        if (error.response.data == \"Account already verified!\" || error.response.data == \"Account already exists for this alias!\") {\n          dispatch({\n            type: actionTypes.VERIFY_FAILED,\n            payload: error.response.data\n          });\n        } else {\n          dispatch({\n            type: actionTypes.VERIFY_FAILED,\n            payload: \"Failed to verify!\"\n          });\n        }\n      });\n    };\n  },\n  submitLogin: formData => {\n    return async dispatch => {\n      const resp = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${\"https://api.shoploma.ca\"}/people/login`, formData).then(function (response) {\n        console.log(response);\n        Object(_helpers__WEBPACK_IMPORTED_MODULE_1__[\"saveLoginSession\"])(response);\n        dispatch({\n          type: actionTypes.LOGIN_SUCCESS\n        });\n      }).catch(function (error) {\n        console.log(error.response);\n\n        if (error) {\n          dispatch({\n            type: actionTypes.ERROR_SUBMIT_FORM_DATA,\n            payload: \"Email or password are invalid!\"\n          });\n        }\n      });\n    };\n  },\n  submitResend: formData => {\n    return async dispatch => {\n      const resp = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${\"https://api.shoploma.ca\"}/people/signup/resend`, formData).then(function (response) {\n        console.log(response);\n        dispatch({\n          type: actionTypes.RESEND_SUCCESS\n        });\n      }).catch(function (error) {\n        console.log(error.response);\n\n        if (error) {\n          dispatch({\n            type: actionTypes.ERROR_SUBMIT_FORM_DATA,\n            payload: \"Invalid email!\"\n          });\n        }\n      });\n    };\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (_objectSpread(_objectSpread({}, actionTypes), actions));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdG9yZS9hY3Rpb25zLmpzP2FiMzQiXSwibmFtZXMiOlsiYWN0aW9uVHlwZXMiLCJURVNUIiwiU0lHTlVQX1NVQ0NFU1MiLCJWRVJJRllfU1VDQ0VTUyIsIlZFUklGWV9GQUlMRUQiLCJMT0dJTl9TVUNDRVNTIiwiRVJST1JfU1VCTUlUX0ZPUk1fREFUQSIsIlJFU0VORF9TVUNDRVNTIiwiYWN0aW9ucyIsInNldFRlc3QiLCJ2YWwiLCJ0eXBlIiwicGF5bG9hZCIsInN1Ym1pdFNpZ251cCIsImZvcm1EYXRhIiwiZGlzcGF0Y2giLCJyZXNwIiwiYXhpb3MiLCJwb3N0IiwicHJvY2VzcyIsInRoZW4iLCJyZXNwb25zZSIsImNvbnNvbGUiLCJsb2ciLCJjYXRjaCIsImVycm9yIiwiZGF0YSIsImluY2x1ZGVzIiwidmVyaWZ5VXNlciIsInN1Ym1pdExvZ2luIiwic2F2ZUxvZ2luU2Vzc2lvbiIsInN1Ym1pdFJlc2VuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFHQSxNQUFNQSxXQUFXLEdBQUc7QUFDbEJDLE1BQUksRUFBRSxNQURZO0FBRWxCQyxnQkFBYyxFQUFFLGdCQUZFO0FBR2xCQyxnQkFBYyxFQUFFLGdCQUhFO0FBSWxCQyxlQUFhLEVBQUMsZUFKSTtBQUtsQkMsZUFBYSxFQUFFLGVBTEc7QUFNbEJDLHdCQUFzQixFQUFFLHdCQU5OO0FBT2xCQyxnQkFBYyxFQUFFO0FBUEUsQ0FBcEI7QUFVQSxNQUFNQyxPQUFPLEdBQUc7QUFDZEMsU0FBTyxFQUFHQyxHQUFELElBQVM7QUFDaEIsV0FBTztBQUNMQyxVQUFJLEVBQUVYLFdBQVcsQ0FBQ0MsSUFEYjtBQUVMVyxhQUFPLEVBQUVGO0FBRkosS0FBUDtBQUlELEdBTmE7QUFPZEcsY0FBWSxFQUFHQyxRQUFELElBQWM7QUFDMUIsV0FBT0EsUUFBUSxDQUFDLFlBQUQsQ0FBZjtBQUNBLFdBQU8sTUFBT0MsUUFBUCxJQUFvQjtBQUN6QixVQUFJQyxJQUFJLEdBQUcs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QVksRUFBR2pCLFFBQUQsSUFBYztBQUMxQixXQUFPLE1BQU9DLFFBQVAsSUFBb0I7QUFDekIsWUFBTUMsSUFBSSxHQUFHLE1BQU1DLDRDQUFLLENBQ3JCQyxJQURnQixDQUNWLEdBQUVDLHlCQUFnQyx1QkFEeEIsRUFDZ0RMLFFBRGhELEVBRWhCTSxJQUZnQixDQUVYLFVBQVVDLFFBQVYsRUFBb0I7QUFDeEJDLGVBQU8sQ0FBQ0MsR0FBUixDQUFZRixRQUFaO0FBQ0FOLGdCQUFRLENBQUM7QUFBRUosY0FBSSxFQUFFWCxXQUFXLENBQUNPO0FBQXBCLFNBQUQsQ0FBUjtBQUNELE9BTGdCLEVBTWhCaUIsS0FOZ0IsQ0FNVixVQUFVQyxLQUFWLEVBQWlCO0FBQ3RCSCxlQUFPLENBQUNDLEdBQVIsQ0FBWUUsS0FBSyxDQUFDSixRQUFsQjs7QUFDQSxZQUFJSSxLQUFKLEVBQVc7QUFDVFYsa0JBQVEsQ0FBQztBQUNQSixnQkFBSSxFQUFFWCxXQUFXLENBQUNNLHNCQURYO0FBRVBNLG1CQUFPLEVBQUU7QUFGRixXQUFELENBQVI7QUFJRDtBQUNGLE9BZGdCLENBQW5CO0FBZUQsS0FoQkQ7QUFpQkQ7QUF2RmEsQ0FBaEI7QUEwRmUsK0ZBRVZaLFdBRkwsR0FJS1EsT0FKTCIsImZpbGUiOiIuL3N0b3JlL2FjdGlvbnMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgeyBzYXZlTG9naW5TZXNzaW9uIH0gZnJvbSBcIi4vaGVscGVyc1wiXG5cblxuY29uc3QgYWN0aW9uVHlwZXMgPSB7XG4gIFRFU1Q6IFwiVEVTVFwiLFxuICBTSUdOVVBfU1VDQ0VTUzogXCJTSUdOVVBfU1VDQ0VTU1wiLFxuICBWRVJJRllfU1VDQ0VTUzogXCJWRVJJRllfU1VDQ0VTU1wiLFxuICBWRVJJRllfRkFJTEVEOlwiVkVSSUZZX0ZBSUxFRFwiLFxuICBMT0dJTl9TVUNDRVNTOiBcIkxPR0lOX1NVQ0NFU1NcIixcbiAgRVJST1JfU1VCTUlUX0ZPUk1fREFUQTogXCJFUlJPUl9TVUJNSVRfRk9STV9EQVRBXCIsXG4gIFJFU0VORF9TVUNDRVNTOiBcIlJFU0VORF9TVUNDRVNTXCJcbn07XG5cbmNvbnN0IGFjdGlvbnMgPSB7XG4gIHNldFRlc3Q6ICh2YWwpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogYWN0aW9uVHlwZXMuVEVTVCxcbiAgICAgIHBheWxvYWQ6IHZhbCxcbiAgICB9O1xuICB9LFxuICBzdWJtaXRTaWdudXA6IChmb3JtRGF0YSkgPT4ge1xuICAgIGRlbGV0ZSBmb3JtRGF0YVtcIlJlUGFzc3dvcmRcIl07XG4gICAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaCkgPT4ge1xuICAgICAgbGV0IHJlc3AgPSBhd2FpdCBheGlvc1xuICAgICAgICAucG9zdChgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUElfVVJMfS9wZW9wbGUvc2lnbnVwYCwgZm9ybURhdGEpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IGFjdGlvblR5cGVzLlNJR05VUF9TVUNDRVNTIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IucmVzcG9uc2UpO1xuICAgICAgICAgIGlmIChlcnJvci5yZXNwb25zZS5kYXRhLmluY2x1ZGVzKFwiVXNlcm5hbWVFeGlzdHNFeGNlcHRpb25cIikpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgdHlwZTogYWN0aW9uVHlwZXMuRVJST1JfU1VCTUlUX0ZPUk1fREFUQSxcbiAgICAgICAgICAgICAgcGF5bG9hZDogXCJVc2VybmFtZSBleGlzdHMhXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gIH0sXG4gIHZlcmlmeVVzZXI6IChkYXRhKSA9PiB7XG4gICAgY29uc29sZS5sb2coZGF0YSlcbiAgICByZXR1cm4gYXN5bmMgKGRpc3BhdGNoKSA9PiB7XG4gICAgICBjb25zdCByZXNwID0gYXdhaXQgYXhpb3NcbiAgICAgICAgLnBvc3QoYCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTH0vcGVvcGxlL3NpZ251cC92ZXJpZnlgLCBkYXRhKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBhY3Rpb25UeXBlcy5WRVJJRllfU1VDQ0VTUyB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnJlc3BvbnNlKTtcbiAgICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2UuZGF0YSA9PSBcIkFjY291bnQgYWxyZWFkeSB2ZXJpZmllZCFcIiB8fCBlcnJvci5yZXNwb25zZS5kYXRhID09IFwiQWNjb3VudCBhbHJlYWR5IGV4aXN0cyBmb3IgdGhpcyBhbGlhcyFcIikge1xuICAgICAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgICB0eXBlOiBhY3Rpb25UeXBlcy5WRVJJRllfRkFJTEVELFxuICAgICAgICAgICAgICBwYXlsb2FkOiBlcnJvci5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogYWN0aW9uVHlwZXMuVkVSSUZZX0ZBSUxFRCwgcGF5bG9hZDogXCJGYWlsZWQgdG8gdmVyaWZ5IVwiIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgfSxcbiAgc3VibWl0TG9naW46IChmb3JtRGF0YSkgPT4ge1xuICAgIHJldHVybiBhc3luYyAoZGlzcGF0Y2gpID0+IHtcbiAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBheGlvc1xuICAgICAgICAucG9zdChgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUElfVVJMfS9wZW9wbGUvbG9naW5gLCBmb3JtRGF0YSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgIHNhdmVMb2dpblNlc3Npb24ocmVzcG9uc2UpO1xuICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogYWN0aW9uVHlwZXMuTE9HSU5fU1VDQ0VTUyB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLnJlc3BvbnNlKTtcbiAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICAgICAgdHlwZTogYWN0aW9uVHlwZXMuRVJST1JfU1VCTUlUX0ZPUk1fREFUQSxcbiAgICAgICAgICAgICAgcGF5bG9hZDogXCJFbWFpbCBvciBwYXNzd29yZCBhcmUgaW52YWxpZCFcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgfSxcbiAgc3VibWl0UmVzZW5kOiAoZm9ybURhdGEpID0+IHtcbiAgICByZXR1cm4gYXN5bmMgKGRpc3BhdGNoKSA9PiB7XG4gICAgICBjb25zdCByZXNwID0gYXdhaXQgYXhpb3NcbiAgICAgICAgLnBvc3QoYCR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTH0vcGVvcGxlL3NpZ251cC9yZXNlbmRgLCBmb3JtRGF0YSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogYWN0aW9uVHlwZXMuUkVTRU5EX1NVQ0NFU1MgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvci5yZXNwb25zZSk7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgICAgIHR5cGU6IGFjdGlvblR5cGVzLkVSUk9SX1NVQk1JVF9GT1JNX0RBVEEsXG4gICAgICAgICAgICAgIHBheWxvYWQ6IFwiSW52YWxpZCBlbWFpbCFcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgfSwgXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8vIFRZUEVTXG4gIC4uLmFjdGlvblR5cGVzLFxuICAvLyBBQ1RJT05TXG4gIC4uLmFjdGlvbnMsXG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./store/actions.js\n");

/***/ }),

/***/ "./store/helpers.js":
/*!**************************!*\
  !*** ./store/helpers.js ***!
  \**************************/
/*! exports provided: saveLoginSession */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveLoginSession\", function() { return saveLoginSession; });\nconst saveLoginSession = response => {\n  if (response.data) {\n    sessionStorage.setItem('AuthResults', JSON.stringify(response.data['AuthenticationResult']));\n  }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdG9yZS9oZWxwZXJzLmpzPzVmODgiXSwibmFtZXMiOlsic2F2ZUxvZ2luU2Vzc2lvbiIsInJlc3BvbnNlIiwiZGF0YSIsInNlc3Npb25TdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiJBQUVBO0FBQUE7QUFBTyxNQUFPQSxnQkFBZ0IsR0FBSUMsUUFBRCxJQUFjO0FBQzNDLE1BQUlBLFFBQVEsQ0FBQ0MsSUFBYixFQUFtQjtBQUNmQyxrQkFBYyxDQUFDQyxPQUFmLENBQXVCLGFBQXZCLEVBQXNDQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUwsUUFBUSxDQUFDQyxJQUFULENBQWMsc0JBQWQsQ0FBZixDQUF0QztBQUNIO0FBQ0osQ0FKTSIsImZpbGUiOiIuL3N0b3JlL2hlbHBlcnMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuZXhwb3J0IGNvbnN0ICBzYXZlTG9naW5TZXNzaW9uID0gKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnQXV0aFJlc3VsdHMnLCBKU09OLnN0cmluZ2lmeShyZXNwb25zZS5kYXRhWydBdXRoZW50aWNhdGlvblJlc3VsdCddKSlcbiAgICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./store/helpers.js\n");

/***/ }),

/***/ "./store/index.js":
/*!************************!*\
  !*** ./store/index.js ***!
  \************************/
/*! exports provided: wrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"wrapper\", function() { return wrapper; });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ \"redux-thunk\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-redux-wrapper */ \"next-redux-wrapper\");\n/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./middleware */ \"./store/middleware.js\");\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./actions */ \"./store/actions.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\nconst initialState = {\n  val: \"\"\n}; // create your reducer\n\nconst reducer = (state = initialState, action) => {\n  switch (action.type) {\n    case next_redux_wrapper__WEBPACK_IMPORTED_MODULE_2__[\"HYDRATE\"]:\n      return _objectSpread(_objectSpread({}, state), action.payload);\n\n    case _actions__WEBPACK_IMPORTED_MODULE_4__[\"default\"].ERROR_SUBMIT_FORM_DATA:\n      return _objectSpread(_objectSpread({}, state), {}, {\n        formError: action.payload\n      });\n\n    case _actions__WEBPACK_IMPORTED_MODULE_4__[\"default\"].SIGNUP_SUCCESS:\n      return _objectSpread(_objectSpread({}, state), {}, {\n        successfulSignup: true\n      });\n\n    case _actions__WEBPACK_IMPORTED_MODULE_4__[\"default\"].LOGIN_SUCCESS:\n      return _objectSpread(_objectSpread({}, state), {}, {\n        successfulLogin: true\n      });\n\n    case _actions__WEBPACK_IMPORTED_MODULE_4__[\"default\"].VERIFY_SUCCESS:\n      return _objectSpread(_objectSpread({}, state), {}, {\n        verifiedUser: true\n      });\n\n    case _actions__WEBPACK_IMPORTED_MODULE_4__[\"default\"].VERIFY_FAILED:\n      return _objectSpread(_objectSpread({}, state), {}, {\n        error: action.payload\n      });\n\n    case _actions__WEBPACK_IMPORTED_MODULE_4__[\"default\"].RESEND_SUCCESS:\n      return _objectSpread(_objectSpread({}, state), {}, {\n        successfulResend: true\n      });\n\n    default:\n      return state;\n  }\n}; // create a makeStore function\n\n\nconst makeStore = context => Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(reducer, Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"compose\"])(Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"])(redux_thunk__WEBPACK_IMPORTED_MODULE_1___default.a, ..._middleware__WEBPACK_IMPORTED_MODULE_3__[\"default\"]))); // export an assembled wrapper\n\n\nconst wrapper = Object(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_2__[\"createWrapper\"])(makeStore, {\n  debug: true\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdG9yZS9pbmRleC5qcz85MTAxIl0sIm5hbWVzIjpbImluaXRpYWxTdGF0ZSIsInZhbCIsInJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJIWURSQVRFIiwicGF5bG9hZCIsImFjdGlvblR5cGVzIiwiRVJST1JfU1VCTUlUX0ZPUk1fREFUQSIsImZvcm1FcnJvciIsIlNJR05VUF9TVUNDRVNTIiwic3VjY2Vzc2Z1bFNpZ251cCIsIkxPR0lOX1NVQ0NFU1MiLCJzdWNjZXNzZnVsTG9naW4iLCJWRVJJRllfU1VDQ0VTUyIsInZlcmlmaWVkVXNlciIsIlZFUklGWV9GQUlMRUQiLCJlcnJvciIsIlJFU0VORF9TVUNDRVNTIiwic3VjY2Vzc2Z1bFJlc2VuZCIsIm1ha2VTdG9yZSIsImNvbnRleHQiLCJjcmVhdGVTdG9yZSIsImNvbXBvc2UiLCJhcHBseU1pZGRsZXdhcmUiLCJ0aHVuayIsIm1pZGRsZXdhcmUiLCJ3cmFwcGVyIiwiY3JlYXRlV3JhcHBlciIsImRlYnVnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBLE1BQU1BLFlBQVksR0FBRztBQUFFQyxLQUFHLEVBQUU7QUFBUCxDQUFyQixDLENBRUE7O0FBQ0EsTUFBTUMsT0FBTyxHQUFHLENBQUNDLEtBQUssR0FBR0gsWUFBVCxFQUF1QkksTUFBdkIsS0FBa0M7QUFDaEQsVUFBUUEsTUFBTSxDQUFDQyxJQUFmO0FBQ0UsU0FBS0MsMERBQUw7QUFDRSw2Q0FBWUgsS0FBWixHQUFzQkMsTUFBTSxDQUFDRyxPQUE3Qjs7QUFDRixTQUFLQyxnREFBVyxDQUFDQyxzQkFBakI7QUFDRSw2Q0FBWU4sS0FBWjtBQUFtQk8saUJBQVMsRUFBRU4sTUFBTSxDQUFDRztBQUFyQzs7QUFDRixTQUFLQyxnREFBVyxDQUFDRyxjQUFqQjtBQUNFLDZDQUFZUixLQUFaO0FBQW1CUyx3QkFBZ0IsRUFBRTtBQUFyQzs7QUFDRixTQUFLSixnREFBVyxDQUFDSyxhQUFqQjtBQUNFLDZDQUFZVixLQUFaO0FBQW1CVyx1QkFBZSxFQUFFO0FBQXBDOztBQUNGLFNBQUtOLGdEQUFXLENBQUNPLGNBQWpCO0FBQ0UsNkNBQVlaLEtBQVo7QUFBbUJhLG9CQUFZLEVBQUU7QUFBakM7O0FBQ0YsU0FBS1IsZ0RBQVcsQ0FBQ1MsYUFBakI7QUFDRSw2Q0FBWWQsS0FBWjtBQUFtQmUsYUFBSyxFQUFFZCxNQUFNLENBQUNHO0FBQWpDOztBQUNGLFNBQUtDLGdEQUFXLENBQUNXLGNBQWpCO0FBQ0UsNkNBQVloQixLQUFaO0FBQW1CaUIsd0JBQWdCLEVBQUU7QUFBckM7O0FBQ0Y7QUFDRSxhQUFPakIsS0FBUDtBQWhCSjtBQWtCRCxDQW5CRCxDLENBcUJBOzs7QUFDQSxNQUFNa0IsU0FBUyxHQUFJQyxPQUFELElBQ2hCQyx5REFBVyxDQUFDckIsT0FBRCxFQUFVc0IscURBQU8sQ0FBQ0MsNkRBQWUsQ0FBQ0Msa0RBQUQsRUFBUSxHQUFHQyxtREFBWCxDQUFoQixDQUFqQixDQURiLEMsQ0FHQTs7O0FBQ08sTUFBTUMsT0FBTyxHQUFHQyx3RUFBYSxDQUFDUixTQUFELEVBQVk7QUFBRVMsT0FBSyxFQUFFO0FBQVQsQ0FBWixDQUE3QiIsImZpbGUiOiIuL3N0b3JlL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSB9IGZyb20gXCJyZWR1eFwiO1xuaW1wb3J0IHRodW5rIGZyb20gXCJyZWR1eC10aHVua1wiO1xuaW1wb3J0IHsgY3JlYXRlV3JhcHBlciwgSFlEUkFURSB9IGZyb20gXCJuZXh0LXJlZHV4LXdyYXBwZXJcIjtcblxuaW1wb3J0IG1pZGRsZXdhcmUgZnJvbSBcIi4vbWlkZGxld2FyZVwiO1xuaW1wb3J0IGFjdGlvblR5cGVzIGZyb20gXCIuL2FjdGlvbnNcIjtcblxuY29uc3QgaW5pdGlhbFN0YXRlID0geyB2YWw6IFwiXCIgfTtcblxuLy8gY3JlYXRlIHlvdXIgcmVkdWNlclxuY29uc3QgcmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEhZRFJBVEU6XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgLi4uYWN0aW9uLnBheWxvYWQgfTtcbiAgICBjYXNlIGFjdGlvblR5cGVzLkVSUk9SX1NVQk1JVF9GT1JNX0RBVEE6XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgZm9ybUVycm9yOiBhY3Rpb24ucGF5bG9hZCB9O1xuICAgIGNhc2UgYWN0aW9uVHlwZXMuU0lHTlVQX1NVQ0NFU1M6XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgc3VjY2Vzc2Z1bFNpZ251cDogdHJ1ZSB9O1xuICAgIGNhc2UgYWN0aW9uVHlwZXMuTE9HSU5fU1VDQ0VTUzpcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBzdWNjZXNzZnVsTG9naW46IHRydWUgfTtcbiAgICBjYXNlIGFjdGlvblR5cGVzLlZFUklGWV9TVUNDRVNTOlxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIHZlcmlmaWVkVXNlcjogdHJ1ZSB9O1xuICAgIGNhc2UgYWN0aW9uVHlwZXMuVkVSSUZZX0ZBSUxFRDpcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBlcnJvcjogYWN0aW9uLnBheWxvYWQgfTtcbiAgICBjYXNlIGFjdGlvblR5cGVzLlJFU0VORF9TVUNDRVNTOlxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIHN1Y2Nlc3NmdWxSZXNlbmQ6IHRydWUgfTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG4vLyBjcmVhdGUgYSBtYWtlU3RvcmUgZnVuY3Rpb25cbmNvbnN0IG1ha2VTdG9yZSA9IChjb250ZXh0KSA9PlxuICBjcmVhdGVTdG9yZShyZWR1Y2VyLCBjb21wb3NlKGFwcGx5TWlkZGxld2FyZSh0aHVuaywgLi4ubWlkZGxld2FyZSkpKTtcblxuLy8gZXhwb3J0IGFuIGFzc2VtYmxlZCB3cmFwcGVyXG5leHBvcnQgY29uc3Qgd3JhcHBlciA9IGNyZWF0ZVdyYXBwZXIobWFrZVN0b3JlLCB7IGRlYnVnOiB0cnVlIH0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./store/index.js\n");

/***/ }),

/***/ "./store/middleware.js":
/*!*****************************!*\
  !*** ./store/middleware.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ \"./store/actions.js\");\n\nconst imports = [];\nconst middleware = [// Log\nstore => {\n  return next => {\n    return action => {\n      const result = next(action);\n      return result;\n    };\n  };\n}];\n/* harmony default export */ __webpack_exports__[\"default\"] = ([...middleware, ...imports]);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdG9yZS9taWRkbGV3YXJlLmpzPzFmOTgiXSwibmFtZXMiOlsiaW1wb3J0cyIsIm1pZGRsZXdhcmUiLCJzdG9yZSIsIm5leHQiLCJhY3Rpb24iLCJyZXN1bHQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUVBLE1BQU1BLE9BQU8sR0FBRyxFQUFoQjtBQUVBLE1BQU1DLFVBQVUsR0FBRyxDQUNqQjtBQUNDQyxLQUFELElBQVc7QUFDVCxTQUFRQyxJQUFELElBQVU7QUFDZixXQUFRQyxNQUFELElBQVk7QUFDakIsWUFBTUMsTUFBTSxHQUFHRixJQUFJLENBQUNDLE1BQUQsQ0FBbkI7QUFFQSxhQUFPQyxNQUFQO0FBQ0QsS0FKRDtBQUtELEdBTkQ7QUFPRCxDQVZnQixDQUFuQjtBQWFlLGdFQUFDLEdBQUdKLFVBQUosRUFBZ0IsR0FBR0QsT0FBbkIsQ0FBZiIsImZpbGUiOiIuL3N0b3JlL21pZGRsZXdhcmUuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYWN0aW9ucyBmcm9tIFwiLi9hY3Rpb25zXCI7XG5cbmNvbnN0IGltcG9ydHMgPSBbXTtcblxuY29uc3QgbWlkZGxld2FyZSA9IFtcbiAgLy8gTG9nXG4gIChzdG9yZSkgPT4ge1xuICAgIHJldHVybiAobmV4dCkgPT4ge1xuICAgICAgcmV0dXJuIChhY3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV4dChhY3Rpb24pO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9O1xuICAgIH07XG4gIH0sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBbLi4ubWlkZGxld2FyZSwgLi4uaW1wb3J0c107XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./store/middleware.js\n");

/***/ }),

/***/ "./styles/index.css":
/*!**************************!*\
  !*** ./styles/index.css ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL3N0eWxlcy9pbmRleC5jc3MuanMiLCJzb3VyY2VzQ29udGVudCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./styles/index.css\n");

/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi private-next-pages/_app.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! private-next-pages/_app.js */"./pages/_app.js");


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiPzcwYzYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYXhpb3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///axios\n");

/***/ }),

/***/ "next-redux-wrapper":
/*!*************************************!*\
  !*** external "next-redux-wrapper" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next-redux-wrapper\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0LXJlZHV4LXdyYXBwZXJcIj8wMWMyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Im5leHQtcmVkdXgtd3JhcHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQtcmVkdXgtd3JhcHBlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///next-redux-wrapper\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiP2QzMjUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVkdXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///redux\n");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-thunk\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC10aHVua1wiPzg4MDgiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVkdXgtdGh1bmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC10aHVua1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///redux-thunk\n");

/***/ })

/******/ });