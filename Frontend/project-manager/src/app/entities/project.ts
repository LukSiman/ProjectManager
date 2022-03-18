import { ProjectImages } from "./project-images";
import { ProjectTasks } from "./project-tasks";

export class Project {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    length: number;
    description: string;
    status: string;
    images: ProjectImages[] = [];
    tasks: ProjectTasks[] = [];
}
