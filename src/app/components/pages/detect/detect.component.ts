import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ServerService } from 'src/app/services/api/server.service';

@Component({
  selector: 'app-detect',
  templateUrl: './detect.component.html',
  styleUrls: ['./detect.component.css'],
})
export class DetectComponent implements AfterViewInit {
  @ViewChild('file') fileEle!: ElementRef;
  imgUrl: string = '';
  file!: File;
  show: boolean = false;

  diseaseOutput = {
    healthy: false,
    disease: true,
    diseaseName: '',
    noConclusion: false,
  };

  maturityOutput = {
    show: false,
    ripeness: '',
  };

  constructor(private server: ServerService) {}

  ngAfterViewInit(): void {
    this.file = this.fileEle.nativeElement.files[0];
  }

  updateFile() {
    this.show = false;
    this.maturityOutput.show = false;
    this.diseaseOutput.disease = false;
    this.diseaseOutput.healthy = false;
    this.diseaseOutput.noConclusion = false;
    this.file = this.fileEle.nativeElement.files[0];
    const f = this.file;
    if (f) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgUrl = e.target.result;
      };
      reader.readAsDataURL(f);
    }
  }

  loadWeed() {
    this.show = false;
    this.server.postWeedDetection(this.file).subscribe((response) => {
      console.log(response);
    });
  }
  loadMaturity() {
    this.show = false;
    this.maturityOutput.show = false;
    this.diseaseOutput.disease = false;
    this.diseaseOutput.healthy = false;
    this.diseaseOutput.noConclusion = false;
    this.server.postMaturityDetection(this.file).subscribe((response: any) => {
      const data = response;
      this.show = true;
      if (data.result.length === 0) {
        this.diseaseOutput.noConclusion = true;
      } else {
        this.maturityOutput.ripeness = data.result[0].name.split('_')[0];
        this.maturityOutput.show = true;
        console.log(this.maturityOutput.ripeness);
      }
    });
  }
  loadDisease() {
    this.show = false;
    this.maturityOutput.show = false;
    this.diseaseOutput.disease = false;
    this.diseaseOutput.healthy = false;
    this.diseaseOutput.noConclusion = false;
    this.server.postDiseaseDetection(this.file).subscribe((response: any) => {
      const data = response;
      this.show = true;
      if (data.result.length === 0) {
        this.diseaseOutput.noConclusion = true;
        this.diseaseOutput.healthy = false;
        this.diseaseOutput.disease = false;
      } else {
        this.diseaseOutput.diseaseName = data.result[0].name.replace('_', ' ');
        if (this.diseaseOutput.diseaseName.toLowerCase() === 'healthy') {
          this.diseaseOutput.disease = false;
          this.diseaseOutput.healthy = true;
          this.diseaseOutput.noConclusion = false;
        } else {
          this.diseaseOutput.disease = true;
          this.diseaseOutput.healthy = false;
          this.diseaseOutput.noConclusion = false;
        }
      }
    });
  }
}
