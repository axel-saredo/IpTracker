import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-country-info",
  templateUrl: "./country-info.component.html",
  styleUrls: ["./country-info.component.css"]
})
export class CountryInfoComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { country: string }) {}

  ngOnInit() {}
}
