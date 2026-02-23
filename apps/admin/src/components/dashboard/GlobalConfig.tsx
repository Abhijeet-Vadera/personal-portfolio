import React from 'react';
import { JSONContentEditor } from './JSONContentEditor';

export const GlobalConfig: React.FC = () => {
    // This reuses the JSON editor but targets a global-config.json file in S3.
    // If the file doesn't exist yet, it will use the fallback.
    const fallbackConfig = {
        siteName: "Abhijeet V. Portfolio",
        contactEmail: "hello@abhijeetvadera.com",
        socialLinks: {
            github: "https://github.com/abhijeetvadera",
            linkedin: "https://linkedin.com/in/abhijeetvadera"
        },
        enableAnalytics: true,
        maintenanceMode: false
    };

    return (
        <JSONContentEditor
            title="Global Configuration / JSON"
            contentKey="global-config.json"
            fallbackContent={fallbackConfig}
        />
    );
};
