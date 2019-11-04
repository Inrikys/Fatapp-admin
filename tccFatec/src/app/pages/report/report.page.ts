import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { FatappCoreService } from 'src/app/services/fatapp-core/fatapp-core-service.service';
import { NavController } from '@ionic/angular';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { GlobalsService } from 'src/app/services/globals.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage {

  @ViewChild('barChart') barChart;
  @ViewChild('barChart2') barChart2;

  bars: any;
  colorArray: any;
  constructor(private apiCore: FatappCoreService, private route: ActivatedRoute,
    private global: GlobalsService,
    private navController: NavController,
    private tools: ToolsService, ) {

  }

  ionViewDidEnter() {
    this.createBarChartAttended();
    this.createBarChartNoAttended();
  }

  async createBarChartAttended() {

    if (this.route.snapshot.queryParams.id) {
      const id = await this.route.snapshot.queryParams.id;
      let activity = await this.apiCore.getActivity(id);
      if (!activity) {
        this.global.createAlert('Atividade não encontrada');
        this.navController.back();
      } else {
        let report = null;
        report = await this.apiCore.getAttendedReport(id);
        let labels = [];
        let data = [];
        console.log(report);
        for (let i = 0; i < report.length; i++) {
          labels.push(report[i].acronym);
          data.push(report[i].qtde)
        }
        this.bars = new Chart(this.barChart.nativeElement, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Inscritos que compareceram na atividade',
              data: data,
              backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
              borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      }
    }
  }

  async createBarChartNoAttended() {
    if (this.route.snapshot.queryParams.id) {
      const id = await this.route.snapshot.queryParams.id;
      let activity = await this.apiCore.getActivity(id);
      if (!activity) {
        this.global.createAlert('Atividade não encontrada');
        this.navController.back();
      } else {
        let report = null;
        report = await this.apiCore.getNoAttendedReport(id);
        let labels = [];
        let data = [];
        console.log(report);
        for (let i = 0; i < report.length; i++) {
          labels.push(report[i].acronym);
          data.push(report[i].qtde)
        }
        this.bars = new Chart(this.barChart2.nativeElement, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Inscritos que compareceram na atividade',
              data: data,
              backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
              borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      }
    }
  }
}
