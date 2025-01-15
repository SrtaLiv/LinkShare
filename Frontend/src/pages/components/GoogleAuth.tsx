
export const GoogleAuth = () => {
    const handleLogin = () => {
        // Redirect to the Spring Boot backend for OAuth2 login
        window.location.href = 'http://localhost:8081/oauth2/authorization/google'; // Adjust this URL based on your configuration
    };
    
    return (
        <div>
            <h3>or continue with</h3>
            <button onClick={handleLogin}>Login with Google</button>
            <a href="/oauth2/authorization/google"></a>
        </div>
    )
}