import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-modal',
  standalone: true,
  imports: [MatDialogModule, MatProgressSpinnerModule],
  template: `
    <div class="flex flex-col items-center justify-center p-6">
      <mat-spinner diameter="60"></mat-spinner>
      <p class="text-gray-200 mt-4 text-lg">Processando...</p>
    </div>
  `
})
export class LoadingModal {}