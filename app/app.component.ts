import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {Http, Response} from 'angular2/http'

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
    testPostData: string
    
    months: Month[] = [
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
    
    selectedMonth: Month = this.months[0];
    previousMonth: Month = this.months[0];
    baseYear = 2015;    
    years: Year[] = this.getJsonArrayOfYears();
    selectedYear: Year = this.years[0];
    previousYear: Year = this.years[0];
    currentFilterUrl: string;
    previousFilterUrl: string;
    
    // Todo: Get all the 'LearningPathValue' categories dynamically
    learningPaths = ['Mobile', 'WCC', 'Services & APIs', 'Cloud', 'DevOps'];

    // array that holds all the counts for each LearningPathValue. Index order is the same as the learningPaths array.
    // ie. Mobile = currentSelectMonth[0], WCC = currentSelectMonth[1], etc.
    graphData = {
        currentSelectMonth: [0, 0, 0, 0, 0],
        previousSelectMonth: [0, 0, 0, 0, 0]
    }
    
    barDataToDisplay = [];
    pieDataToDisplay = [];
                
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
    
    certifcationData: Object;
    
    // ------------------------------------------- Public Functions ----------------------------------------------
    
    constructor(
        private _certService: CertService) {
    }
    
    ngOnInit() {
        this.getAndRenderGraphs();
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
    
    // -------- Event Hander Functions -------
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
        this.getAndRenderGraphs();
    }
    
    onGenerateCharts() {
        this.getAndRenderGraphs();
    }
    
    // ------------------------------------------- Private Functions ----------------------------------------------
    private getAndRenderGraphs() {
        // clear any previous data
        this.barDataToDisplay = [];
        this.pieDataToDisplay = [];
        
        this.getData();
    }
    
    private getData() {
        this.buildSearchFilter();
        
        this._certService.getCertTrackingByDate(this.currentFilterUrl)
        .subscribe(
            // on success...
            //data => this._data = data,
            //data => this.testPostData = JSON.stringify(data),
            data => this.parseData(this._currentData, this.graphData.currentSelectMonth,  data),
            // on error
            error => console.log("error getting data"),
            // completed
            () => console.log("finished getting data")
        );
        
        this._certService.getCertTrackingByDate(this.previousFilterUrl)
        .subscribe(
            // on success...
            data => this.parseData(this._previousData, this.graphData.previousSelectMonth, data),
            // on error
            error => console.log("error getting data"),
            // completed
            () => this.buildAndLoadCharts()
        );
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
        
        this.previousMonth = this.months[parseInt(this.selectedMonth.id) - 1];
        
        var prevYear = parseInt(this.selectedYear.id) - 1;
        for (var i = 0; i < this.years.length; i++)
        {
          if (this.years[i].id == prevYear.toString()) {
            this.previousYear = this.years[i];
          }
        }
        
        var previous_dt_start = this.previousYear.id + "-" + this.previousMonth.id + "-01";
        var previous_dt_end = this.previousYear.id + "-" + "0" + (parseInt(this.previousMonth.id) + 1).toString()  + "-01";
        
        this.previousFilterUrl = protocol + "://" + domain + urlPath1 + previous_dt_start + urlPath2 + previous_dt_end + urlPath3;
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
        
        // Getting the previous month and year
        var previousMonthIndex = (parseInt(this.selectedMonth.id) - 2);
        var prevMonthName = '';
        var prevMonthYearName = this.selectedYear.name;
        
        // the previous month is in the same selected year
        if(previousMonthIndex > -1) {
            prevMonthName = this.months[previousMonthIndex].name;
        } else {
            // the previous month is the year before the current selected year, so loop through the years and find it
            var prevYearIndex = 0;
            for (var i = 0; i < this.years.length; i++)
            {
                if (this.years[i].id == this.selectedYear.id) {
                    prevYearIndex = i + 1;
                }
            }
            
            // if the previous year exists in our array, get the month name
            if(this.years[prevYearIndex]) {
                prevMonthYearName = this.years[prevYearIndex].name;    
            } else {
                // no previous month because the year selected is the base year (no data available)
                this.graphData.previousSelectMonth = null;
            }
            
            var absoluteVal = Math.abs(previousMonthIndex);
            var prevMonthIndex = 12 - absoluteVal;
            prevMonthName = this.months[prevMonthIndex].name;
        }
        
        // Here we build out the data object to display in the graph
        var currentSelectionBarData = {"name": this.selectedMonth.name + " " + this.selectedYear.name, "data": this.graphData.currentSelectMonth };
        this.barDataToDisplay.push(currentSelectionBarData);
            
        var prevMonthBarData = {"name": prevMonthName + " " + prevMonthYearName, "data": this.graphData.previousSelectMonth };
        // only add in the previous month data if we have it.
        if(this.graphData.previousSelectMonth) {
            //instead of the javascript 'push' function, 
            // use unshift, which modifies the existing array by adding the arguments to the beginning:
            this.barDataToDisplay.unshift(prevMonthBarData);
        }
        
        
        // Todo: Make this dynamic and smarter.
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
                name: 'Browser share', //Mobile', 'WCC', 'Services & APIs', 'Cloud', 'DevOps
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
    //alert("jquery");
});