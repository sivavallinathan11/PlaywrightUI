import { Page, errors, expect } from "@playwright/test";
import { AccommodationDetails, CustomerDetails, OfferDetails } from "../data/bookings";
import { DataSetup } from "../data/datasetup";
import { TestDirectory } from "../data/directory";
import { ExistingGuestSearch, MembershipDiscount, MembershipFee, TestingEnvironment, URL } from "../data/users";
import { Common } from "./Common";
import { EditBookingModal } from "./EditBookingModal";
import { EditBookingPage} from "./EditBookingPage";
import exp from "constants";

export class BookingPageV2 extends Common{
    // Set object variable.
    readonly page: Page;
    readonly dir: TestDirectory;
    public dataSetup = new DataSetup();

    // Set a sub routine that will access the functions from parent and sibling class.
    constructor(page: Page, dir: TestDirectory){
        super(page, dir);
        this.page = page;
        this.dir = dir;
    }

   

    // Step: Click Search button.
    async ClickSearch(){
        const submitSearch = this.page.getByRole('button', { name: ' Search' });
        await expect(submitSearch).not.toHaveClass('nr-cta-blue disabled')
        
        await submitSearch.click()
        
    }

}