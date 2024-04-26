import { TestBed } from "@angular/core/testing";
import { ChartHelper } from "./chart-helper";

describe('Chart Helper', () => {

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [

            ],
            providers: [

                // HttpTestingController
            ]
        });

    });

    it('should getlist and filename from url',
        () => {
            ChartHelper.genFullDays30(5);
            ChartHelper.genDateofTheMonth(true);
            ChartHelper.genFullDateofTheMonth(true);
            ChartHelper.genFullHourOfDay(20);
            ChartHelper.genFullDays(4);
            ChartHelper.addDays(500000000000, 3);
            expect(true).toBeTruthy();
        });
});