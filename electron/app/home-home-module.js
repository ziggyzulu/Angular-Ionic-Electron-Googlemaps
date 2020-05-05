(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-split-pane contentId=\"map-content\">\n\n\n  <ion-menu contentId=\"map-content\">\n    <ion-header>\n      <ion-toolbar>\n        <ion-title>\n          <!-- Saved Addresses -->\n          THIS IS AN UPDATE\n        </ion-title>\n      </ion-toolbar>\n    </ion-header>\n    <ion-content>\n      \n      <!-- Section to display side menu -->\n\n      <ion-list>\n\n        <ion-item *ngIf=\"!addresses.length\">\n          <p>You have no saved addresses. Please select an address from the map.</p>\n        </ion-item>\n\n        <!-- Loop through the addresses array, creating an ion item for each address, with a click handler which\n        sets the selected address to the address we click on -->\n\n        <ion-item *ngFor=\"let address of addresses\" button (click)=\"highlightedAddress=address\">\n\n          <ion-label>\n            <p>{{address.addressLine1}}</p>\n            <p *ngIf=\"address.addressLine2\">{{address.addressLine1}}</p>\n            <p>{{address.city}}, {{address.state}}, {{address.zipCode}}</p>\n          </ion-label>\n\n          <!-- Display on whichever address is the current or selected address -->\n\n          <ion-icon name=\"checkmark\" slot=\"end\" *ngIf=\"selectedAddress===address\"></ion-icon>\n\n          <!-- Clicking this pin icon will make this address the selected address. \n          Only displayed for the highlighted address. -->\n\n          <ion-icon name=\"pin\" slot=\"end\" (click)=\"provisionAsync(address); highlightedAddress===null\" \n          *ngIf=\"highlightedAddress===address\"></ion-icon>\n\n          <!-- Clicking this displays a confirmation to the user, which if confirmed will be deleted.\n          Only displayed for the highlighted address. -->\n\n          <ion-icon name=\"trash\" slot=\"end\" (click)=\"onDeleteClick(address)\" *ngIf=\"highlightedAddress===address\"></ion-icon>\n\n        </ion-item>\n      </ion-list>\n\n    </ion-content>\n    <!-- Footer will anchor this to the bottom of the page -->\n    <ion-footer>\n      <ion-toolbar>\n        <ion-title>\n          Your Information\n        </ion-title>\n      </ion-toolbar>\n      <form [formGroup]=\"endpointForm\" (ngSubmit)=\"saveEndpoint()\">\n        <ion-item>\n          <ion-label position=\"floating\">Name</ion-label>\n          <!-- The hashtag is what binds this to the viewchild decorator -->\n          <ion-input formControlName=\"name\" #endpointName></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label position=\"floating\">Phone</ion-label>\n          <ion-input formControlName=\"elin\"></ion-input>\n        </ion-item>\n        <!-- Disable the button if its not valid or not dirty - which means the user hasn't touched it yet -->\n        <ion-button type=\"submit\" [disabled]=\"!endpointForm.valid || !endpointForm.dirty\" expand=\"block\"\n          color=\"tertiary\">Save</ion-button>\n      </form>\n\n    </ion-footer>\n\n  </ion-menu>\n\n  <!-- The ion split pane needs two top level elements to control.\n  In order for the header to appear as a top level header to ionic, but for this to still all be contained\n  in one section, wrap it in a \"section\" -->\n\n  <section class=\"ion-page\" id=\"map-content\">\n\n    <ion-header>\n      <ion-toolbar>\n        <ion-buttons slot=\"start\">\n          <ion-menu-toggle>\n            <ion-button>\n              <ion-icon slot=\"icon-only\" name=\"menu\"></ion-icon>\n            </ion-button>\n          </ion-menu-toggle>\n        </ion-buttons>\n        <ion-title>\n          <!-- Select Location -->\n          UPDATE HAS REALLY REALLY REALLY  REALLY WORKED\n        </ion-title>\n      </ion-toolbar>\n    </ion-header>\n\n    <ion-content>\n\n      <agm-map [latitude]=\"+selectedAddress.latitude\" \n      [longitude]=\"+selectedAddress.longitude\"\n      [zoom]=\"18\"\n      [clickableIcons]=\"true\"\n      [showDefaultInfoWindow]=\"false\"\n      [usePanning]=\"true\"\n      (mapClick)=\"onMapClick($event)\"\n      >\n\n      <!-- Creating markers from our array of addresses -->\n      <agm-marker *ngFor=\"let address of addresses\" \n      [latitude]=\"+address.latitude\" [longitude]=\"+address.longitude\"\n      (markerClick)=\"provisionAsync(address)\">\n    \n        <!-- AGM markers can have info windows when clicked, and need to be set up inside the agm-marker element.\n        Bind its \"is open\" property to an expression that evaluates to true wether or not the selected address is \n        the currentaddress being rendered, with a maximum width of 300px.\n        We can put any HTML we want inside the window. -->\n        <agm-info-window [isOpen]=\"selectedAddress===address\" [maxWidth]=\"300\">\n\n          <ion-label>\n            <p>{{address.addressLine1}}</p>\n            <p *ngIf=\"address.addressLine2\">{{address.addressLine1}}</p>\n            <p>{{address.city}}, {{address.state}}, {{address.zipCode}}</p>\n          </ion-label>\n\n        </agm-info-window>\n    \n      </agm-marker>\n\n    \n      </agm-map>\n\n  </ion-content>\n\n\n  </section>\n\n</ion-split-pane>");

