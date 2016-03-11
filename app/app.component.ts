import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser'

import {Month} from './month';
import {Year} from './year';

@Component({
	selector: 'my-app',
	//template: '<h1>My First Angular 2 App</h1>'
    templateUrl: 'app/app.component.html'
})


        
        
export class AppComponent { 

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
    
    onSelect(monthId) { 
        this.selectedMonth = null;
        for (var i = 0; i < this.months.length; i++)
        {
          if (this.months[i].id == monthId) {
            this.selectedMonth = this.months[i];
          }
        }
    }
    
    years: Year[] = getJsonArrayOfYears();
    
}

function getJsonArrayOfYears() {
    var d = new Date();
    var currentYear = d.getFullYear(); // current year
    
    var baseYear = 2015;
    var difference = currentYear - baseYear;
    
    var years = [];
    // add in the base year up to the current year
    for (var index = 0; index <= difference; index++) {
        var year = baseYear + index;
        var jsonObj = {"id": year.toString(), "name": year.toString() }
        years.push(jsonObj);
    }
    
    return years;
        
}