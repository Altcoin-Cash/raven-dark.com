import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ApiService } from '../../services/api.service'

type Status = {
  version: number
  protocolversion: number
  walletversion: number
  blocks: number
  timeoffset: number
  connections: number
  proxy: string
  difficulty: number
  testnet: boolean
  relayfee: number
  errors: string
  network: string
  reward: number
}

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.scss']
})
export class BasicsComponent implements OnInit, AfterViewInit {

  status: Status
  powReward: number = 0;
  mnReward: number = 0;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getStatus()
  }

  getStatus() {
    this.apiService.getData('http://explorer.raven-dark.com/api/status')
    .subscribe((result: any) => {
      this.status = result.info
      this.status.reward = this.status.reward / 10**8
      this.powReward = this.status.reward * .85
      this.mnReward = this.status.reward * .15
    })
  }

}
