import { Page, expect } from "@playwright/test";

export class BookingPageV2{
    // Set object variable.
    page: Page;
    public lbl_AdultCount = "#gr-adultcount";
    public lbl_ChildCount = "#gr-childcount";
    public lbl_InfantCount = "#gr-infantcount";
    public lbl_GuestFieldName = "//label[@for='nr-guests']";
    public btn_AddAdult = "//div[@class='gr-select-guests-section guest-adults']/div/button/i[@class='fas fa-plus']";
    public btn_AddChild = "//div[@class='gr-select-guests-section guest-children']/div/button/i[@class='fas fa-plus']";
    public btn_AddInfant = "//div[@class='gr-select-guests-section guest-infants']/div/button/i[@class='fas fa-plus']";
    public btn_LessAdult = "//div[@class='gr-select-guests-section guest-adults']/div/button/i[@class='fas fa-minus']";
    public btn_LessChild = "//div[@class='gr-select-guests-section guest-children']/div/button/i[@class='fas fa-minus']";
    public btn_LessInfant = "//div[@class='gr-select-guests-section guest-infants']/div/button/i[@class='fas fa-minus']";
    // Set a sub routine that will access the functions from parent and sibling class.
    constructor(page: Page){
        this.page = page;        
    }

   

    // Step: Click Search button.
    async ClickSearch(){
        const submitSearch = this.page.getByRole('button', { name: ' Search' });      
        await submitSearch.click()
        
    }

    async SetNumberOfGuests(adult: number, child: number, infant: number){
        await this.page.locator('#search-guests-text').click();
       
        var adultCount = await this.page.$eval<string, HTMLSelectElement>(this.lbl_AdultCount, ele => ele.value);
        var childCount = await this.page.$eval<string, HTMLSelectElement>(this.lbl_ChildCount, ele => ele.value);
        var infantCount = await this.page.$eval<string, HTMLSelectElement>(this.lbl_InfantCount, ele => ele.value);

        var addAdult = 0, addChild = 0, addInfant = 0;
        var lessAdult = 0, lessChild = 0, lessInfant = 0;
        
        // Add or reduce adult.
        if(parseInt(adultCount) <= adult){
            addAdult = adult - parseInt(adultCount);
            for(var i=1; i<=addAdult; i++){
                await this.page.click(this.btn_AddAdult);
            }
        }
        else{
            if(parseInt(adultCount) > 1){
                lessAdult = parseInt(adultCount) - adult;
                for(var i=1; i<=lessAdult; i++){
                    await this.page.click(this.btn_LessAdult);
                }
            }
        }

        // Add or reduce child.
        if(parseInt(childCount) <= child){
            addChild = child - parseInt(childCount);
            for(var i=1; i<=addChild; i++){
                await this.page.click(this.btn_AddChild);
            }
        }
        else{
            if(parseInt(childCount) > 0){
                lessChild = parseInt(childCount) - child;
                for(var i=1; i<=lessChild; i++){
                    await this.page.click(this.btn_LessChild);
                }
            }
        }

        // Add or reduce infant.
        if(parseInt(infantCount) <= infant){
            var addInfant = infant - parseInt(infantCount);
            for(var i=1; i<=addInfant; i++){
                await this.page.click(this.btn_AddInfant);
            }
        }
        else{
            if(parseInt(infantCount) > 0){
                lessInfant = parseInt(infantCount) - infant;
                for(var i=1; i<=lessInfant; i++){
                    await this.page.click(this.btn_LessInfant);
                }
            }
        }

        await this.page.click(this.lbl_GuestFieldName);
       
    }

}