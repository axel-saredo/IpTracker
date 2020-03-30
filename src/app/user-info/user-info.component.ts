import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CountryInfoService } from "../services/countryInfo.service";
import { MatDialog } from "@angular/material/dialog";
import { CountryInfoComponent } from "../country-info/country-info.component";

import { getLocalTime } from "../utils/local-time.calculator";
import { getDistanceToBuenosAiresInKm } from "../utils/distance-to-bs.calculator";
import { getDollarPriceInCurrency } from "../utils/usd-to-currency.convertor";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.css"]
})
export class UserInfoComponent implements OnInit {
  userName: string;
  ipAddress: string;
  formIsSubmitted: boolean;
  isLoading = false;

  private countryName: string;
  private countryIsoCode: string;
  private countryLanguages: string[] = [];
  private countryLocalTimes: string[] = [];
  private distanceToBuenosAires: string;
  private countryCurrency: string;
  private dollarPriceInCountryCurrency: string;

  constructor(
    private countryInfoService: CountryInfoService,
    public dialog: MatDialog
  ) {}

  showCountryInfo(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;

    this.formIsSubmitted = true;

    const ipAddress = form.value.ipAddress;

    this.countryInfoService.trackIp(ipAddress).subscribe(response => {
      this.countryName = response.countryName;

      this.countryInfoService
        .getCountryInfo(this.countryName)
        .subscribe(response => {
          this.countryIsoCode = response[0].alpha3Code;

          const languages = response[0].languages;
          languages.forEach((language: any) =>
            this.countryLanguages.push(language.name)
          );

          const countryTimezones = response[0].timezones;
          countryTimezones.forEach((timezone: string) => {
            const offset = timezone.substr(3, 3);
            let countryLocalTime = getLocalTime(offset);
            this.countryLocalTimes.push(countryLocalTime);
          });

          const countryLatitude = response[0].latlng[0];
          const countryLongitude = response[0].latlng[1];
          this.distanceToBuenosAires = getDistanceToBuenosAiresInKm(
            countryLatitude,
            countryLongitude
          );

          this.countryCurrency = response[0].currencies[0].code;

          this.countryInfoService.getCurrenciesRates().subscribe(response => {
            const dollarValue = response.rates.EUR / response.rates.USD;
            this.dollarPriceInCountryCurrency =
              getDollarPriceInCurrency(
                this.countryCurrency,
                response,
                dollarValue
              ) +
              " " +
              this.countryCurrency;

            this.dialog.afterOpened.subscribe(_ => (this.isLoading = false));

            this.dialog.open(CountryInfoComponent, {
              data: {
                country: this.countryName,
                countryIsoCode: this.countryIsoCode,
                languages: this.countryLanguages,
                localtimes: this.countryLocalTimes,
                localTimes: this.countryLocalTimes,
                distanceToBs: this.distanceToBuenosAires,
                dollarPrice: this.dollarPriceInCountryCurrency
              }
            });

            this.dialog.afterAllClosed.subscribe(_ => {
              this.formIsSubmitted = false;
              this.countryLanguages = [];
              this.countryLocalTimes = [];
            });
          });
        });
    });
  }

  ngOnInit() {}
}