/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "./src/app/dispatcher.service.ts":
/*!***************************************!*\
  !*** ./src/app/dispatcher.service.ts ***!
  \***************************************/
/*! exports provided: DispatcherService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DispatcherService", function() { return DispatcherService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");




var DispatcherService = /** @class */ (function () {
    //This lets a user set an address as their current address for this theoretical
    //emergency services app
    function DispatcherService(http) {
        this.http = http;
    }
    //Each of these functions take an endpoint and return an endpoint wrapped in a promise
    DispatcherService.prototype.saveEndpointAsync = function (endpoint) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var saved, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!endpoint.id) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.updateAsync(endpoint)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.addAsync(endpoint)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        saved = _a;
                        //Once it's saved, pass it to the provisionAsync
                        return [2 /*return*/, this.provisionAsync(saved)];
                }
            });
        });
    };
    DispatcherService.prototype.addAsync = function (endpoint) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var url, ep;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].dispatcherUrl + "/endpoints";
                        return [4 /*yield*/, this.http.post(url, endpoint).toPromise()];
                    case 1:
                        ep = _a.sent();
                        //Assign the id of the endpoint returned to the id of the original paramter. 
                        endpoint.id = ep.id;
                        return [2 /*return*/, endpoint];
                }
            });
        });
    };
    DispatcherService.prototype.updateAsync = function (endpoint) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var url, ep;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].dispatcherUrl + "/endpoints";
                        return [4 /*yield*/, this.http.put(url, endpoint).toPromise()];
                    case 1:
                        ep = _a.sent();
                        //Return the endpoint object
                        return [2 /*return*/, endpoint];
                }
            });
        });
    };
    ;
    DispatcherService.prototype.provisionAsync = function (endpoint) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var url, ep;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].dispatcherUrl + "/endpoints/" + endpoint.id;
                        return [4 /*yield*/, this.http.put(url, endpoint).toPromise()];
                    case 1:
                        ep = _a.sent();
                        //The address status off the address object in the endpoint will have a new status value
                        //so copy it into the endppoint provided, updating it.
                        endpoint.address.addressStatus = ep.address.addressStatus;
                        return [2 /*return*/, endpoint];
                }
            });
        });
    };
    ;
    DispatcherService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    DispatcherService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], DispatcherService);
    return DispatcherService;
}());



/***/ }),

/***/ "./src/app/home/home-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/home/home-routing.module.ts ***!
  \*********************************************/
/*! exports provided: HomePageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageRoutingModule", function() { return HomePageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");




var routes = [
    {
        path: '',
        component: _home_page__WEBPACK_IMPORTED_MODULE_3__["HomePage"],
    }
];
var HomePageRoutingModule = /** @class */ (function () {
    function HomePageRoutingModule() {
    }
    HomePageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], HomePageRoutingModule);
    return HomePageRoutingModule;
}());



/***/ }),

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home-routing.module */ "./src/app/home/home-routing.module.ts");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/fesm5/agm-core.js");









var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _agm_core__WEBPACK_IMPORTED_MODULE_7__["AgmCoreModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _home_routing_module__WEBPACK_IMPORTED_MODULE_6__["HomePageRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"]
            ],
            declarations: [_home_page__WEBPACK_IMPORTED_MODULE_5__["HomePage"]]
        })
    ], HomePageModule);
    return HomePageModule;
}());



