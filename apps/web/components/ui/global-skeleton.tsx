import { fullWidthState } from '@app/stores/fullWidth';
import { Container } from 'lib/components';
import { HeaderSkeleton } from 'lib/layout';
import { usePathname } from 'next/navigation';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useRecoilValue } from 'recoil';

const GlobalSkeleton = () => {
	const fullWidth = useRecoilValue(fullWidthState);
	const pathname = usePathname();
	return (
		<div className="h-screen">
			{false ? (
				<div className="flex">
					<div className="w-1/2 bg-primary/60 h-screen">
						<Skeleton className="m-4 ml-10" height={60} width={200} />
					</div>
					<div className="w-1/2"></div>
				</div>
			) : (
				<>
					<HeaderSkeleton />
					<div className="bg-light--theme-dark dark:bg-dark--theme-light pt-8 w-full">
						<Container fullWidth={fullWidth} className="flex justify-between">
							<div className="flex justify-start gap-2">
								<Skeleton width={35} height={35} />
								<Skeleton width={135} height={35} />
								<Skeleton width={135} height={35} />
							</div>
							<div className="flex justify-end gap-2">
								<Skeleton width={35} height={35} />
								<Skeleton width={35} height={35} />
								<Skeleton width={35} height={35} />
								<Skeleton width={35} height={35} />
							</div>
						</Container>
						{/* Task Input Skeleton */}
						<Container fullWidth={fullWidth} className="pt-12 pb-2">
							<Skeleton className="bg-white dark:bg-dark-high w-full h-36 " borderRadius={30} />
							<div className="flex  items-center w-full py-10">
								<div className="w-1/5">
									<Skeleton width={140} height={20} />
								</div>
								<div className="w-2/5">
									<Skeleton width={380} height={20} />
								</div>
								<div className="w-1/5">
									<Skeleton width={160} height={20} />
								</div>
								<div className="w-1/5">
									<Skeleton width={100} height={20} />
								</div>
							</div>
						</Container>
					</div>
					<div className=" w-full py-4">
						<Container fullWidth={fullWidth} className="flex flex-col items-stretch pt-4 gap-6">
							<Skeleton className="bg-white dark:bg-dark-high w-full h-36 " borderRadius={25} />
							<Skeleton className="bg-white dark:bg-dark-high w-full h-36 " borderRadius={25} />
							<Skeleton className="bg-white dark:bg-dark-high w-full h-36 " borderRadius={25} />
						</Container>
					</div>
				</>
			)}
		</div>
	);
};

export default GlobalSkeleton;
