import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {LearnPathObj} from './learning-path-obj';
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
    
    //certJsonData: Array<any>;
    result: Object;
  
    getCertTrackingByDate(filterUrl: string) {
        filterUrl = "https://portal.captechventures.com/PA/SI/_vti_bin/listdata.svc/CertificationTracking?$filter=%28DatePassed+ge+datetime%27";
        
        // this.http.get('http://localhost:3000/certifications.json')
        //     // Call map on the response observable to get the parsed object
        //     .map(res => res.json())
        //     // Subscribe to the observable to get the parsed object and attach it to the component
        //     .subscribe(
        //         data => this.certJsonData = data
        //         // ,
        //         // err => console.log(err),
        //         // () => console.log('Complete')
        //     );
        
       // return this.certJsonData;
       
       
        // return an observable
        // return this.http.get('/certifications.json')
        // .map( (responseData) => {
        //     return responseData.json();
        // })
        // .map((learnPaths: Array<any>) => {
        //     let result:Array<LearnPathObj> = [];
        //     if (learnPaths) {
        //         learnPaths.forEach((learnPath) => {
        //         result.push(
        //             new LearnPathObj(learnPath.id, 
        //                     learnPath.learningPathValue));
        //         });
        //     }
        //     return result;
        // });
        
        
        
        // this.result = {friends:[]};
        // this._http.get('./friends.json')
        //     .map((res: Response) => res.json())
        //     .subscribe(res => this.result = res);
            
        // return this.result;
    }
    
    getCurrentTime() {
        
        //expect this json from http://date.jsontest.com
        // {
        //     "time": "03:53:25 AM",
        //     "milliseconds_since_epoch": 1362196405309,
        //     "date": "03-02-2013"
        // }
        
        // Another url to test with: http://jsonplaceholder.typicode.com/posts/1

        return this._http.get('http://date.jsontest.com')
                .map(res => res.json());
    }
    
    postJSON() {
        var json = JSON.stringify({ something: 'test', somethingElse: 3 });
        var params = 'json=' + json;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded)');
        
        return this._http.post('http://validate.jsontest.com',
            params, 
            { headers: headers}) // optinal arguments
            .map(res => res.json());
    }
  
}