// sytem imports
import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http'

// custom imports
import {ReportType} from './report-type';
import {Month} from './month';
import {Year} from './year';
import {CertService} from './cert.service';

@Component({
	selector: 'my-app',
    templateUrl: 'app/app.component.html',
    providers: [CertService]
})

export class AppComponent implements OnInit  { 
    
    // --------------------------------------------- Public Properties ----------------------------------------------
    
    testGetData: string;
    testPostData: string;
    
    typeOfReports: ReportType[] = [
        { "id": "1", "name": "Certifications" },
        { "id": "2", "name": "Tech Challenges" }
    ];
    
    months: Month[] = [
      { "id": "01", "name": "January", "disabled" : false },
      { "id": "02", "name": "February", "disabled" : false },
      { "id": "03", "name": "March", "disabled" : false },
      { "id": "04", "name": "April", "disabled" : false },
      { "id": "05", "name": "May", "disabled" : false },
      { "id": "06", "name": "June", "disabled" : false },
      { "id": "07", "name": "July", "disabled" : false },
      { "id": "08", "name": "August", "disabled" : false },
      { "id": "09", "name": "September", "disabled" : false },
      { "id": "10", "name": "October", "disabled" : false },
      { "id": "11", "name": "November", "disabled" : false },
      { "id": "12", "name": "December", "disabled" : false }
    ];
    
    selectedReport: ReportType = this.typeOfReports[0]; //defaults to the certification report (The html UI select)
    selectedMonth: Month;
    previousMonth: Month = this.selectedMonth;
    baseYear = 2015;    
    years: Year[] = this.getJsonArrayOfYears();
    selectedYear: Year = this.years[0];
    previousYear: Year = this.years[0];
    currentFilterUrl: string;
    previousFilterUrl: string;
    
    // Todo: Can we get all available 'LearningPathValue' categories dynamically?
    learningPaths = ['Mobile', 'WCC', 'Services & APIs', 'Cloud', 'DevOps'];

    // array that holds all the counts for each LearningPathValue. Index order is the same as the learningPaths array.
    // ie. Mobile = currentSelectMonth[0], WCC = currentSelectMonth[1], etc.
    graphData = {
        currentSelectMonth: [0, 0, 0, 0, 0],
        previousSelectMonth: [0, 0, 0, 0, 0]
    }
    
    ignorePreviousMonth: boolean = false;
    
    barDataToDisplay = [];
    pieDataToDisplay = [];
                
   // object graph to match json response. Add more properties if needed.            
   _currentData: {
       d : {
           results : [{
               LearningPathValue: string,
               Id: string,
           }];
       }
   };
   
   _previousData: {
       d : {
           results : [{
               LearningPathValue: string,
               Id: string,
           }];
       }
   };
    
    // ------------------------------------------- Public Functions ----------------------------------------------
    
    constructor(
        private _certService: CertService) {
    }
    
    ngOnInit() {
        this.disableFutureMonths();
        if(this.selectedReport.id == "1") {
            this.getAndRenderGraphs();    
        }
    }
    
    onTestGet() {
        this._certService.getJsonTest()
        .subscribe(
            // on success...
            data => this.testGetData = JSON.stringify(data),
            // on error
            error => console.log("error getting data"),
            // completed
            () => console.log("finished getting data")
        );
    }
    
    onTestPost() {
        this._certService.postJsonTest()
            .subscribe(
                data => this.testPostData = JSON.stringify(data),
                error => console.log("error posting data"),
                () => console.log("finished getting data")
            );
    }
    
    // ------------------------------------------- Event Hander Functions ----------------------------------------------
    onSelectReport(reportId) { 
        this.selectedReport = null;
        for (var i = 0; i < this.typeOfReports.length; i++)
        {
          if (this.typeOfReports[i].id == reportId) {
            this.selectedReport = this.typeOfReports[i];
          }
        }
        
        if(this.selectedReport.id == "1") {
            this.getAndRenderGraphs();    
        }
        
    }
    
    onSelectMonth(monthId) { 
        this.selectedMonth = null;
        for (var i = 0; i < this.months.length; i++)
        {
          if (this.months[i].id == monthId) {
            this.selectedMonth = this.months[i];
          }
        }
        this.getAndRenderGraphs();
    }
    onSelectYear(yearId) { 
        this.selectedYear = null;
        for (var i = 0; i < this.years.length; i++)
        {
          if (this.years[i].id == yearId) {
            this.selectedYear = this.years[i];
          }
        }
        this.disableFutureMonths();
        this.getAndRenderGraphs();
    }
    
