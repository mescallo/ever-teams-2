import React, { useState } from 'react';
import { useTaskStatus } from '@app/hooks';
import { Button, Text, InputField, ColorPicker, Card } from 'lib/components';
import { useForm } from 'react-hook-form';
import { IIcon } from '@app/interfaces';
import { generateIconList } from 'lib/settings/icon-items';
import { useTranslations } from 'next-intl';
import IconPopover from 'lib/settings/icon-popover';
import { Loader } from 'lucide-react';

type EditSet = {
	name: string;
	color: string;
	icon: string;
};
const EditStatusModal = ({ status, onClose, setColumn }: { status: any; onClose: any; setColumn: any }) => {
	const { editTaskStatus, loading,editTaskStatusLoading } = useTaskStatus();
	const editStatus: any = editTaskStatus;
	const [createNew] = useState(status);
	const t = useTranslations();
	const { register, handleSubmit, setValue, getValues } = useForm({
		defaultValues: {
			name: status.name || '',
			color: status.color || '',
			icon: status.icon || ''
		}
	});
	const renameProperty = (newProp: string, icon: string) => {
		setColumn((prev: any) => {
			const newColumn = prev.map((column: any) => {
				if (column.id === status.id) {
					return {
						...column,
						name: newProp,
						icon: !icon.includes('https') ? `https://api.ever.team/public/${icon}` : icon
					};
				}
				return column;
			});
			return newColumn;
		});
	};

	const onSubmit = async (values: EditSet) => {
		if (status && values) {
			await editStatus(status.id, { ...values, color: !values.color ? status.color : values.color }).then(() => {
				renameProperty(values.name, values.icon);

				// Call this function with 'Open1' and 'Open2' when you need to change the property name.
				onClose();
			});
		}
	};
	const taskStatusIconList: IIcon[] = generateIconList('task-statuses', [
		'open',
		'in-progress',
		'ready',
		'in-review',
		'blocked',
		'completed'
	]);
	const taskSizesIconList: IIcon[] = generateIconList('task-sizes', ['x-large', 'large', 'medium', 'small', 'tiny']);
	const taskPrioritiesIconList: IIcon[] = generateIconList('task-priorities', ['urgent', 'high', 'medium', 'low']);

	const iconList: IIcon[] = [...taskStatusIconList, ...taskSizesIconList, ...taskPrioritiesIconList];

	return (
		<div className="w-[800px] pt-12 pr-2 h-96 bg-transparent ">
			<Card shadow="custom">
				<form onSubmit={handleSubmit(onSubmit)}>
					<Text className="flex-none flex-grow-0 mb-2 font-normal text-gray-400 text-md">
						{createNew ? t('common.NEW') : t('common.EDIT')} {t('common.ISSUE_TYPE')}
					</Text>
					<div className="flex items-center w-full mt-3 gap-x-5">
						<InputField
							type="text"
							placeholder={t('pages.settingsTeam.CREATE_NEW_ISSUE_TYPES')}
							className="mb-0 min-w-[350px]"
							wrapperClassName="mb-0 rounded-lg"
							{...register('name')}
						/>

						<IconPopover
							iconList={iconList}
							setValue={setValue as any}
							active={iconList.find((v) => v.fullUrl === getValues('icon'))}
						/>
						<ColorPicker defaultColor={status.color} onChange={(e) => setValue('color', e)} />
					</div>
					<div className="flex mt-5 gap-x-4">
						<Button
							variant="primary"
							className="px-4 py-4 font-normal rounded-xl text-md"
							type="submit"
							disabled={loading}
							loading={loading}
						>
							{t('common.EDIT')} {editTaskStatusLoading && <Loader className="h-4 w-4 animate-spin	" />}
						</Button>
						<Button
							variant="grey"
							className="px-4 py-4 font-normal rounded-xl text-md"
							onClick={() => {
								onClose();
							}}
						>
							{t('common.CANCEL')}
						</Button>
					</div>
				</form>
			</Card>
		</div>
	);
};

export default EditStatusModal;