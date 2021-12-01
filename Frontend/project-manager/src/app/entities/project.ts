import { ProjectImages } from "./project-images";

export class Project {
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;
    images: ProjectImages[] = [];
}
