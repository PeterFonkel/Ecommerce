import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-esqueleto",
  templateUrl: "./esqueleto.component.html",
  styles: [],
})
export class EsqueletoComponent implements OnInit {
  private urlEndPoint: string = environment.urlAPI;
  constructor(private http: HttpClient) {}

  ngOnInit() {
  }
}
