import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser'

import {Month} from './month';
import {Year} from './year';

@Component({
	selector: 'my-app',
	//template: '<h1>My First Angular 2 App</h1>'
    templateUrl: 'app/app.component.html'
})

export class AppComponent implements OnInit  { 
    
    ngOnInit() {
        loadBarChart();
    }

    months: Month[] = [
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
    
    selectedMonth: Month = this.months[0];
    
    years: Year[] = getJsonArrayOfYears();
    selectedYear: Year = this.years[0];
    
    dt_start : string = this.selectedYear.id + "-" + this.selectedMonth.id + "-01";
    dt_end : string = this.selectedYear.id + "-" + "0" + (parseInt(this.selectedMonth.id) + 1).toString()  + "-01";
    protocol : string = "https";
    domain: string = "portal.captechventures.com";
    urlPath1: string = "/PA/SI/_vti_bin/listdata.svc/CertificationTracking?$filter=%28DatePassed+ge+datetime%27";
    urlPath2: string = "%27%29%20and%20%28DatePassed+lt+datetime%27";
    urlPath3: string = "%27%29";
    
    certFilterUrl: string = this.protocol + "://" + this.domain + this.urlPath1 + this.dt_start + this.urlPath2 + this.dt_end + this.urlPath3;
    
    // Event Hander Functions----
    onSelectMonth(monthId) { 
        this.selectedMonth = null;
        for (var i = 0; i < this.months.length; i++)
        {
          if (this.months[i].id == monthId) {
            this.selectedMonth = this.months[i];
          }
        }
        this.buildSearchFilter();
    }
    onSelectYear(yearId) { 
        this.selectedYear = null;
        for (var i = 0; i < this.years.length; i++)
        {
          if (this.years[i].id == yearId) {
            this.selectedYear = this.years[i];
          }
        }
        this.buildSearchFilter();
    }
    
    // Private Functions
    private buildSearchFilter() {
        this.dt_start = this.selectedYear.id + "-" + this.selectedMonth.id + "-01";
        this.dt_end = this.selectedYear.id + "-" + "0" + (parseInt(this.selectedMonth.id) + 1).toString()  + "-01";        
        this.certFilterUrl = this.protocol + "://" + this.domain + this.urlPath1 + this.dt_start + this.urlPath2 + this.dt_end + this.urlPath3;
    }
    
    
    
}

function getJsonArrayOfYears() {
    var d = new Date();
    var currentYear = d.getFullYear(); // current year
    
    var baseYear = 2015;
    var difference = currentYear - baseYear;
    
    var years = [];
    // add in the current year the any previous years until the base year
    for (var index = 0; index <= difference; index++) {
        var year = currentYear - index;
        var jsonObj = {"id": year.toString(), "name": year.toString() }
        years.push(jsonObj);
    }
    
    return years;
        
}

function loadBarChart() {
    $('#bargraphContainer').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Certifications by Learning Path'
        },
        subtitle: {
            text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
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
                text: 'Population (millions)',
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
        series: [{
            name: 'Year 1800',
            data: [107, 31, 635, 203, 2]
        }, {
            name: 'Year 1900',
            data: [133, 156, 947, 408, 6]
        }, {
            name: 'Year 2012',
            data: [1052, 954, 4250, 740, 38]
        }]
    });
}

$(document).ready(function(){
    //alert("jquery");
});