/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#container {\n  text-align: center;\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n#container strong {\n  font-size: 20px;\n  line-height: 26px;\n}\n\n#container p {\n  font-size: 16px;\n  line-height: 22px;\n  color: #8c8c8c;\n  margin: 0;\n}\n\n#container a {\n  text-decoration: none;\n}\n\nagm-map {\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9DOlxcVXNlcnNcXENhbHZpblxcRG9jdW1lbnRzXFxHaXRIdWJcXGVsZWN0cm9uLXBpbnBvaW50XFxlbGVjdHJvbi1nb29nbGVtYXBzL3NyY1xcYXBwXFxob21lXFxob21lLnBhZ2Uuc2NzcyIsInNyYy9hcHAvaG9tZS9ob21lLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBRUEsa0JBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFFBQUE7RUFDQSwyQkFBQTtBQ0FGOztBREdBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0FDQUY7O0FER0E7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFFQSxjQUFBO0VBRUEsU0FBQTtBQ0ZGOztBREtBO0VBQ0UscUJBQUE7QUNGRjs7QURLQTtFQUVFLFlBQUE7QUNIRiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjY29udGFpbmVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIHRvcDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG59XG5cbiNjb250YWluZXIgc3Ryb25nIHtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBsaW5lLWhlaWdodDogMjZweDtcbn1cblxuI2NvbnRhaW5lciBwIHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBsaW5lLWhlaWdodDogMjJweDtcblxuICBjb2xvcjogIzhjOGM4YztcblxuICBtYXJnaW46IDA7XG59XG5cbiNjb250YWluZXIgYSB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxuYWdtLW1hcCB7IFxuXG4gIGhlaWdodDogMTAwJTtcblxufSIsIiNjb250YWluZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIHRvcDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG59XG5cbiNjb250YWluZXIgc3Ryb25nIHtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBsaW5lLWhlaWdodDogMjZweDtcbn1cblxuI2NvbnRhaW5lciBwIHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBsaW5lLWhlaWdodDogMjJweDtcbiAgY29sb3I6ICM4YzhjOGM7XG4gIG1hcmdpbjogMDtcbn1cblxuI2NvbnRhaW5lciBhIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuXG5hZ20tbWFwIHtcbiAgaGVpZ2h0OiAxMDAlO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/home/home.page.ts":
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _maps_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../maps.service */ "./src/app/maps.service.ts");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../storage.service */ "./src/app/storage.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/fesm5/ionic-angular.js");
/* harmony import */ var ngx_electron__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-electron */ "./node_modules/ngx-electron/fesm5/ngx-electron.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");







