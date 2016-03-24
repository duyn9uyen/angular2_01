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
                // ------------------------------------------- Public Functions ----------------------------------------------
                function AppComponent(_certService) {
                    this._certService = _certService;
                    this.typeOfReports = [
                        { "id": "1", "name": "Certifications" },
                        { "id": "2", "name": "Tech Challenges" }
                    ];
                    this.months = [
                        { "id": "01", "name": "January", "disabled": false },
                        { "id": "02", "name": "February", "disabled": false },
                        { "id": "03", "name": "March", "disabled": false },
                        { "id": "04", "name": "April", "disabled": false },
                        { "id": "05", "name": "May", "disabled": false },
                        { "id": "06", "name": "June", "disabled": false },
                        { "id": "07", "name": "July", "disabled": false },
                        { "id": "08", "name": "August", "disabled": false },
                        { "id": "09", "name": "September", "disabled": false },
                        { "id": "10", "name": "October", "disabled": false },
                        { "id": "11", "name": "November", "disabled": false },
                        { "id": "12", "name": "December", "disabled": false }
                    ];
                    this.selectedReport = this.typeOfReports[0]; //defaults to the certification report (The html UI select)
                    this.previousMonth = this.selectedMonth;
                    this.baseYear = 2015;
                    this.years = this.getJsonArrayOfYears();
                    this.selectedYear = this.years[0];
                    this.previousYear = this.years[0];
                    // Todo: Can we get all available 'LearningPathValue' categories dynamically?
                    this.learningPaths = ['Mobile', 'WCC', 'Services & APIs', 'Cloud', 'DevOps'];
                    // array that holds all the counts for each LearningPathValue. Index order is the same as the learningPaths array.
                    // ie. Mobile = currentSelectMonth[0], WCC = currentSelectMonth[1], etc.
                    this.graphData = {
                        currentSelectMonth: [0, 0, 0, 0, 0],
                        previousSelectMonth: [0, 0, 0, 0, 0]
                    };
                    this.ignorePreviousMonth = false;
                    this.barDataToDisplay = [];
                    this.pieDataToDisplay = [];
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.disableFutureMonths();
                    if (this.selectedReport.id == "1") {
                        this.getAndRenderGraphs();
                    }
                };
                AppComponent.prototype.onTestGet = function () {
                    var _this = this;
                    this._certService.getJsonTest()
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
                    this._certService.postJsonTest()
                        .subscribe(function (data) { return _this.testPostData = JSON.stringify(data); }, function (error) { return console.log("error posting data"); }, function () { return console.log("finished getting data"); });
                };
                // ------------------------------------------- Event Hander Functions ----------------------------------------------
                AppComponent.prototype.onSelectReport = function (reportId) {
                    this.selectedReport = null;
                    for (var i = 0; i < this.typeOfReports.length; i++) {
                        if (this.typeOfReports[i].id == reportId) {
                            this.selectedReport = this.typeOfReports[i];
                        }
                    }
                    if (this.selectedReport.id == "1") {
                        this.getAndRenderGraphs();
                    }
                };
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
                    this.disableFutureMonths();
                    this.getAndRenderGraphs();
                };
                AppComponent.prototype.onGenerateCharts = function () {
                    this.getAndRenderGraphs();
                };
                // ------------------------------------------- Private Functions ----------------------------------------------
                AppComponent.prototype.getAndRenderGraphs = function () {
                    //var el = $('<div>').appendTo('body').spin();
                    var el = $('#spin').spin({ color: '#333', shadow: false });
                    // clear any previous data
                    this.barDataToDisplay = [];
                    this.pieDataToDisplay = [];
                    this.graphData = {
                        currentSelectMonth: [0, 0, 0, 0, 0],
                        previousSelectMonth: [0, 0, 0, 0, 0]
                    };
                    this.getData();
                };
                AppComponent.prototype.getData = function () {
                    var _this = this;
                    this.buildSearchFilter();
                    this._certService.getCertTrackingByDate(this.currentFilterUrl)
                        .subscribe(
                    // on success...
                    function (data) { return _this.parseData(_this._currentData, _this.graphData.currentSelectMonth, data); }, 
                    // on error
                    function (error) { return console.log("error getting current data: " + error); }, 
                    // completed
                    function () { return console.log("finished getting current data"); });
                    this._certService.getCertTrackingByDate(this.previousFilterUrl)
                        .subscribe(
                    // on success...
                    function (data) { return _this.parseData(_this._previousData, _this.graphData.previousSelectMonth, data); }, 
                    // on error
                    function (error) { return console.log("error getting previous data: " + error); }, 
                    // completed
                    function () { return _this.buildAndLoadCharts(); });
                };
                AppComponent.prototype.parseData = function (_data, _counts, dataFromService) {
                    _data = dataFromService;
                    // loop through arrays and find all LearningPathvalue and their counts (LearningPathvalue is the category of cert)
                    for (var i = 0; i < _data.d.results.length; i++) {
                        //['Mobile', 'WCC', 'Services & APIs', 'Cloud', 'DevOps'];
                        switch (_data.d.results[i].LearningPathValue) {
                            case "Mobile":
                                _counts[0]++;
                                break;
                            case "WCC":
                                _counts[1]++;
                                break;
                            case "Services & APIs":
                                _counts[2]++;
                                break;
                            case "Cloud":
                                _counts[3]++;
                                break;
                            case "DevOps":
                                _counts[4]++;
                                break;
                        }
                    }
                };
                AppComponent.prototype.buildAndLoadCharts = function () {
                    this.buildChartData();
                    this.loadBarChart();
                    this.loadPieChart();
                    $('#spin').spin(false);
                };
                AppComponent.prototype.buildSearchFilter = function () {
                    var dt_start = this.selectedYear.id + "-" + this.selectedMonth.id + "-01";
                    var dt_end = this.selectedYear.id + "-" + "0" + (parseInt(this.selectedMonth.id) + 1).toString() + "-01";
                    var protocol = "https";
                    var domain = "portal.captechventures.com";
                    var urlPath1 = "/PA/SI/_vti_bin/listdata.svc/CertificationTracking?$filter=%28DatePassed+ge+datetime%27";
                    var urlPath2 = "%27%29%20and%20%28DatePassed+lt+datetime%27";
                    var urlPath3 = "%27%29";
                    this.currentFilterUrl = protocol + "://" + domain + urlPath1 + dt_start + urlPath2 + dt_end + urlPath3;
                    //console.log("currentFilterUrl: " + this.currentFilterUrl);
                    // ---- Build the previous month query filter
                    // Getting the previous month and year
                    var previousMonthIndex = (parseInt(this.selectedMonth.id) - 2);
                    var prevMonthYearName = this.selectedYear.name;
                    // the previous month is in the same selected year
                    if (previousMonthIndex > -1) {
                        this.previousMonth = this.months[previousMonthIndex];
                        this.previousYear = this.selectedYear;
                    }
                    else {
                        // the previous month is the year before the current selected year, 
                        // so loop through the years and find its index
                        var prevYearIndex = 0;
                        for (var i = 0; i < this.years.length; i++) {
                            if (this.years[i].id == this.selectedYear.id) {
                                prevYearIndex = i + 1;
                            }
                        }
                        // if the previous year exists in our array, get the year
                        if (this.years[prevYearIndex]) {
                            this.previousYear = this.years[prevYearIndex];
                            this.ignorePreviousMonth = false;
                        }
                        else {
                            // no previous month because we have reached the base year (no data available)
                            this.ignorePreviousMonth = true;
                        }
                        var absoluteVal = Math.abs(previousMonthIndex);
                        var prevMonthIndex = 12 - absoluteVal;
                        this.previousMonth = this.months[prevMonthIndex];
                    }
                    // ------
                    var previous_dt_start = this.previousYear.id + "-" + this.previousMonth.id + "-01";
                    var previous_dt_end = this.selectedYear.id + "-" + (this.selectedMonth.id).toString() + "-01";
                    this.previousFilterUrl = protocol + "://" + domain + urlPath1 + previous_dt_start + urlPath2 + previous_dt_end + urlPath3;
                    //console.log("previousFilterUrl: " + this.previousFilterUrl);
                    //Debug only
                    // this.currentFilterUrl = "http://localhost:3000/app/certifications-mar.json";
                    // this.previousFilterUrl = "http://localhost:3000/app/certifications-feb.json";
                };
                AppComponent.prototype.getJsonArrayOfYears = function () {
                    var d = new Date();
                    var currentYear = d.getFullYear(); // current year
                    var difference = currentYear - this.baseYear;
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
                    // Here we build out the data object to display in the graph
                    var currentSelectionBarData = { "name": this.selectedMonth.name + " " + this.selectedYear.name, "data": this.graphData.currentSelectMonth };
                    this.barDataToDisplay.push(currentSelectionBarData);
                    var prevMonthBarData = { "name": this.previousMonth.name + " " + this.previousYear.name, "data": this.graphData.previousSelectMonth };
                    // only add in the previous month data if we have it.
                    if (this.ignorePreviousMonth == false) {
                        //instead of the javascript 'push' function, 
                        // use unshift, which modifies the existing array by adding the arguments to the beginning:
                        this.barDataToDisplay.unshift(prevMonthBarData);
                    }
                    // Todo: Make this dynamic and smarter.
                    // 
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
                };
                AppComponent.prototype.disableFutureMonths = function () {
                    var d = new Date();
                    var monthId = "0" + (d.getMonth() + 1).toString(); // getMonth() is 0-indexed. So add 1
                    var thisYear = d.getFullYear();
                    var monthFound = false;
                    for (var i = 0; i < this.months.length; i++) {
                        // disable future months from the drop down menu
                        if (monthFound && this.selectedYear.id == thisYear.toString()) {
                            this.months[i].disabled = true;
                        }
                        else {
                            this.months[i].disabled = false;
                        }
                        if (this.months[i].id == monthId) {
                            monthFound = true;
                        }
                    }
                    if (monthFound && this.selectedYear.id == thisYear.toString()) {
                        this.defaultToCurrentMonth();
                    }
                };
                AppComponent.prototype.defaultToCurrentMonth = function () {
                    var d = new Date();
                    var monthId = "0" + (d.getMonth() + 1).toString(); // getMonth() is 0-indexed. So add 1
                    for (var i = 0; i < this.months.length; i++) {
                        if (this.months[i].id == monthId) {
                            this.selectedMonth = this.months[i];
                        }
                    }
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
                            categories: this.learningPaths,
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
                                name: this.selectedMonth.name + ' Cert(s)',
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
                        templateUrl: 'app/app.component.html',
                        providers: [cert_service_1.CertService]
                    }), 
                    __metadata('design:paramtypes', [cert_service_1.CertService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
            $(document).ready(function () {
                // alert("jquery");
                // var el = $('#spin').spin({ color: '#333', shadow: false })
            });
        }
    }
});
//# sourceMappingURL=app.component.js.map