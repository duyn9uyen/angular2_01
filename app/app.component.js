System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var AppComponent;
    function getJsonArrayOfYears() {
        var d = new Date();
        var currentYear = d.getFullYear(); // current year
        var baseYear = 2015;
        var difference = currentYear - baseYear;
        var years = [];
        // add in the base year up to the current year
        for (var index = 0; index <= difference; index++) {
            var year = baseYear + index;
            var jsonObj = { "id": year.toString(), "name": year.toString() };
            years.push(jsonObj);
        }
        return years;
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.months = [
                        { "id": "01", "name": "January" },
                        { "id": "02", "name": "Feburary" },
                        { "id": "03", "name": "March" },
                        { "id": "04", "name": "April" },
                        { "id": "05", "name": "May" },
                        { "id": "06", "name": "June" },
                        { "id": "07", "name": "July" },
                        { "id": "08", "name": "August" },
                        { "id": "09", "name": "September" },
                        { "id": "10", "name": "October" },
                        { "id": "11", "name": "November" },
                        { "id": "12", "name": "December" }
                    ];
                    this.selectedMonth = this.months[0];
                    this.years = getJsonArrayOfYears();
                }
                AppComponent.prototype.onSelect = function (monthId) {
                    this.selectedMonth = null;
                    for (var i = 0; i < this.months.length; i++) {
                        if (this.months[i].id == monthId) {
                            this.selectedMonth = this.months[i];
                        }
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        //template: '<h1>My First Angular 2 App</h1>'
                        templateUrl: 'app/app.component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map