// react implementation
import React, {memo, useCallback, useEffect, useState} from 'react';
import '@jetbrains/ring-ui-built/components/style.css';
import Button from '@jetbrains/ring-ui-built/components/button/button';
import { Project, ToggleBooleanSettingResponse } from './entity';
import Heading from '@jetbrains/ring-ui-built/components/heading/heading';

// Register widget in YouTrack. To learn more, see https://www.jetbrains.com/help/youtrack/devportal-apps/apps-host-api.html
const AppComponent: React.FunctionComponent = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [toggleMessage, setToggleMessage] = useState<string | null>(null);
  const [host, setHost] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const host = await YTApp.register();
        setHost(host);
        const projects: Project[] = await host.fetchYouTrack(
          `admin/projects?fields=id,name,shortName,createdBy(login,name,id),leader(login,name,id)`
        );
        console.log('Fetched projects:', projects);
        setProjects(projects);
      } catch (err) {
        console.error('Error initializing app:', err);
        setError('Failed to fetch projects. Please try again later.');
      }
    };
    init();
  }, []);

  const handleToggle = useCallback(async () => {
    if (!host) return;
    try {
      const result: ToggleBooleanSettingResponse = await host.fetchApp(
        'backend/toggleBooleanSetting',
        { method: 'POST' }
      );
      if (result.error) {
        console.error('Error toggling setting:', result.error);
        setToggleMessage(`Error: ${result.error}`);
      } else {
        setToggleMessage(`Toggled! The value is now: ${result.value}`);
      }
    } catch (err) {
      console.error('Error toggling setting:', err);
      setToggleMessage('Failed to toggle setting. Please try again later.');
    }
  }, [host]);

  return (
    <div className="widget">
      <main>
        <Heading>
          {'Current projects'}
        </Heading>
        {error && <div className="error-message">{error}</div>}
        <div className="project-table-container">
          <table className="project-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Short Name</th>
                <th>Archived</th>
                <th>Created By</th>
                <th>Leader</th>
                <th>Description</th>
                <th>Template</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{project.name}</td>
                  <td>{project.shortName}</td>
                  <td>{project.archived ? 'Yes' : 'No'}</td>
                  <td>
                    {project.createdBy
                      ? project.createdBy.fullName || project.createdBy.login
                      : ''}
                  </td>
                  <td>
                    {project.leader
                      ? project.leader.email || project.leader.login
                      : ''}
                  </td>
                  <td>{project.description}</td>
                  <td>{project.template ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="toggle-section">
          <Button primary onClick={handleToggle} className='btn'>
            Toggle boolean
          </Button>
          {toggleMessage && (
            <div className="toggle-content">
              <p>{toggleMessage}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export const App = memo(AppComponent);
