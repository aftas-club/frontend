import {Component, OnInit} from '@angular/core';
import {AdminLayoutComponent} from "../../layout/admin-layout/admin-layout.component";
import {OceanComponent} from "../../shared/ocean/ocean.component";
import {MemberService} from "../../core/services/member.service";
import {MemberTableComponent} from "../../components/member-table/member-table.component";

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [
    AdminLayoutComponent,
    OceanComponent,
    MemberTableComponent
  ],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent implements OnInit {

  constructor(public service: MemberService) {
  }

  ngOnInit(): void {
  }
}
