System.register(['angular2/core', './cert.service'], function(exports_1, context_1) {
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
    var core_1, cert_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (cert_service_1_1) {
                cert_service_1 = cert_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_certService) {
                    this._certService = _certService;
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
                    // -------- Public Properties ------------
                    this.selectedMonth = this.months[0];
                    this.years = this.getJsonArrayOfYears();
                    this.selectedYear = this.years[0];
                    // Todo: Get all the 'LearningPathValue' categories dynamically
                    this.learningPathValues = ['Mobile', 'WCC', 'Services & APIs', 'Cloud', 'DevOps'];
                    this.graphData = {
                        currentSelectMonth: [],
                        previousSelectMonth: []
                    };
                    this.barDataToDisplay = [];
                    this.pieDataToDisplay = [];
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.getAndRenderGraphs();
                };
                AppComponent.prototype.onTestGet = function () {
                    var _this = this;
                    this._certService.getCurrentTime()
                        .subscribe(
                    // on success...
                    function (data) { return _this.testGetData = JSON.stringify(data); }, 
                    // on error
                    function (error) { return console.log("error getting data"); }, 
                    // completed
                    function () { return console.log("finished getting data"); });
                };
                AppComponent.prototype.onTestPost = function () {
                    var _this = this;
                    this._certService.postJSON()
                        .subscribe(function (data) { return _this.testPostData = JSON.stringify(data); }, function (error) { return console.log("error getting data"); }, function () { return console.log("finished getting data"); });
                };
                // -------- Event Hander Functions -------
                AppComponent.prototype.onSelectMonth = function (monthId) {
                    this.selectedMonth = null;
                    for (var i = 0; i < this.months.length; i++) {
                        if (this.months[i].id == monthId) {
                            this.selectedMonth = this.months[i];
                        }
                    }
                    this.getAndRenderGraphs();
                };
                AppComponent.prototype.onSelectYear = function (yearId) {
                    this.selectedYear = null;
                    for (var i = 0; i < this.years.length; i++) {
                        if (this.years[i].id == yearId) {
                            this.selectedYear = this.years[i];
                        }
                    }
                    this.getAndRenderGraphs();
                };
                // ---------- Private Functions ---------
                AppComponent.prototype.getAndRenderGraphs = function () {
                    // clear any previous data
                    this.barDataToDisplay = [];
                    this.pieDataToDisplay = [];
                    this.getData();
                    this.loadBarChart();
                    this.loadPieChart();
                };
                AppComponent.prototype.getData = function () {
                    this.buildSearchFilter();
                    // Todo: call api with query to get data. Map retrieved data to the learningPath category in the array position       
                    //this.certifcationJsonData = this._certService.getCertTrackingByDate(this.certFilterUrl);    
                    // this._certService.getCertTrackingByDate(this.certFilterUrl)
                    //     .then(certifcationJsonData => this.certifcationJsonData = certifcationJsonData);
                    //this._certService.getCertTrackingByDate(this.certFilterUrl).subscribe(res => this.certifcationJsonData = res);
                    //this.certifcationData = this._certService.getCertTrackingByDate(this.certFilterUrl);
                    this.graphData.currentSelectMonth = [1, 5, 4, 3, 6];
                    this.graphData.previousSelectMonth = [0, 7, 4, 2, 2];
                    this.buildChartData();
                };
                AppComponent.prototype.buildSearchFilter = function () {
                    var dt_start = this.selectedYear.id + "-" + this.selectedMonth.id + "-01";
                    var dt_end = this.selectedYear.id + "-" + "0" + (parseInt(this.selectedMonth.id) + 1).toString() + "-01";
                    var protocol = "https";
                    var domain = "portal.captechventures.com";
                    var urlPath1 = "/PA/SI/_vti_bin/listdata.svc/CertificationTracking?$filter=%28DatePassed+ge+datetime%27";
                    var urlPath2 = "%27%29%20and%20%28DatePassed+lt+datetime%27";
                    var urlPath3 = "%27%29";
                    dt_start = this.selectedYear.id + "-" + this.selectedMonth.id + "-01";
                    dt_end = this.selectedYear.id + "-" + "0" + (parseInt(this.selectedMonth.id) + 1).toString() + "-01";
                    this.certFilterUrl = protocol + "://" + domain + urlPath1 + dt_start + urlPath2 + dt_end + urlPath3;
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
                AppComponent.prototype.buildChartData = function () {
                    var previousMonthIndex = (parseInt(this.selectedMonth.id) - 2);
                    var prevMonthName = '';
                    var prevMonthYearName = this.selectedYear.name;
                    // the previous month is in the same selected year
                    if (previousMonthIndex > -1) {
                        prevMonthName = this.months[previousMonthIndex].name;
                    }
                    else {
                        // the previous month is the year before the current selected year
                        var prevYearIndex = 0;
                        for (var i = 0; i < this.years.length; i++) {
                            if (this.years[i].id == this.selectedYear.id) {
                                prevYearIndex = i + 1;
                            }
                        }
                        // if the previous year exists in our array, get the month name
                        if (this.years[prevYearIndex]) {
                            prevMonthYearName = this.years[prevYearIndex].name;
                        }
                        else {
                            // no previous month because the year selected is the base year (no data available)
                            this.graphData.previousSelectMonth = null;
                        }
                        var absoluteVal = Math.abs(previousMonthIndex);
                        var prevMonthIndex = 12 - absoluteVal;
                        prevMonthName = this.months[prevMonthIndex].name;
                    }
                    // Here we build out the data object to display in the graph
                    var currentSelectionBarData = { "name": this.selectedMonth.name + " " + this.selectedYear.name, "data": this.graphData.currentSelectMonth };
                    this.barDataToDisplay.push(currentSelectionBarData);
                    //this.pieDataToDisplay.push(currentSelectionBarData);
                    var prevMonthBarData = { "name": prevMonthName + " " + prevMonthYearName, "data": this.graphData.previousSelectMonth };
                    // only add in the previous month data if we have it.
                    if (this.graphData.previousSelectMonth) {
                        //instead of the javascript 'push' function, 
                        // use unshift, which modifies the existing array by adding the arguments to the beginning:
                        this.barDataToDisplay.unshift(prevMonthBarData);
                    }
                    // Todo: Make this dynamic and smarter.
                    var mobilePieData = ["Mobile", this.graphData.currentSelectMonth[0]];
                    this.pieDataToDisplay.push(mobilePieData);
                    var wCCPieData = ["WCC", this.graphData.currentSelectMonth[1]];
                    this.pieDataToDisplay.push(wCCPieData);
                    var serviceApiPieData = ["Services & APIs", this.graphData.currentSelectMonth[2]];
                    this.pieDataToDisplay.push(serviceApiPieData);
                    var cloudPieData = ["Cloud", this.graphData.currentSelectMonth[3]];
                    this.pieDataToDisplay.push(cloudPieData);
                    var devOpsPieData = ["DevOps", this.graphData.currentSelectMonth[4]];
                    this.pieDataToDisplay.push(devOpsPieData);
                    // example: 
                    // data: [
                    //     ['Mobile', 4],
                    //     ['WCC', 8],
                    //     ['Services & APIs', 2],
                    //     ['Cloud', 5],
                    //     ['DevOps', 3],                    
                    // ]
                };
                AppComponent.prototype.loadBarChart = function () {
                    $('#bargraphContainer').highcharts({
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: 'Certifications by Learning Path'
                        },
                        subtitle: {
                            text: 'Month: ' + this.selectedMonth.name
                        },
                        xAxis: {
                            categories: this.learningPathValues,
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
                        // series: [{
                        //     name: 'Year 1800',
                        //     data: [107, 31, 635, 203, 2]
                        // }, {
                        //     name: 'Year 1900',
                        //     data: [133, 156, 947, 408, 6]
                        // }]
                        series: this.barDataToDisplay
                    });
                };
                AppComponent.prototype.loadPieChart = function () {
                    $('#pieChartcContainer').highcharts({
                        chart: {
                            type: 'pie',
                            options3d: {
                                enabled: true,
                                alpha: 45,
                                beta: 0
                            }
                        },
                        title: {
                            text: 'Certifications by Learning Path'
                        },
                        subtitle: {
                            text: 'Month: ' + this.selectedMonth.name
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                depth: 35,
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.name}'
                                }
                            }
                        },
                        series: [{
                                type: 'pie',
                                name: 'Browser share',
                                // data: [
                                //     ['Mobile', 4],
                                //     ['WCC', 8],
                                //     ['Services & APIs', 2],
                                //     ['Cloud', 5],
                                //     ['DevOps', 3],                    
                                // ]
                                data: this.pieDataToDisplay
                            }]
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        //template: '<h1>My First Angular 2 App</h1>'
                        templateUrl: 'app/app.component.html',
                        providers: [cert_service_1.CertService],
                    }), 
                    __metadata('design:paramtypes', [cert_service_1.CertService])
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