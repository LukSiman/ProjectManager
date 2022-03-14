import { ProjectImages } from "./project-images";

export class Project {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    length: number;
    description: string;
    status: string;
    images: ProjectImages[] = [];
}