    onGenerateCharts() {
        this.getAndRenderGraphs();
    }
    
    // ------------------------------------------- Private Functions ----------------------------------------------
    private getAndRenderGraphs() {
        
        //var el = $('<div>').appendTo('body').spin();
        var el = $('#spin').spin({ color: '#333', shadow: false })
        
        // clear any previous data
        this.barDataToDisplay = [];
        this.pieDataToDisplay = [];
        this.graphData = {
            currentSelectMonth: [0, 0, 0, 0, 0],
            previousSelectMonth: [0, 0, 0, 0, 0]
        }
        
        this.getData();
    }
    
    private getData() {
        this.buildSearchFilter();
        
        this._certService.getCertTrackingByDate(this.currentFilterUrl)
        .subscribe(
            // on success...
            data => this.parseData(this._currentData, this.graphData.currentSelectMonth,  data),
            // on error
            error => console.log("error getting current data: " + error),
            // completed
            () => 
                // Move the request to retrieve the previous data here so that
                // it starts AFTER the current data has been retrieved. Otherwise, This 2nd query may finished before
                // the 1st current data is returned. (That causes the current month data to be missing on the graph.)
                this._certService.getCertTrackingByDate(this.previousFilterUrl)
                .subscribe(
                    // on success...
                    data => this.parseData(this._previousData, this.graphData.previousSelectMonth, data),
                    // on error
                    error => console.log("error getting previous data: " + error),
                    // completed
                    () => this.buildAndLoadCharts()
                )
        );
        
        // this._certService.getCertTrackingByDate(this.previousFilterUrl)
        // .subscribe(
        //     // on success...
        //     data => this.parseData(this._previousData, this.graphData.previousSelectMonth, data),
        //     // on error
        //     error => console.log("error getting previous data: " + error),
        //     // completed
        //     () => this.buildAndLoadCharts()
        // );
    }
    
