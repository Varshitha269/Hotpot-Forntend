import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Chart, registerables, ChartConfiguration } from 'chart.js';
import { ReportService } from '../service/report.service';
import { MenuItem, User } from '../model/datastructure';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [FormsModule, CommonModule, CurrencyPipe],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportComponent implements OnInit {
  restaurantId = 1; // Set your restaurant ID dynamically as needed
  vegItems: MenuItem[] = [];
  nonVegItems: MenuItem[] = [];
  totalCategories: number = 0;
  totalMenuItems: number = 0;
  totalOrders: number = 0;
  totalRevenue: number = 0;
  avgOrderValue: number = 0;
  topSellingItems: MenuItem[] = [];
  leastSellingItems: MenuItem[] = [];
  regularUsers: User[] = [];

  // Chart Data
  barChart!: Chart<'bar'>;
  pieChart!: Chart<'pie'>;
  lineChart: Chart<'line'> | null = null;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getVegItems();
    this.getNonVegItems();
    this.getTotalMenuItems();
    this.getTotalOrders();
    this.getTotalRevenue();
    this.getAverageOrderValue();
    this.getRegularUsers();
    this.getTopSellingItems();
    this.getLeastSellingItems();

    // Register Chart.js components
    Chart.register(...registerables);
  }

  getVegItems(): void {
    this.reportService.getVegItems(this.restaurantId).subscribe((data) => {
      this.vegItems = data;
      this.updateBarChart();
    });
  }

  getNonVegItems(): void {
    this.reportService.getNonVegItems(this.restaurantId).subscribe((data) => {
      this.nonVegItems = data;
      this.updateBarChart();
    });
  }

  getTotalMenuItems(): void {
    this.reportService.getTotalMenuItems(this.restaurantId).subscribe((data) => {
      this.totalMenuItems = data;
    });
  }

  getTotalOrders(): void {
    this.reportService.getTotalOrders(this.restaurantId).subscribe((data) => {
      this.totalOrders = data;
      this.updatePieChart();
    });
  }

  getTotalRevenue(): void {
    this.reportService.getTotalRevenue(this.restaurantId).subscribe((data) => {
      this.totalRevenue = data;
      this.updatePieChart();
    });
  }

  getAverageOrderValue(): void {
    this.reportService.getAverageOrderValue(this.restaurantId).subscribe((data) => {
      this.avgOrderValue = data;
      this.updateLineChart();
    });
  }

  getTopSellingItems(): void {
    this.reportService.getTopSellingItems(this.restaurantId,5).subscribe((data) => {
      this.topSellingItems = data;
    });
  }

  getLeastSellingItems(): void {
    this.reportService.getLeastSellingItems(this.restaurantId,5).subscribe((data) => {
      this.leastSellingItems = data;
    });
  }

  getRegularUsers(): void {
    this.reportService.getRegularUsers(this.restaurantId, 5).subscribe((data) => {
      this.regularUsers = data;
    });
  }

  // Update the charts after fetching data
  updateBarChart(): void {
    const vegCount = this.vegItems.length;
    const nonVegCount = this.nonVegItems.length;

    // Create or update bar chart
    if (this.barChart) {
      if (this.barChart.data.datasets && this.barChart.data.datasets.length > 0) {
        this.barChart.data.datasets[0].data = [vegCount, nonVegCount];
        this.barChart.update();
      }
    } else {
      const barChartConfig: ChartConfiguration<'bar'> = {
        type: 'bar',
        data: {
          labels: ['Veg Items', 'Non-Veg Items'],
          datasets: [{
            label: 'Number of Items',
            data: [vegCount, nonVegCount],
            backgroundColor: ['#42A5F5', '#FFA726'],
          }]
        },
        options: {
          responsive: true,
        }
      };
      this.barChart = new Chart('barChart', barChartConfig);
    }
  }

  updatePieChart(): void {
    // Create or update pie chart
    if (this.pieChart) {
      if (this.pieChart.data.datasets && this.pieChart.data.datasets.length > 0) {
        this.pieChart.data.datasets[0].data = [this.totalOrders, this.totalRevenue];
        this.pieChart.update();
      }
    } else {
      const pieChartConfig: ChartConfiguration<'pie'> = {
        type: 'pie',
        data: {
          labels: ['Total Orders', 'Total Revenue'],
          datasets: [{
            data: [this.totalOrders, this.totalRevenue],
            backgroundColor: ['#66BB6A', '#EF5350'],
          }]
        },
        options: {
          responsive: true,
        }
      };
      this.pieChart = new Chart('pieChart', pieChartConfig);
    }
  }

  updateLineChart(): void {
    // Create or update line chart
    if (this.lineChart) {
      if (this.lineChart.data.labels && this.lineChart.data.datasets && this.lineChart.data.datasets.length > 0) {
        this.lineChart.data.labels.push(`Order ${this.lineChart.data.labels.length + 1}`);
        this.lineChart.data.datasets[0].data.push(this.avgOrderValue);
        this.lineChart.update();
      }
    } else {
      const lineChartConfig: ChartConfiguration<'line'> = {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Average Order Value',
            data: [],
            borderColor: '#FF7043',
            fill: false,
          }]
        },
        options: {
          responsive: true,
        }
      };
      this.lineChart = new Chart('lineChart', lineChartConfig);
    }
  }
}
