const awsConfig = {
    Auth: {
        region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
        userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
        userPoolWebClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    },
    API: {
        endpoints: [
            {
                name: 'PortfolioAPI',
                endpoint: import.meta.env.VITE_API_URL,
                region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
            },
        ],
    }
};

export default awsConfig;
