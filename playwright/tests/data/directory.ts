export class TestDirectory{
    // Set Directory.
    public passedTestDirectory = "";
    public failedTestDirectory = "";
    
    // Set Passed Directory.
    get PassedDirectory(){
        return this.passedTestDirectory;
    }
    set PassedDirectory(data: string){
        this.passedTestDirectory = data;
    }

    // Set Failed Directory.
    get FailedDirectory(){
        return this.failedTestDirectory;
    }
    set FailedDirectory(data: string){
        this.failedTestDirectory = data;
    }
}