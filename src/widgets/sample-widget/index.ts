// typescript implementation, same thing
import { Project, ToggleBooleanSettingResponse } from "./entity";

function displayProjects(projects: Project[]) {
  const root = document.getElementById("root");
  if (!root) {
    return;
  }
  root.innerHTML = "";

  const table = document.createElement("table");
  table.classList.add("project-table");

  const headerRow = document.createElement("tr");
  const headers = [
    "ID",
    "Name",
    "Short Name",
    "Archived",
    "Created By",
    "Leader",
    "Description",
    "Template",
  ];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  projects.forEach((project) => {
    const row = document.createElement("tr");

    const cellId = document.createElement("td");
    cellId.textContent = project.id || "";
    row.appendChild(cellId);

    const cellName = document.createElement("td");
    cellName.textContent = project.name || "";
    row.appendChild(cellName);

    const cellShortName = document.createElement("td");
    cellShortName.textContent = project.shortName || "";
    row.appendChild(cellShortName);

    const cellArchived = document.createElement("td");
    cellArchived.textContent = project.archived ? "Yes" : "No";
    row.appendChild(cellArchived);

    const cellCreatedBy = document.createElement("td");
    cellCreatedBy.textContent =
      (project.createdBy &&
        (project.createdBy.fullName || project.createdBy.login)) ||
      "";
    row.appendChild(cellCreatedBy);

    const cellLeader = document.createElement("td");
    cellLeader.textContent =
      (project.leader && (project.leader.email || project.leader.login)) || "";
    row.appendChild(cellLeader);

    const cellDescription = document.createElement("td");
    cellDescription.textContent = project.description || "";
    row.appendChild(cellDescription);

    const cellTemplate = document.createElement("td");
    cellTemplate.textContent = project.template ? "Yes" : "No";
    row.appendChild(cellTemplate);

    table.appendChild(row);
  });

  root.appendChild(table);
}

const host = await YTApp.register();

const projects: Project[] = await host.fetchYouTrack(
  `admin/projects?fields=id,name,shortName,createdBy(login,name,id),leader(login,name,id),key&$top=2`
);
displayProjects(projects);

const toggleButton = document.getElementById("toggle-btn");
const toggleContent = document.getElementById("toggle-content");
if (!toggleButton || !toggleContent) {
  throw new Error("Toggle button or content not found");
}

toggleButton.addEventListener("click", async () => {
  const result: ToggleBooleanSettingResponse = await host.fetchApp(
    "backend/toggleBooleanSetting",
    {
      method: "POST",
    }
  );
  toggleContent.style.display = "block";
  if (result.error) {
    console.error("Error toggling setting:", result.error);
    toggleContent.innerHTML = `Error: ${result.error}`;
    return;
  }
  toggleContent.innerHTML = `Toggled! The value is now: ${result.value}`;
});
