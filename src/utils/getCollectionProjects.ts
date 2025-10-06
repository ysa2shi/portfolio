import { getCollection } from "astro:content"
import type { Project } from "../../types"

export async function getProjects(): Promise<Project[]> {
  return await getCollection("projects")
}

export function sortProjects(projects: Project[]): Project[] {
  return [...projects]
    .filter((project) => project.data.published === true)
    .sort(
      (
        oldProject: { data: { publishDate: Date } },
        latestProject: { data: { publishDate: Date } },
      ) => {
        return (
          latestProject.data.publishDate.valueOf() -
          oldProject.data.publishDate.valueOf()
        )
      },
    )
}
