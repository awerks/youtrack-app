import { Project } from "./entity";

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
    th.classList.add("project-table-header");
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  projects.forEach((project) => {
    const row = document.createElement("tr");

    const cellId = document.createElement("td");
    cellId.textContent = project.id || "";
    cellId.classList.add("project-table-cell");
    row.appendChild(cellId);

    const cellName = document.createElement("td");
    cellName.textContent = project.name || "";
    cellName.classList.add("project-table-cell");
    row.appendChild(cellName);

    const cellShortName = document.createElement("td");
    cellShortName.textContent = project.shortName || "";
    cellShortName.classList.add("project-table-cell");
    row.appendChild(cellShortName);

    const cellArchived = document.createElement("td");
    cellArchived.textContent = project.archived ? "Yes" : "No";
    cellArchived.classList.add("project-table-cell");
    row.appendChild(cellArchived);

    const cellCreatedBy = document.createElement("td");
    cellCreatedBy.textContent =
      (project.createdBy &&
        (project.createdBy.fullName || project.createdBy.login)) ||
      "";
    cellCreatedBy.classList.add("project-table-cell");
    row.appendChild(cellCreatedBy);

    const cellLeader = document.createElement("td");
    cellLeader.textContent =
      (project.leader && (project.leader.email || project.leader.login)) || "";
    cellLeader.classList.add("project-table-cell");
    row.appendChild(cellLeader);

    const cellDescription = document.createElement("td");
    cellDescription.textContent = project.description || "";
    cellDescription.classList.add("project-table-cell");
    row.appendChild(cellDescription);

    const cellTemplate = document.createElement("td");
    cellTemplate.textContent = project.template ? "Yes" : "No";
    cellTemplate.classList.add("project-table-cell");
    row.appendChild(cellTemplate);

    table.appendChild(row);
  });

  root.appendChild(table);
}

const host = await YTApp.register();

const projects: Project[] = await host.fetchYouTrack(
  `admin/projects?fields=id,name,shortName,createdBy(login,name,id),leader(login,name,id),key&$top=2`
);
const result = await host.fetchYouTrack("backend/debug", {
  query: { test: "123" },
});
console.log("request result", result);
host.alert(`YouTrack API response: ${JSON.stringify(result, null, 2)}`);
displayProjects(projects);

const toggleButton = document.getElementById("toggleButton");
const toggleContent = document.getElementById("toggleContent");
if (!toggleButton || !toggleContent) {
  throw new Error("Toggle button or content not found");
}
toggleButton.addEventListener("click", () => {
  if (toggleContent.style.display === "none") {
    toggleContent.style.display = "block";
  } else {
    toggleContent.style.display = "none";
  }
});
