// utils/addressUtils.ts

export const formatAddress = (address: {
	street: string;
	city: string;
	state: string;
}): string => {
	return `${address.street}, ${address.city}, ${address.state}`;
};
