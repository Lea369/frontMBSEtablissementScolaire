import { Component, OnInit } from '@angular/core';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';

@Component({
  selector: 'app-all-etudiant',
  templateUrl: './all-etudiant.component.html',
  styleUrls: ['./all-etudiant.component.css']
})
export class AllEtudiantComponent implements OnInit {

  allEtudiant = new Array<EtudiantUpdateDto>();

  constructor(private service: EtudiantsService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(
      (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.allEtudiant = responseDto.body;
        }
      }
    );
  }

  delete(id: number) {
    this.service.delete(id).subscribe(
      responseDto => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.allEtudiant = this.allEtudiant.filter(
            element =>  element.identifiant !== id
          );
        }
        console.log('result after delete: ', this.allEtudiant);
      }
    );
  }

}
