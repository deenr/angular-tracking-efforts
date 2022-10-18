// import { TestBed } from '@angular/core/testing';
// import { HttpClientModule } from '@angular/common/http';

// import {of as observableOf} from 'rxjs';

// import { EffortService } from './effort.service';
// import { Effort } from "./effort";

// describe('EffortService', () => {
//   let service: EffortService;

//   let effort1: Effort;
//   let effort2: Effort;
//   let effort3: Effort;
//   let efforts: Effort[];

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientModule],
//       providers: [EffortService]
//     });
//     service = TestBed.inject(EffortService);

//     effort1 = new Effort(1, 'test', 'angular', new Date().toISOString(), "https://www.google.com", 3);
//     effort2 = new Effort(2, 'qeewq', 'typescript', new Date().toISOString(), "https://www.facebook.com");
//     effort3  = new Effort(3, 'qtyuty', 'javascript', new Date().toISOString());
    
//     efforts = [effort1, effort2];
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should return list of requested efforts', () => {
//     spyOn(service, 'getEfforts').and.returnValue(observableOf(efforts));
    
//     service.getEfforts().subscribe(
//       (efforts) => {
//         expect(efforts).toEqual(efforts);
//       }
//     );
//     service.getEfforts().subscribe(
//       (efforts) => {
//         expect(efforts).not.toEqual([...efforts, effort3]);
//       }
//     );
//   });

//   it('should return requested effort by id', () => {
//     spyOn(service, 'getEffort').and.returnValue(observableOf(effort1));
    
//     service.getEffort(1).subscribe(
//       (effort) => {
//         expect(effort).toEqual(effort1);
//       }
//     );
//     service.getEffort(1).subscribe(
//       (effort) => {
//         expect(effort).not.toEqual(effort2);
//       }
//     );
//   });
// });
