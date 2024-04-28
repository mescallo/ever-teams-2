'use client';
import { useTheme } from 'next-themes';
import React from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const theme = useTheme();
	return (
		<div>
			<SkeletonTheme
				baseColor={theme.theme == 'light' ? '#d5d5d5' : '#32353c'}
				highlightColor={theme.theme == 'light' ? '#fff' : '#9ca3af'}
			>
				{children}
			</SkeletonTheme>
		</div>
	);
};

export default SkeletonThemeProvider;