    private parseData(_data, _counts, dataFromService) {
        _data = dataFromService;
        
        // loop through arrays and find all LearningPathvalue and their counts (LearningPathvalue is the category of cert)
        for(var i = 0; i < _data.d.results.length; i++) {
            
            //['Mobile', 'WCC', 'Services & APIs', 'Cloud', 'DevOps'];
            switch(_data.d.results[i].LearningPathValue) {
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
    }
    
    private buildAndLoadCharts() {
        this.buildChartData();
        this.loadBarChart();
        this.loadPieChart();
        $('#spin').spin(false);
    }
    
    private buildSearchFilter() {
        var dt_start : string = this.selectedYear.id + "-" + this.selectedMonth.id + "-01";
        var dt_end : string = this.selectedYear.id + "-" + "0" + (parseInt(this.selectedMonth.id) + 1).toString()  + "-01";
        var protocol : string = "https";
        var domain: string = "portal.captechventures.com";
        var urlPath1: string = "/PA/SI/_vti_bin/listdata.svc/CertificationTracking?$filter=%28DatePassed+ge+datetime%27";
        var urlPath2: string = "%27%29%20and%20%28DatePassed+lt+datetime%27";
        var urlPath3: string = "%27%29";
    
        this.currentFilterUrl = protocol + "://" + domain + urlPath1 + dt_start + urlPath2 + dt_end + urlPath3;
        //console.log("currentFilterUrl: " + this.currentFilterUrl);
        
        // ---- Build the previous month query filter
        
        // Getting the previous month and year
        var previousMonthIndex = (parseInt(this.selectedMonth.id) - 2);
        var prevMonthYearName = this.selectedYear.name;
        
        // the previous month is in the same selected year
        if(previousMonthIndex > -1) {
            this.previousMonth = this.months[previousMonthIndex];
            this.previousYear = this.selectedYear;
        } else {
            // the previous month is the year before the current selected year, 
            // so loop through the years and find its index
            var prevYearIndex = 0;
            for (var i = 0; i < this.years.length; i++)
            {
                if (this.years[i].id == this.selectedYear.id) {
                    prevYearIndex = i + 1;
                }
            }
            
            // if the previous year exists in our array, get the year
            if(this.years[prevYearIndex]) {
                this.previousYear = this.years[prevYearIndex];    
                this.ignorePreviousMonth = false;
            } else {
                // no previous month because we have reached the base year (no data available)
                this.ignorePreviousMonth = true;
            }
            
            var absoluteVal = Math.abs(previousMonthIndex);
            var prevMonthIndex = 12 - absoluteVal;
            this.previousMonth = this.months[prevMonthIndex];
        }
        
        // ------
        
        var previous_dt_start = this.previousYear.id + "-" + this.previousMonth.id + "-01";
        var previous_dt_end = this.selectedYear.id + "-" + (this.selectedMonth.id).toString()  + "-01";
        this.previousFilterUrl = protocol + "://" + domain + urlPath1 + previous_dt_start + urlPath2 + previous_dt_end + urlPath3;
        //console.log("previousFilterUrl: " + this.previousFilterUrl);
        
        //Debug only
        // this.currentFilterUrl = "http://localhost:3000/app/certifications-mar.json";
        // this.previousFilterUrl = "http://localhost:3000/app/certifications-feb.json";
    }
    
    private getJsonArrayOfYears() {
        var d = new Date();
        var currentYear = d.getFullYear(); // current year
        
        var difference = currentYear - this.baseYear;
        
        var years = [];
        // add in the current year the any previous years until the base year
        for (var index = 0; index <= difference; index++) {
            var year = currentYear - index;
            var jsonObj = {"id": year.toString(), "name": year.toString() }
            years.push(jsonObj);
        }
        return years;
    }
    
    private buildChartData() {
        
        // Here we build out the data object to display in the graph
        var currentSelectionBarData = {"name": this.selectedMonth.name + " " + this.selectedYear.name, "data": this.graphData.currentSelectMonth };
        this.barDataToDisplay.push(currentSelectionBarData);
            
        var prevMonthBarData = {"name": this.previousMonth.name + " " + this.previousYear.name, "data": this.graphData.previousSelectMonth };
        // only add in the previous month data if we have it.
        if(this.ignorePreviousMonth == false) {
            //instead of the javascript 'push' function, 
            // use unshift, which modifies the existing array by adding the arguments to the beginning:
            this.barDataToDisplay.unshift(prevMonthBarData);
        }
        
        // Todo: Make this dynamic and smarter.
        // 
        var mobilePieData = ["Mobile", this.graphData.currentSelectMonth[0]]
        this.pieDataToDisplay.push(mobilePieData);
        
        var wCCPieData = ["WCC", this.graphData.currentSelectMonth[1]]
        this.pieDataToDisplay.push(wCCPieData);
        
        var serviceApiPieData = ["Services & APIs", this.graphData.currentSelectMonth[2]]
        this.pieDataToDisplay.push(serviceApiPieData);
        
        var cloudPieData = ["Cloud", this.graphData.currentSelectMonth[3]]
        this.pieDataToDisplay.push(cloudPieData);
        
        var devOpsPieData = ["DevOps", this.graphData.currentSelectMonth[4]]
        this.pieDataToDisplay.push(devOpsPieData);
    }
    
    private disableFutureMonths() {
        var d = new Date();
        var monthId = "0" + (d.getMonth() + 1).toString(); // getMonth() is 0-indexed. So add 1
        var thisYear = d.getFullYear(); 
        var monthFound = false;
        for (var i = 0; i < this.months.length; i++)
        {
          // disable future months from the drop down menu
          if(monthFound && this.selectedYear.id == thisYear.toString()) {
            this.months[i].disabled = true;
          } else {
            this.months[i].disabled = false;
          }
          
          if (this.months[i].id == monthId) {
            monthFound = true;
          }
        }
        
        if(monthFound && this.selectedYear.id == thisYear.toString()) {
            this.defaultToCurrentMonth();
        }
    }
    
    private defaultToCurrentMonth() {
        var d = new Date();
        var monthId = "0" + (d.getMonth() + 1).toString(); // getMonth() is 0-indexed. So add 1
        for (var i = 0; i < this.months.length; i++)
        {
          if (this.months[i].id == monthId) {
            this.selectedMonth = this.months[i];
          }
        }
    }
    
    private loadBarChart() {
        
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
    }
    
    private loadPieChart() {
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
                name: this.selectedMonth.name + ' Cert(s)', //Mobile', 'WCC', 'Services & APIs', 'Cloud', 'DevOps
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
    }
    
}

$(document).ready(function(){
    // alert("jquery");
    // var el = $('#spin').spin({ color: '#333', shadow: false })
});