var HomePage = /** @class */ (function () {
    function HomePage(maps, storage, alertController, electron, ngZone, fb, toastController) {
        this.maps = maps;
        this.storage = storage;
        this.alertController = alertController;
        this.electron = electron;
        this.ngZone = ngZone;
        this.fb = fb;
        this.toastController = toastController;
        this.endpoint = {};
        this.selectedAddress = {
            addressLine1: '4 Yawkey Way',
            city: 'Boston',
            state: 'MA',
            zipCode: '02215',
            latitude: '42.3466764',
            longitude: '-71.0994065'
        };
        //Create address variable as an array of Address objects, initialize as empty.
        this.addresses = [];
        this.initEndpointForm();
    }
    HomePage.prototype.initEndpointForm = function () {
        var phonePattern = /^1[0-9]{10}$/;
        this.endpointForm = this.fb.group({
            name: [this.endpoint.name, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
            elin: [this.endpoint.elin, [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].pattern(phonePattern)]]
        });
    };
    HomePage.prototype.ngOnInit = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //On init, await a call to the storage service and assign it's return value to the addresses array
                        _a = this;
                        return [4 /*yield*/, this.storage.getAddresses()];
                    case 1:
                        //On init, await a call to the storage service and assign it's return value to the addresses array
                        _a.addresses = _b.sent();
                        //Load the endpoint and populate the form when the app starts
                        return [4 /*yield*/, this.loadEndpoint()];
                    case 2:
                        //Load the endpoint and populate the form when the app starts
                        _b.sent();
                        //If there is no endpoint, we won't have a name - and in that case we can remind the user to provide it.
                        if (!this.endpoint.name) {
                            this.promptForInfo();
                        }
                        if (this.electron.isElectronApp) {
                            //Listen to data from Electron on the 'setAddress' channel. This triggers when an address is clicked on 
                            //from the system tray menu, setting the address to be the selected address - panning the location to it.
                            this.electron.ipcRenderer.on('setAddress', function (evt, addressId) {
                                //Some functions and changes happen outside the knowlegde of Angular, and it doesn't know to update
                                //the view. Calling a function from ngZone.run will let angular know that it needs to run change detection as
                                //part of the operation
                                _this.ngZone.run(function () { return _this.setAddressById(addressId); });
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //Display a toast notifaction to remind the user to fill in the form
    HomePage.prototype.promptForInfo = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var toast;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            position: 'bottom',
                            duration: 5000,
                            buttons: [{ text: 'OK', role: 'cancel' }],
                            header: 'Provide Your Info',
                            message: 'Pinpoint needs your name and phone number to set your current address.'
                        })];
                    case 1:
                        toast = _a.sent();
                        //Set the focus of the browser to the name field
                        this.nameField.setFocus();
                        return [4 /*yield*/, toast.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.setAddressById = function (addressId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var address;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.getAddress(addressId)];
                    case 1:
                        address = _a.sent();
                        if (address) {
                            this.provisionAsync(address);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //This is to set an address as your current address. (This app is a theoretical emergency services app that lets a user
    // save commonly visited addresses and set one as a current address for emergency services purposes)
    HomePage.prototype.provisionAsync = function (address) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.endpoint.elin && this.endpoint.name)) return [3 /*break*/, 2];
                        //If so, call the provison function in the storage serverice, which we
                        //must await as it returns a promise
                        return [4 /*yield*/, this.storage.provisionAddressAsync(address)];
                    case 1:
                        //If so, call the provison function in the storage serverice, which we
                        //must await as it returns a promise
                        _a.sent();
                        //Once we get a response, we can set both the selected and highlighted addresses to the endpoint returned
                        this.selectedAddress = address;
                        this.highlightedAddress = address;
                        return [3 /*break*/, 3];
                    case 2:
                        //If we still don't have a valid endpoint, prompt the user to provide those values again.
                        this.promptForInfo();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //This is called from the (mapClick) property set in in AGM in the HTML file, having the event passed into it
    HomePage.prototype.onMapClick = function (event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var place, address, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        place = event.placeId || event.coords;
                        return [4 /*yield*/, this.maps.geocode(place)];
                    case 1:
                        address = _b.sent();
                        //Save the address using the storage service, which assigns it an addressId
                        _a = this;
                        return [4 /*yield*/, this.storage.saveAddress(address)];
                    case 2:
                        //Save the address using the storage service, which assigns it an addressId
                        _a.highlightedAddress = _b.sent();
                        //Now push this address into our array of addresses
                        this.addresses.push(this.highlightedAddress);
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.onDeleteClick = function (address) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        alert = this.alertController.create({
                            header: 'Delete address?',
                            message: 're you sure you want to delete this address?',
                            buttons: [{
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                }, {
                                    text: 'Delete it',
                                    handler: function () { return _this.doDelete(address); }
                                }
                            ]
                        });
                        return [4 /*yield*/, alert];
                    case 1: 
                    // await a call to the present function, display it on the screen and wait for a user to take action
                    // It's not really blocking the UI, so we have to await it.
                    return [4 /*yield*/, (_a.sent()).present()];
                    case 2:
                        // await a call to the present function, display it on the screen and wait for a user to take action
                        // It's not really blocking the UI, so we have to await it.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.doDelete = function (address) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //Delete an address using it's address ID - which is assigned to it when saved.
                    return [4 /*yield*/, this.storage.deleteAddress(address.addressId)];
                    case 1:
                        //Delete an address using it's address ID - which is assigned to it when saved.
                        _a.sent();
                        this.highlightedAddress = null;
                        //Use the filter function to remove the address from our array list.
                        this.addresses = this.addresses.filter(function (addr) { return addr.addressId !== address.addressId; });
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.saveEndpoint = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //Pass the form's value and pass it to the storage service
                    return [4 /*yield*/, this.storage.setEndpoint(this.endpointForm.value)];
                    case 1:
                        //Pass the form's value and pass it to the storage service
                        _a.sent();
                        return [2 /*return*/, this.loadEndpoint()];
                }
            });
        });
    };
    ;
    //Calls getenpoint from storage, sets the local variable, and then rests the form so that Angular
    //no longer considers it dirty. This is a common pattern whenever a form submitted remains visible on the screen.
    HomePage.prototype.loadEndpoint = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.storage.getEndpoint()];
                    case 1:
                        _a.endpoint = _b.sent();
                        this.endpointForm.reset(this.endpoint);
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.ctorParameters = function () { return [
        { type: _maps_service__WEBPACK_IMPORTED_MODULE_2__["MapsService"] },
        { type: _storage_service__WEBPACK_IMPORTED_MODULE_3__["StorageService"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"] },
        { type: ngx_electron__WEBPACK_IMPORTED_MODULE_5__["ElectronService"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"] },
        { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('endpointName', { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonInput"])
    ], HomePage.prototype, "nameField", void 0);
    HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./home.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html")).default,
            styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")).default]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_maps_service__WEBPACK_IMPORTED_MODULE_2__["MapsService"],
            _storage_service__WEBPACK_IMPORTED_MODULE_3__["StorageService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"],
            ngx_electron__WEBPACK_IMPORTED_MODULE_5__["ElectronService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"]])
    ], HomePage);
    return HomePage;
}());



/***/ }),

