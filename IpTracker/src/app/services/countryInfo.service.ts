import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CountryInfoService {
  private currency: string;
  private countryName: string;
  private ip = "5.6.7.8";

  constructor(private http: HttpClient) {}

  getFixedCurrency() {
    this.trackIp(this.ip).subscribe(response => {
      this.countryName = response.countryName;
      this.getCountryInfo(this.countryName).subscribe(response => {
        this.currency = response[0].currencies[0].code;
        this.getCurrenciesRates().subscribe(response => {
          const dollarValue = response.rates.EUR / response.rates.USD;
          console.log(
            this.convertUsdToCurrency(this.currency, response, dollarValue)
          );
        });
      });
    });
  }

  trackIp(ip: string) {
    return this.http.get<{ countryName: string }>(
      `https://api.ip2country.info/ip?${ip}`
    );
  }

  getCountryInfo(countryName: string) {
    return this.http.get<any>(
      `https://restcountries.eu/rest/v2/name/${countryName}`
    );
  }

  getCurrenciesRates() {
    return this.http.get<any>(
      `http://data.fixer.io/api/latest?access_key=API_KEY`
    );
  }

  private convertUsdToCurrency(
    currency: string,
    rates: any,
    usdInEuros: number
  ) {
    const convertedCurrency = `USD in ${currency} ${rates.rates[this.currency] *
      usdInEuros}`;

    return convertedCurrency;
  }
}
