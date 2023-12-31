type TBusiness = {
    id?: string;
    name: string;
    imageUrl: string;
    description?: string | null;
    updatedAt?: Date;
    owner?: {
        id?: string;
        name?: string;
    };
}; 