/***/ "./src/app/maps.service.ts":
/*!*********************************!*\
  !*** ./src/app/maps.service.ts ***!
  \*********************************/
/*! exports provided: MapsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapsService", function() { return MapsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var MapsService = /** @class */ (function () {
    function MapsService() {
        this.geocoder = new google.maps.Geocoder();
    }
    //Call this whenever a user clicks on the map
    //It can take either a string - which means the user clicked on an item on the map that has a google place ID,
    // or they clicked on a location that has a raw lat/lang location
    //This geocode function is asynchronous, and returns a promise containing an address
    MapsService.prototype.geocode = function (placeIdOrLoction) {
        //Create the promise to return
        var _this = this;
        return new Promise(function (resolve, reject) {
            //Analyse the type of the paramater, setting the location property or place ID
            var params = typeof placeIdOrLoction === 'string'
                ? { placeId: placeIdOrLoction }
                : { location: placeIdOrLoction };
            //Now we pass it to the geocoder's geocode function (part of the maps API),
            // and returns a place based on the information we provide
            _this.geocoder.geocode(params, function (results, status) {
                //If it's successful, it returns status.ok in the callback,
                //if there's an error, we grab it and reject the promise
                if (status !== google.maps.GeocoderStatus.OK) {
                    return reject(status);
                }
                //If the call is successful, we'll parse the first result in the array of results
                //as google maps could return more than one result
                var result = results[0];
                console.debug('Geocoding returned', result);
                //The result is parsed into an address
                //And passed to the caller when we resolve the promise
                //The parser function (below)loops through the list of key/value pairs from the result
                // and constructs an address object from the important /relevant pieces
                var address = _this.parseResult(result);
                resolve(address);
            });
        });
    };
    MapsService.prototype.parseResult = function (result) {
        var components = result.address_components;
        //Createa new map where key/values are both strings
        var parsed = new Map();
        //for each compoent of the google result,
        // add them as a new key/value to the parse map.
        for (var _i = 0, components_1 = components; _i < components_1.length; _i++) {
            var component = components_1[_i];
            for (var _a = 0, _b = component.types; _a < _b.length; _a++) {
                var type = _b[_a];
                parsed.set(type, component.short_name);
            }
        }
        //Construct an address object using the key's of the parse map, and the raw lat/lang data from the result
        var address = {
            addressLine1: parsed.get('street_address') || parsed.get('street_number') + " " + parsed.get('route'),
            city: parsed.get('locality'),
            state: parsed.get('administrrative_are_level_1'),
            zipCode: parsed.get('postal_code'),
            placeId: result.place_id,
            latitude: result.geometry.location.lat().toString(),
            longitude: result.geometry.location.lng().toString()
        };
        return address;
    };
    MapsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], MapsService);
    return MapsService;
}());



/***/ }),

/***/ "./src/app/storage.service.ts":
/*!************************************!*\
  !*** ./src/app/storage.service.ts ***!
  \************************************/
/*! exports provided: StorageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StorageService", function() { return StorageService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var uuid_v1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid/v1 */ "./node_modules/uuid/v1.js");
/* harmony import */ var uuid_v1__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uuid_v1__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ngx_electron__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-electron */ "./node_modules/ngx-electron/fesm5/ngx-electron.js");
/* harmony import */ var _dispatcher_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dispatcher.service */ "./src/app/dispatcher.service.ts");






