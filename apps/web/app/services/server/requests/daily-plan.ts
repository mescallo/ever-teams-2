import qs from 'qs';
import { ICreateDailyPlan, IDailyPlan } from '@app/interfaces/IDailyPlan';
import { serverFetch } from '../fetch';

export function getAllDayPlans({
	organizationId,
	tenantId,
	bearer_token,
	relations = ['employee', 'tasks']
}: {
	organizationId: string;
	tenantId: string;
	bearer_token: string;
	relations?: string[];
}) {
	const obj = {
		'where[organizationId]': organizationId,
		'where[tenantId]': tenantId
	} as Record<string, string>;

	relations.forEach((relation, i) => {
		obj[`relations[${i}]`] = relation;
	});

	const query = qs.stringify(obj);

	return serverFetch<IDailyPlan>({
		path: `/daily-plan?${query}`,
		method: 'GET',
		bearer_token
	});
}

export function getDayPlansByEmployee({
	employeeId,
	organizationId,
	tenantId,
	bearer_token,
	relations = ['employee', 'tasks']
}: {
	employeeId: string;
	organizationId: string;
	tenantId: string;
	bearer_token: string;
	relations?: string[];
}) {
	const obj = {
		'where[organizationId]': organizationId,
		'where[tenantId]': tenantId
	} as Record<string, string>;

	relations.forEach((relation, i) => {
		obj[`relations[${i}]`] = relation;
	});

	const query = qs.stringify(obj);

	return serverFetch<IDailyPlan>({
		path: `/daily-plan/employee/${employeeId}?${query}`,
		method: 'GET',
		bearer_token
	});
}

export function getPlansByTask({
	taskId,
	organizationId,
	tenantId,
	bearer_token
}: {
	taskId: string;
	organizationId: string;
	tenantId: string;
	bearer_token: string;
}) {
	const obj = {
		'where[organizationId]': organizationId,
		'where[tenantId]': tenantId
	} as Record<string, string>;

	const query = qs.stringify(obj);

	return serverFetch<IDailyPlan>({
		path: `/daily-plan/task/${taskId}?${query}`,
		method: 'GET',
		bearer_token
	});
}

export function createPlanRequest({
	data,
	bearer_token,
	tenantId
}: {
	data: ICreateDailyPlan;
	bearer_token: string;
	tenantId?: any;
}) {
	return serverFetch<IDailyPlan>({
		method: 'POST',
		path: '/daily-plan',
		body: data,
		bearer_token,
		tenantId
	});
}

export function updatePlanRequest({
	planId,
	data,
	bearer_token,
	tenantId
}: {
	planId: string;
	data: Partial<ICreateDailyPlan>;
	bearer_token?: string;
	tenantId?: any;
}) {
	return serverFetch<IDailyPlan>({
		method: 'PUT',
		path: `/daily-plan/${planId}`,
		body: data,
		bearer_token,
		tenantId
	});
}