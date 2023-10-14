import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'line'>['data'] = {
    labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept'], //, 'Oct', 'Nov', 'Dec'
    datasets: [
      { data: [ 21, 22, 23, 23, 25, 27, 28, 28, 29 ], label: 'Cow: #001' },
      { data: [ 25, 26, 27, 28, 30, 31, 32, 31, 32  ], label: 'Cow: #002' },
      { data: [ 22, 23, 24, 26, 27, 28, 30, 30, 31  ], label: 'Cow: #003' },
      { data: [ 24, 25, 26, 25, 26, 27, 28, 29, 29 ], label: 'Cow: #004' },
      { data: [ 27, 28, 29, 30, 31, 32, 32, 33, 34  ], label: 'Cow: #005' },
      { data: [ 28, 29, 30, 31, 32, 33, 33, 33, 33  ], label: 'Cow: #006' }
    ]
  };

  public barChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
  };
}