var StorageService = /** @class */ (function () {
    function StorageService(storage, electron, dispatcher) {
        this.storage = storage;
        this.electron = electron;
        this.dispatcher = dispatcher;
    }
    //Takes an address and returns an endpoint wrapped by a promise
    StorageService.prototype.provisionAddressAsync = function (address) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var endpoint;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!address.addressId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.saveAddress(address)];
                    case 1:
                        address = _a.sent();
                        _a.label = 2;
                    case 2:
                        ;
                        return [4 /*yield*/, this.getEndpoint()];
                    case 3:
                        endpoint = _a.sent();
                        endpoint.address = address;
                        //Now pass the entire endpoint object into the dispatcher service
                        return [2 /*return*/, this.dispatcher.saveEndpointAsync(endpoint)];
                }
            });
        });
    };
    StorageService.prototype.saveAddress = function (address) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //If the addres paramter does not already contain an address ID - meaning its new, assign it one
                        if (!address.addressId) {
                            address.addressId = uuid_v1__WEBPACK_IMPORTED_MODULE_3___default()();
                        }
                        //Ionic storage serialises our storage ti JSON so we don't have to.
                        //All storage functions return a promise, so await it.
                        return [4 /*yield*/, this.storage.set(address.addressId, address)];
                    case 1:
                        //Ionic storage serialises our storage ti JSON so we don't have to.
                        //All storage functions return a promise, so await it.
                        _a.sent();
                        //Send the address list to the electron process tier. Any the Ionic app requests the address list from storage,
                        //or changes it in any way, eg deleting an item - we want to let the Electron app know about it.
                        this.updateAddressMenu();
                        return [2 /*return*/, address];
                }
            });
        });
    };
    //Retrieve all addresses from storage
    //Async as we're awaiting the forEach loop
    StorageService.prototype.getAddresses = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var addresses;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addresses = [];
                        //Take each address and store them in a local array
                        return [4 /*yield*/, this.storage.forEach(function (address) {
                                //Because anything can be stored in arrays, only add an item to an array if it has an addressId value
                                if (address.addressId) {
                                    addresses.push(address);
                                }
                            })];
                    case 1:
                        //Take each address and store them in a local array
                        _a.sent();
                        this.updateAddressMenu(addresses);
                        //Return the array of addresses
                        return [2 /*return*/, addresses];
                }
            });
        });
    };
    //Return a single address passing the addressId as the database key
    //This does not meed to be marked async as we're not awaiting anything
    StorageService.prototype.getAddress = function (addressId) {
        return this.storage.get(addressId);
    };
    StorageService.prototype.deleteAddress = function (addressId) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.remove(addressId)];
                    case 1:
                        _a.sent();
                        this.updateAddressMenu();
                        return [2 /*return*/];
                }
            });
        });
    };
    //Let the electron process know about any changes to the address list.
    StorageService.prototype.updateAddressMenu = function (addressList) {
        if (addressList === void 0) { addressList = null; }
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var addresses, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.electron.isElectronApp) return [3 /*break*/, 3];
                        _a = addressList;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getAddresses()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        addresses = _a;
                        //We then use the ipc Renderer object to send the list of addresses to electron, on the 'address' channel.
                        this.electron.ipcRenderer.send('addresses', addresses);
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //Save the endpoint to the local storage, using the word 'endpoint' as the storage key
    StorageService.prototype.setEndpoint = function (endpoint) {
        return this.storage.set('endpoint', endpoint);
    };
    //Retrieve a value fro the localstore using the endpoint key
    StorageService.prototype.getEndpoint = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var endpoint;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get('endpoint')];
                    case 1:
                        endpoint = _a.sent();
                        //Return an empty object if it's null
                        return [2 /*return*/, endpoint || {}];
                }
            });
        });
    };
    StorageService.ctorParameters = function () { return [
        { type: _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"] },
        { type: ngx_electron__WEBPACK_IMPORTED_MODULE_4__["ElectronService"] },
        { type: _dispatcher_service__WEBPACK_IMPORTED_MODULE_5__["DispatcherService"] }
    ]; };
    StorageService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"], ngx_electron__WEBPACK_IMPORTED_MODULE_4__["ElectronService"], _dispatcher_service__WEBPACK_IMPORTED_MODULE_5__["DispatcherService"]])
    ], StorageService);
    return StorageService;
}());



/***/ })

}]);
//# sourceMappingURL=home-home-module.js.map