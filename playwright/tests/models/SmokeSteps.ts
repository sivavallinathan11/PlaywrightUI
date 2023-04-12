import { errors, Page } from "@playwright/test";
import { Common } from "./Common";
import { createGroupReservationWithMember, createGroupReservationWithNonMember, UpdateUser } from "../data/users";
import { DataSetup } from "../data/datasetup";
import { TestDirectory } from "../data/directory";

export class SmokeSteps extends Common{
    readonly page: Page;
    public dataSetup = new DataSetup();

    constructor(page: Page, dir: TestDirectory){
        super(page, dir);
        this.page = page;
    }

  // This will get and return specific user details.
  async getUserDetails(userType: string){
    try{
      var details: any;
      if(userType.toLowerCase()=="update user"){
          details = UpdateUser;
      }
      return details;
    }
    catch(e){
      await this.ScreenShot("Failed", false, e.stack);
      if(e instanceof errors.TimeoutError){
        throw new Error(e.stack);
      }
      else{
        throw new Error(e.stack);
      }
    }
  }

  // This will wait for loading icon to disappear.
  async waitForLoadingIconToDisappear(){
    try{
      if(await this.elementExist("//div[@class='spinner']", 10000)){
          await this.waitForElementToBeHidden("//div[@class='spinner']");
      }
    }
    catch(e){
      await this.ScreenShot("Failed", false, e.stack);
      if(e instanceof errors.TimeoutError){
        throw new Error(e.stack);
      }
      else{
        throw new Error(e.stack);
      }
    }
  }

  // This generate random email
  async generateRandomEmail(initialName: string, domainType: string, stringType: string, stringSize: number){
    try{
      var randomString = await this.generateRandomString(stringType, stringSize);
      return initialName + randomString + domainType;
    }
    catch(e){
      await this.ScreenShot("Failed", false, e.stack);
      if(e instanceof errors.TimeoutError){
        throw new Error(e.stack);
      }
      else{
        throw new Error(e.stack);
      }
    }
  }

