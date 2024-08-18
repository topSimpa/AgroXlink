// utils/timeUtils.js
import {
	differenceInMinutes,
	differenceInHours,
	differenceInDays,
} from "date-fns";

export const formatTimeAgo = (date) => {
	const now = new Date();
	const diffInMinutes = differenceInMinutes(now, date);
	const diffInHours = differenceInHours(now, date);
	const diffInDays = differenceInDays(now, date);

	if (diffInMinutes < 60) {
		return `${diffInMinutes}m ago`;
	} else if (diffInHours < 24) {
		return `${diffInHours}h ago`;
	} else {
		return `${diffInDays}d ago`;
	}
};
