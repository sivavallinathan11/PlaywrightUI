import { ResultsDirectory, TestScriptDirectory } from "../data/users";
import { TestDirectory } from "../data/directory";
import { errors } from "@playwright/test";

export class BaseSteps{

    // Set Directory Date to add to test script artifact file name.
    async SetDirectoryDate(){
      try{
        var bookingDate = new Date();
        bookingDate.setDate(bookingDate.getDate() + 0);
        var newDate = bookingDate.toISOString();
        do{
            newDate = newDate.replace(':', '_').split('.')[0];
        }while(newDate.includes(':'));
    
        do{
          newDate = newDate.replace('-', '_');
        }while(newDate.includes('-'));
    
        return newDate.replace('T','_');
      }
      catch(e){
        if(e instanceof errors.TimeoutError){
          throw new Error(e.stack);
        }
        else{
          throw new Error(e.stack);
        }
      }
    }
  
    // Initialize Test Result Directories.
    async InitializeTestResultDirectory(testName: string){
      try{
        // Set date for each test result.
        var formatDate = await this.SetDirectoryDate();

        // Set result path default to RC3.
        var resultPath = ResultsDirectory.RC3;

        // Change result path based on assigned test script directory.
        if(TestScriptDirectory.Path.includes('RC4')){
          resultPath = ResultsDirectory.RC4;
        }
        else if(TestScriptDirectory.Path.includes('RC5')){
          resultPath = ResultsDirectory.RC5;
        }
        else if(TestScriptDirectory.Path.toLowerCase().includes('temprc3')){
          resultPath = ResultsDirectory.TempRC3;
        }

        // Assign directory.
        var passedDirectory = resultPath + "/Passed_" +  testName + "_" + formatDate;
        var failedDirectory = resultPath + "/Failed_" +  testName + "_" + formatDate;
        var test = new TestDirectory();
        test.PassedDirectory = passedDirectory;
        test.FailedDirectory = failedDirectory;
        return test;
      }
      catch(e){
        if(e instanceof errors.TimeoutError){
          throw new Error("Unable to create directory.\nMessage: " + e.stack);
        }
        else{
          throw new Error("Unable to create directory.\nMessage: " + e.stack);
        }
      }
    }
}