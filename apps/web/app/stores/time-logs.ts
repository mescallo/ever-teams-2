import { ITimerLogsDailyReport } from '@app/interfaces/timer/ITimerLogs';
import { atom } from 'jotai';
import { IProject, ITeamTask, OT_Member, TimesheetLog } from '../interfaces';

interface IFilterOption {
    value: string;
    label: string;
}

export const timerLogsDailyReportState = atom<ITimerLogsDailyReport[]>([]);

export const timesheetRapportState = atom<TimesheetLog[]>([])

export const timesheetFilterEmployeeState = atom<OT_Member[]>([]);
export const timesheetFilterProjectState = atom<IProject[]>([]);
export const timesheetFilterTaskState = atom<ITeamTask[]>([]);

export const timesheetFilterStatusState = atom<IFilterOption | IFilterOption[] | null>([]);
export const timesheetDeleteState = atom<string[]>([])
