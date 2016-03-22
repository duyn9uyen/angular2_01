System.register(['angular2/core', 'angular2/http', 'rxjs/add/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var CertService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            // note: If you are geting this error in CHROME:
            // No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access.
            // add the extension in google chrome to allow access using CORS
            // https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en-US)
            // It is a "best practice" to apply the @Injectable() decorator ​from the start​ both for consistency and for future-proofing.
            // HTTP calls in Angular 2 by default return observables through RxJS, whereas $http in Angular 1.x returns promises
            // Observables = Promises + Events
            CertService = (function () {
                // we're passing Http to the constructor so that we can use it in our class methods.
                function CertService(_http) {
                    this._http = _http;
                    console.log('Service created.', _http);
                }
                CertService.prototype.getCertTrackingByDate = function (filterUrl) {
                    filterUrl = "http://localhost:3000/app/certifications.json";
                    return this._http.get(filterUrl)
                        .map(function (res) { return res.json(); });
                };
                CertService.prototype.getJsonTest = function () {
                    //expect this json from http://date.jsontest.com
                    // {
                    //     "time": "03:53:25 AM",
                    //     "milliseconds_since_epoch": 1362196405309,
                    //     "date": "03-02-2013"
                    // }
                    // Another url to test with: http://jsonplaceholder.typicode.com/posts/1
                    return this._http.get('http://localhost:3000/app/friends.json')
                        .map(function (res) { return res.json(); });
                };
                CertService.prototype.postJsonTest = function () {
                    var json = JSON.stringify({ something: 'test', somethingElse: 3 });
                    var params = 'json=' + json;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded)');
                    headers.append('Access-Control-Allow-Origin', '*');
                    headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
                    return this._http.post('http://validate.jsontest.com', params, { headers: headers }) // optinal arguments
                        .map(function (res) { return res.json(); });
                };
                CertService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], CertService);
                return CertService;
            }());
            exports_1("CertService", CertService);
        }
    }
});
//# sourceMappingURL=cert.service.js.map