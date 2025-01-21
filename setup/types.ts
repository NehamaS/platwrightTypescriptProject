export interface VendorType {
	vendorBusinessName: string
	vendorContactName: string
	vendorEmailName: string
	vendorPhone: string
}

export interface LoginType  {
	userName: string;
	password: string;
};

export interface AddVendor {
	alreadyExistVendor: string
};

export interface TestParams {
	addVendor:AddVendor
};
