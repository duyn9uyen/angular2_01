//This is to have jquery support with Type script.
// http://blog.brunger.me.uk/2013/01/simple-visual-studio-typescript-html.html
// class Greeter {
//     element: JQuery;
//     span: JQuery;
//     timerToken: number;
//     constructor(element: JQuery) {
//         this.element = element;
//         this.element.text("The time is: ");
//         this.span = $('<span>');
//         this.element.append(this.span);
//         this.span.text(new Date().toUTCString());
//     }
//     start() {
//         this.timerToken = setInterval(() => {
//             this.span.text(new Date().toUTCString());
//         }, 500);
//     }
//     stop() {
//         clearTimeout(this.timerToken);
//     }
// }
// $(() => {
//     var el = $("#content");
//     var greeter = new Greeter(el);
//     greeter.start();
// }); 
//# sourceMappingURL=app.js.map