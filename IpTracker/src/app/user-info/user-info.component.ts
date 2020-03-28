import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { CountryInfoService } from "../services/countryInfo.service";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CountryInfoComponent } from "../country-info/country-info.component";

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.css"]
})
export class UserInfoComponent implements OnInit {
  userName: string;
  ipAddress: string;
  countryName: string;

  constructor(
    private countryInfoService: CountryInfoService,
    public dialog: MatDialog
  ) {}

  showCountryInfo(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const ipAddress = form.value.ipAddress;
    this.countryInfoService.trackIp(ipAddress).subscribe(response => {
      this.countryName = response.countryName;
      this.dialog.open(CountryInfoComponent, {
        data: {
          country: this.countryName
        }
      });
    });
  }

  ngOnInit() {}
}
