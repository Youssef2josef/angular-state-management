import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { StudentsRecords } from '../models/students-records.model';

export interface StudentsRecordsState extends EntityState<StudentsRecords> {};

export const adapter: EntityAdapter<StudentsRecords> = createEntityAdapter<StudentsRecords>();

export const initialState: StudentsRecordsState = adapter.getInitialState();