  // This generate random string or alphanumeric string.
  async generateRandomString(stringType: string, stringSize: number){
    try{
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      var numbers = "1234567890";
      var numbersLength = numbers.length;
      var charactersLength = characters.length;
      if(stringType.toLocaleLowerCase().trim() == "string"){
        for(var i = 0; i < stringSize; i++){
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
      }
      else if(stringType.toLocaleLowerCase().trim() == "number"){
        for(var i = 0; i < stringSize; i++){
          result += numbers.charAt(Math.floor(Math.random() * numbersLength));
        }
      }
      else{
        var stringLength = (stringSize - Math.floor(stringSize/2)) + 1;
        var numberLength = Math.floor(stringSize/2) - 1;
        for(var a = 0; a < stringLength; a++){
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
  
        for(var b = 0; b < numberLength; b++){
          result += numbers.charAt(Math.floor(Math.random() * numbersLength));
        }
      }
  
      return result;
    }
    catch(e){
      await this.ScreenShot("Failed", false, e.stack);
      if(e instanceof errors.TimeoutError){
        throw new Error(e.stack);
      }
      else{
        throw new Error(e.stack);
      }
    }
  } 

  // This will set the email and phone to a variable.
  async SetOtherGroupBookingDetails(customerType: string){
    try{
      var email: any;
      var phone: any;
      if(customerType.toLowerCase().trim()=="member"){
        var details = createGroupReservationWithMember;
        email = details.email;
        phone = details.phone;
      }
      else{
        var details = createGroupReservationWithNonMember;
      }
  
      var emailSet = [email, email];
      var phoneSet = [phone, phone];
      var groupDetailSet = [emailSet, phoneSet];
  
      return groupDetailSet;
    }
    catch(e){
      await this.ScreenShot("Failed", false, e.stack);
      if(e instanceof errors.TimeoutError){
        throw new Error(e.stack);
      }
      else{
        throw new Error(e.stack);
      }
    }
  }

  async SetFilterDate(checkIn: number = 0, checkOut: number = 1){
    try{
      var initialCheckIn = new Date();
      initialCheckIn.setDate(initialCheckIn.getDate() + checkIn);
      var setDay = initialCheckIn.getDate();
      var setMonth = initialCheckIn.toLocaleDateString('en-GB', {month: 'short'});
      var setYear = initialCheckIn.toLocaleDateString('en-GB', {year: 'numeric'});
      var getDay;
      if(setDay<10){
      getDay = "0"+setDay;
      }
      else{
      getDay = setDay.toString();
      }
      var checkInDate = getDay + " " + setMonth.replace(',','') + " " + setYear;
  
      var initialCheckOut = new Date();
      initialCheckOut.setDate(initialCheckOut.getDate() + checkOut);
      var setDay = initialCheckOut.getDate();
      var setMonth = initialCheckOut.toLocaleDateString('en-GB', {month: 'short'});
      var setYear = initialCheckOut.toLocaleDateString('en-GB', {year: 'numeric'});
      var getDay;
      if(setDay<10){
      getDay = "0"+setDay;
      }
      else{
      getDay = setDay.toString();
      }
      var checkOutDate = getDay + " " + setMonth.replace(',','') + " " + setYear;
      var filterDate = (checkInDate +" - "+ checkOutDate).toString().trim();
      return filterDate;
    }
    catch(e){
      await this.ScreenShot("Failed", false, e.stack);
      if(e instanceof errors.TimeoutError){
        throw new Error(e.stack);
      }
      else{
        throw new Error(e.stack);
      }
    }
  }

  async FormatFilterDate(checkIn: number = 0, checkOut: number = 1){
    try{
      var initialCheckIn = new Date();
      initialCheckIn.setDate(initialCheckIn.getDate() + checkIn);
      var setDay = initialCheckIn.getDate();
      var setMonth = initialCheckIn.toLocaleDateString('en-GB', {month: 'short'});
      var setYear = initialCheckIn.toLocaleDateString('en-GB', {year: 'numeric'});
      var getDay;
      if(setDay<10){
      getDay = "0"+setDay;
      }
      else{
      getDay = setDay.toString();
      }
      var checkInDate = getDay + " " + setMonth.replace(',','') + " " + setYear;
  
      var initialCheckOut = new Date();
      initialCheckOut.setDate(initialCheckOut.getDate() + checkOut);
      var setDay = initialCheckOut.getDate();
      var setMonth = initialCheckOut.toLocaleDateString('en-GB', {month: 'short'});
      var setYear = initialCheckOut.toLocaleDateString('en-GB', {year: 'numeric'});
      var getDay;
      if(setDay<10){
      getDay = "0"+setDay;
      }
      else{
      getDay = setDay.toString();
      }
      var checkOutDate = getDay + " " + setMonth.replace(',','') + " " + setYear;
      return [checkInDate, checkOutDate];
    }
    catch(e){
      await this.ScreenShot("Failed", false, e.stack);
      if(e instanceof errors.TimeoutError){
        throw new Error(e.stack);
      }
      else{
        throw new Error(e.stack);
      }
    }
  }

  // This will set random delays to prevent duplicate reservation in 1 unit in RMS.
  async SetRandomSleep(){
    try{
      // Set list of time in milliseconds.
      var waitType = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
      var randomIndex = Math.floor(Math.random() * waitType.length);
      var time: any = [];
      switch(waitType[randomIndex]){
        case 1:
          time = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
          break;
        case 2:
          time = [10000, 20000, 30000];
          break;
        case 3:
          time = [3000, 6000, 9000, 12000, 15000, 18000, 21000];
          break;
        case 4:
          time = [5000, 10000, 15000, 20000, 25000, 30000];
          break;
        case 5:
          time = [2000, 4000, 6000, 4000, 8000, 10000, 12000, 14000];
          break;
        case 6:
          time = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
          break;
        case 7:
          time = [10000, 20000, 30000];
          break;
        case 8:
          time = [5000, 10000, 15000, 20000, 25000, 30000];
          break;
        case 9:
          time = [3000, 6000, 9000, 12000, 15000, 18000, 21000];
          break;
        case 10:
          time = [10000, 20000, 30000];
          break;
        case 11:
          time = [5000, 10000, 15000, 20000, 25000, 30000];
          break;
        case 12:
          time = [2000, 4000, 6000, 4000, 8000, 10000, 12000, 14000];
          break;
        case 13:
          time = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];
          break;
      }
  
      // Get the random time from the list
      var randomIndex = Math.floor(Math.random() * time.length);
      await this.sleep(time[randomIndex]);
    }
    catch(e){
      await this.ScreenShot("Failed", false, e.stack);
      if(e instanceof errors.TimeoutError){
        throw new Error(e.stack);
      }
      else{
        throw new Error(e.stack);
      }
    }
  }

  // Set thread sleep.
  async sleep(ms: number){
    try{
      const promise = await new Promise(resolve => setTimeout(resolve, ms));
      return promise;
    }
    catch(e){
      await this.ScreenShot("Failed", false, e.stack);
      if(e instanceof errors.TimeoutError){
        throw new Error(e.stack);
      }
      else{
        throw new Error(e.stack);
      }
    }
  }
}