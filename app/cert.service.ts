import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

// note: If you are geting this error in CHROME:
// No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access.
// add the extension in google chrome to allow access using CORS
// https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en-US)

// It is a "best practice" to apply the @Injectable() decorator ​from the start​ both for consistency and for future-proofing.
// HTTP calls in Angular 2 by default return observables through RxJS, whereas $http in Angular 1.x returns promises
// Observables = Promises + Events
@Injectable()
export class CertService {
    
    // we're passing Http to the constructor so that we can use it in our class methods.
    constructor(private _http: Http) {
        console.log('Service created.', _http);
    }
    
    getCertTrackingByDate(filterUrl: string) {
        filterUrl = "https://portal.captechventures.com/PA/SI/_vti_bin/listdata.svc/CertificationTracking?$filter=%28DatePassed+ge+datetime%27";
        
        return this._http.get('http://localhost:3000/app/certifications.json')
                .map(res => res.json());
    }
    
    getJsonTest() {
        
        //expect this json from http://date.jsontest.com
        // {
        //     "time": "03:53:25 AM",
        //     "milliseconds_since_epoch": 1362196405309,
        //     "date": "03-02-2013"
        // }
        
        // Another url to test with: http://jsonplaceholder.typicode.com/posts/1

        return this._http.get('http://localhost:3000/app/friends.json')
                .map(res => res.json());
    }
    
    postJsonTest() {
        var json = JSON.stringify({ something: 'test', somethingElse: 3 });
        var params = 'json=' + json;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded)');
        
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        
        return this._http.post('http://validate.jsontest.com',
            params, 
            { headers: headers}) // optinal arguments
            .map(res => res.json());
    }
  
}