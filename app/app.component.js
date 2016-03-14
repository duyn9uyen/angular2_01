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
                        { "id": "02", "name": "February" },
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
                    this.years = this.getJsonArrayOfYears();
                    this.selectedYear = this.years[0];
                    this.dt_start = this.selectedYear.id + "-" + this.selectedMonth.id + "-01";
                    this.dt_end = this.selectedYear.id + "-" + "0" + (parseInt(this.selectedMonth.id) + 1).toString() + "-01";
                    this.protocol = "https";
                    this.domain = "portal.captechventures.com";
                    this.urlPath1 = "/PA/SI/_vti_bin/listdata.svc/CertificationTracking?$filter=%28DatePassed+ge+datetime%27";
                    this.urlPath2 = "%27%29%20and%20%28DatePassed+lt+datetime%27";
                    this.urlPath3 = "%27%29";
                    this.certFilterUrl = this.protocol + "://" + this.domain + this.urlPath1 + this.dt_start + this.urlPath2 + this.dt_end + this.urlPath3;
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.loadBarChart(this);
                };
                // Event Hander Functions----
                AppComponent.prototype.onSelectMonth = function (monthId) {
                    this.selectedMonth = null;
                    for (var i = 0; i < this.months.length; i++) {
                        if (this.months[i].id == monthId) {
                            this.selectedMonth = this.months[i];
                        }
                    }
                    this.buildSearchFilter();
                    this.loadBarChart(this);
                };
                AppComponent.prototype.onSelectYear = function (yearId) {
                    this.selectedYear = null;
                    for (var i = 0; i < this.years.length; i++) {
                        if (this.years[i].id == yearId) {
                            this.selectedYear = this.years[i];
                        }
                    }
                    this.buildSearchFilter();
                    this.loadBarChart(this);
                };
                // Private Functions
                AppComponent.prototype.buildSearchFilter = function () {
                    this.dt_start = this.selectedYear.id + "-" + this.selectedMonth.id + "-01";
                    this.dt_end = this.selectedYear.id + "-" + "0" + (parseInt(this.selectedMonth.id) + 1).toString() + "-01";
                    this.certFilterUrl = this.protocol + "://" + this.domain + this.urlPath1 + this.dt_start + this.urlPath2 + this.dt_end + this.urlPath3;
                };
                AppComponent.prototype.getJsonArrayOfYears = function () {
                    var d = new Date();
                    var currentYear = d.getFullYear(); // current year
                    var baseYear = 2015;
                    var difference = currentYear - baseYear;
                    var years = [];
                    // add in the current year the any previous years until the base year
                    for (var index = 0; index <= difference; index++) {
                        var year = currentYear - index;
                        var jsonObj = { "id": year.toString(), "name": year.toString() };
                        years.push(jsonObj);
                    }
                    return years;
                };
                AppComponent.prototype.loadBarChart = function (_this) {
                    var previousMonthIndex = (parseInt(_this.selectedMonth.id) - 2);
                    var prevMonthName = '';
                    var prevMonthYearName = _this.selectedYear.name;
                    var currentMonthData = [133, 156, 947, 408, 6];
                    var prevMonthData = [107, 31, 635, 203, 2];
                    // the previous month is in the same selected year
                    if (previousMonthIndex > -1) {
                        prevMonthName = _this.months[previousMonthIndex].name;
                    }
                    else {
                        // the previous month is the year before the current selected year
                        var prevYearIndex = 0;
                        for (var i = 0; i < _this.years.length; i++) {
                            if (_this.years[i].id == _this.selectedYear.id) {
                                prevYearIndex = i + 1;
                            }
                        }
                        // if the previous year exists in our array, get the month name
                        if (_this.years[prevYearIndex]) {
                            prevMonthYearName = _this.years[prevYearIndex].name;
                        }
                        else {
                            // no previous month because the year selected is the base year (no data available)
                            prevMonthData = null;
                        }
                        var absoluteVal = Math.abs(previousMonthIndex);
                        var prevMonthIndex = 12 - absoluteVal;
                        prevMonthName = _this.months[prevMonthIndex].name;
                    }
                    // Here we build out the data object to display in the graph
                    var _dataToDisplay = [];
                    var currentSelectionJsonData = { "name": _this.selectedMonth.name + " " + _this.selectedYear.name, "data": currentMonthData };
                    _dataToDisplay.push(currentSelectionJsonData);
                    var prevMonthJsonData = { "name": prevMonthName + " " + prevMonthYearName, "data": prevMonthData };
                    // only add in the previous month data if we have it.
                    if (prevMonthData) {
                        _dataToDisplay.push(prevMonthJsonData);
                    }
                    $('#bargraphContainer').highcharts({
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: 'Certifications by Learning Path'
                        },
                        subtitle: {
                            text: 'Month: ' + _this.selectedMonth.name
                        },
                        xAxis: {
                            categories: ['Mobile', 'WCC', 'Services & APIs', 'Cloud', 'DevOps'],
                            title: {
                                text: null
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '# Passed',
                                align: 'high'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        tooltip: {
                            valueSuffix: ' millions'
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'top',
                            x: -40,
                            y: 80,
                            floating: true,
                            borderWidth: 1,
                            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                            shadow: true
                        },
                        credits: {
                            enabled: false
                        },
                        series: _dataToDisplay
                    });
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
            $(document).ready(function () {
                //alert("jquery");
            });
        }
    }
});
//# sourceMappingURL=app.component.js.map