import { api } from "../../../../services/BaseApi";
import type { TaskType } from "../../dashboard.types";

export const createTask = (taskdata:TaskType) => {
    const post = api.post("tasks/", taskdata)
    return post
}