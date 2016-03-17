export class LearnPathObj {
    id: number;
    learningPathValue: string;
    
    constructor(id: number, 
                learningPathValue: string) {
      this.id = id;
      this.learningPathValue = learningPathValue;
    }
    
    // id: number;
    // description: string;
    // dueDate: Date;
    // complete: boolean;
    // completedDate: Date;
    
    // constructor(id: number, 
    //             description: string,
    //             dueDate: Date,
    //             complete: boolean) {
    //   this.id = id;
    //   this.description = description;
    //   this.dueDate = dueDate;
    //   this.complete = complete;
    // }
    
    // setComplete() {
    //   this.complete = true;
    //   this.completedDate = new Date();
    // }
  }