import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  // Question one
  items: string[] = [];
  newItem: string = '';
  sortDirection: string = 'asc'; // 'asc' or 'desc'


  // Question two
  @Input() stages: string[] = ['Idea', 'Development', 'Testing'];
  stagesObject: any = {};
  inputText: string = '';

  ngOnInit() {
    this.createStageObj();
  }

  // Question one
  addItem(): void {
    if (this.newItem.trim() !== '') {
      this.items.push(this.newItem.trim());
      this.newItem = '';
      this.sortItems();
    }
  }

  clearList(): void {
    this.items = [];
    this.newItem = '';
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortItems();
  }

  private sortItems(): void {
    this.items.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.localeCompare(b);
      } else {
        return b.localeCompare(a);
      }
    });
  }


  // Question Two
  createStageObj() {
    for (const stage of this.stages) {
      this.stagesObject[stage] = [];
    }
  }
  addTask(): void {
    if (this.inputText.trim() !== '') {
      if (!this.stagesObject[this.stages[0]]) {
        this.stagesObject[this.stages[0]] = [];
      }
      this.stagesObject[this.stages[0]].unshift(this.inputText.trim());
      this.inputText = '';
    }
  }
  moveforward(index: number, stage: string) {
    const currentStageIndex = this.stages.indexOf(stage);
    const item = this.stagesObject[stage].splice(index, 1);

    // Check if the item is not in the last stage
    if (currentStageIndex !== this.stages.length - 1) {
      const nextStageIndex = currentStageIndex + 1;
      const nextStage = this.stages[nextStageIndex];
      this.stagesObject[nextStage] = [item, ...this.stagesObject[nextStage]];
    }

  }
  moveBackward(index: number, stage: string) {
    const currentStageIndex = this.stages.indexOf(stage);
    const item = this.stagesObject[stage].splice(index, 1);
    // check if the item is not in the first stage
    if (currentStageIndex !== 0) {
      const nextstageIndex = currentStageIndex - 1;
      const nextStage = this.stages[nextstageIndex];
      this.stagesObject[nextStage] = [...this.stagesObject[nextStage], item];
    }
  }
}
