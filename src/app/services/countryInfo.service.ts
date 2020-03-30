import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";

const ipTrackerApiurl = environment.ipTrackerApiUrl;
const countryDataApiUrl = environment.countryDataApiUrl;
const fixerApiUrl = environment.fixerApiUrl;
const FIXER_API_KEY = environment.FIXER_API_KEY;

@Injectable({
  providedIn: "root"
})
export class CountryInfoService {
  constructor(private http: HttpClient) {}

  trackIp(ip: string) {
    return this.http.get<{ countryName: string }>(`${ipTrackerApiurl}${ip}`);
  }

  getCountryInfo(countryName: string) {
    return this.http.get<any>(`${countryDataApiUrl}${countryName}`);
  }

  getCurrenciesRates() {
    return this.http.get<any>(`${fixerApiUrl}${FIXER_API_KEY}`);
  }
}
